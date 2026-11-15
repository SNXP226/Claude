// Skyltkoll – visar hastighetsgränsen på vägen du kör på.
// Använder telefonens GPS och kartdata från OpenStreetMap.

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import { useKeepAwake } from 'expo-keep-awake';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const SEARCH_RADIUS_M = 30; // hur långt bort vi letar efter vägar
const REFETCH_DISTANCE_M = 40; // hämta ny data när vi kört så här långt
const REFETCH_MAX_AGE_MS = 30000; // ...eller när så här lång tid gått
const MIN_FETCH_GAP_MS = 4000; // aldrig oftare än så här

const CAR_ROADS =
  '^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service)(_link)?$';

// Svenska standardgränser när kartan bara anger typ av väg
const SWEDISH_DEFAULTS = {
  'SE:urban': 50,
  'SE:rural': 70,
  'SE:motorway': 110,
  'SE:living_street': 7,
};

export function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Avstånd (meter) från en punkt till närmaste del av en väg
export function distanceToWay(lat, lon, geometry) {
  const R = 6371000;
  const k = Math.PI / 180;
  const cosLat = Math.cos(lat * k);
  const toXY = (p) => [(p.lon - lon) * k * R * cosLat, (p.lat - lat) * k * R];
  let best = Infinity;
  for (let i = 0; i < geometry.length - 1; i++) {
    const [ax, ay] = toXY(geometry[i]);
    const [bx, by] = toXY(geometry[i + 1]);
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = len2 === 0 ? 0 : -(ax * dx + ay * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(ax + t * dx, ay + t * dy);
    if (d < best) best = d;
  }
  if (geometry.length === 1) {
    const [x, y] = toXY(geometry[0]);
    best = Math.hypot(x, y);
  }
  return best;
}

// Gör om kartans text (t.ex. "50", "SE:rural", "30 mph") till km/h
export function parseMaxspeed(value) {
  if (!value) return null;
  const v = String(value).split(';')[0].trim();
  if (SWEDISH_DEFAULTS[v]) return SWEDISH_DEFAULTS[v];
  const mph = v.match(/^(\d+)\s*mph$/i);
  if (mph) return Math.round(Number(mph[1]) * 1.609);
  const num = v.match(/^(\d+)$/);
  if (num) return Number(num[1]);
  return null;
}

// Väljer närmaste bilväg bland svaren från kartan
export function pickRoad(elements, lat, lon) {
  let best = null;
  for (const el of elements || []) {
    if (el.type !== 'way' || !el.geometry || el.geometry.length === 0) continue;
    const d = distanceToWay(lat, lon, el.geometry);
    // Vägar med känd hastighet vinner om de är nästan lika nära
    const hasLimit = parseMaxspeed(el.tags && el.tags.maxspeed) !== null;
    const score = d - (hasLimit ? 3 : 0);
    if (!best || score < best.score) best = { el, score };
  }
  if (!best) return null;
  const tags = best.el.tags || {};
  return {
    limit: parseMaxspeed(tags.maxspeed),
    name: tags.name || tags.ref || null,
  };
}

async function fetchRoad(lat, lon) {
  const query =
    `[out:json][timeout:10];` +
    `way(around:${SEARCH_RADIUS_M},${lat},${lon})[highway~"${CAR_ROADS}"];` +
    `out tags geom;`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'data=' + encodeURIComponent(query),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error('Kartservern svarade ' + res.status);
    const json = await res.json();
    return pickRoad(json.elements, lat, lon);
  } finally {
    clearTimeout(timer);
  }
}

function SpeedSign({ limit }) {
  return (
    <View style={styles.sign}>
      <Text
        style={[styles.signText, limit !== null && limit >= 100 && styles.signTextSmall]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {limit === null ? '?' : limit}
      </Text>
    </View>
  );
}

export default function App() {
  useKeepAwake(); // skärmen släcks inte medan appen är öppen

  const [limit, setLimit] = useState(null);
  const [roadName, setRoadName] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [status, setStatus] = useState('Startar GPS…');

  const lastFetch = useRef({ lat: null, lon: null, time: 0 });
  const fetching = useRef(false);

  useEffect(() => {
    let subscription = null;
    let cancelled = false;

    async function onPosition(pos) {
      const { latitude: lat, longitude: lon, speed: mps } = pos.coords;
      setSpeed(mps !== null && mps >= 0 ? Math.round(mps * 3.6) : null);

      const now = Date.now();
      const last = lastFetch.current;
      const moved =
        last.lat === null ? Infinity : distanceMeters(last.lat, last.lon, lat, lon);
      const age = now - last.time;
      const due = moved > REFETCH_DISTANCE_M || age > REFETCH_MAX_AGE_MS;
      if (!due || fetching.current || age < MIN_FETCH_GAP_MS) return;

      fetching.current = true;
      lastFetch.current = { lat, lon, time: now };
      try {
        const road = await fetchRoad(lat, lon);
        if (cancelled) return;
        if (road) {
          setLimit(road.limit);
          setRoadName(road.name);
          setStatus(road.limit === null ? 'Hastighet saknas i kartan' : '');
        } else {
          setLimit(null);
          setRoadName(null);
          setStatus('Ingen väg hittad här');
        }
      } catch (e) {
        if (!cancelled) setStatus('Ingen kontakt med kartan – försöker igen');
      } finally {
        fetching.current = false;
      }
    }

    (async () => {
      const { status: perm } = await Location.requestForegroundPermissionsAsync();
      if (perm !== 'granted') {
        setStatus('Appen behöver tillgång till din plats.\nTillåt det i Inställningar.');
        return;
      }
      setStatus('Letar efter din position…');
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 5,
        },
        onPosition
      );
      if (cancelled) subscription.remove();
    })();

    return () => {
      cancelled = true;
      if (subscription) subscription.remove();
    };
  }, []);

  const tooFast = limit !== null && speed !== null && speed > limit + 2;

  return (
    <View style={[styles.container, tooFast && styles.containerWarn]}>
      <StatusBar barStyle="light-content" />
      <SpeedSign limit={limit} />
      <Text style={styles.road} numberOfLines={1}>
        {roadName || ' '}
      </Text>
      <Text style={[styles.speed, tooFast && styles.speedWarn]}>
        {speed === null ? '–' : speed}
        <Text style={styles.unit}> km/h</Text>
      </Text>
      {status ? <Text style={styles.status}>{status}</Text> : null}
      <Text style={styles.footer}>
        Kartdata © OpenStreetMap. Lita alltid på skyltarna vid vägen.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  containerWarn: { backgroundColor: '#3a0000' },
  sign: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#fff',
    borderWidth: 26,
    borderColor: '#d0021b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signText: { fontSize: 96, fontWeight: '800', color: '#000' },
  signTextSmall: { fontSize: 80 },
  road: { color: '#ccc', fontSize: 22, marginTop: 24 },
  speed: { color: '#fff', fontSize: 64, fontWeight: '700', marginTop: 16 },
  speedWarn: { color: '#ff4d4d' },
  unit: { fontSize: 24, fontWeight: '400', color: '#aaa' },
  status: { color: '#f5c542', fontSize: 16, marginTop: 20, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 32, color: '#666', fontSize: 12, textAlign: 'center' },
});
