#!/usr/bin/env python3
"""Bygger Skyltkolls kartdata.

Läser en OpenStreetMap-fil (t.ex. sweden-latest.osm.pbf), plockar ut bilvägar
med hastighetsgräns och skriver små rutor (tiles) som appen hämtar:

    docs/tiles/<lat-index>/<lon-index>.json

Varje ruta är TILE_LAT x TILE_LON grader. Koordinater lagras som heltal i
1e-5 grader (ungefär 1 meter), relativt rutans hörn, för att hålla filerna små.

Format per ruta:
    {"v": 1, "names": ["Storgatan", ...],
     "ways": [[limit, nameIndex, lat0, lon0, lat1, lon1, ...], ...]}
limit är km/h eller 0 om okänd; nameIndex är -1 om namn saknas.
"""

import json
import math
import os
import re
import shutil
import sys
from collections import defaultdict

import osmium

TILE_LAT = 0.05
TILE_LON = 0.1
SCALE = 100000  # 1e-5 grader
SIMPLIFY_M = 3.0

CAR_ROADS = re.compile(
    r"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|"
    r"living_street|service)(_link)?$"
)
SKIP_SERVICE = {"parking_aisle", "driveway", "drive-through", "emergency_access"}
SWEDISH_DEFAULTS = {"SE:urban": 50, "SE:rural": 70, "SE:motorway": 110, "SE:living_street": 7}


def parse_maxspeed(value):
    if not value:
        return None
    v = value.split(";")[0].strip()
    if v in SWEDISH_DEFAULTS:
        return SWEDISH_DEFAULTS[v]
    m = re.match(r"^(\d+)\s*mph$", v, re.I)
    if m:
        return round(int(m.group(1)) * 1.609)
    m = re.match(r"^(\d+)$", v)
    if m:
        n = int(m.group(1))
        return n if 0 < n <= 200 else None
    return None


def way_limit(tags):
    limit = parse_maxspeed(tags.get("maxspeed"))
    if limit is not None:
        return limit
    fwd = parse_maxspeed(tags.get("maxspeed:forward"))
    bwd = parse_maxspeed(tags.get("maxspeed:backward"))
    both = [x for x in (fwd, bwd) if x is not None]
    if both:
        return min(both)  # försiktigt val när riktningen är okänd
    if tags.get("highway") == "living_street":
        return 7  # gångfartsområde
    return None


def simplify(points, tol_m):
    """Douglas-Peucker i lokala meter."""
    if len(points) <= 2:
        return points
    lat0 = points[0][0]
    kx = math.cos(math.radians(lat0)) * 111320.0
    ky = 110540.0
    xy = [((p[1]) * kx, (p[0]) * ky) for p in points]
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = xy[a]
        bx, by = xy[b]
        dx, dy = bx - ax, by - ay
        len2 = dx * dx + dy * dy
        best_d, best_i = -1.0, -1
        for i in range(a + 1, b):
            px, py = xy[i]
            if len2 == 0:
                d = math.hypot(px - ax, py - ay)
            else:
                t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / len2))
                d = math.hypot(px - (ax + t * dx), py - (ay + t * dy))
            if d > best_d:
                best_d, best_i = d, i
        if best_d > tol_m:
            keep[best_i] = True
            stack.append((a, best_i))
            stack.append((best_i, b))
    return [p for p, k in zip(points, keep) if k]


def densify(points, max_m=800.0):
    """Delar långa raka sträckor så att varje del bara rör närliggande rutor."""
    out = [points[0]]
    for q in points[1:]:
        p = out[-1]
        dy = (q[0] - p[0]) * 110540.0
        dx = (q[1] - p[1]) * 111320.0 * math.cos(math.radians(p[0]))
        n = int(math.hypot(dx, dy) // max_m)
        for k in range(1, n + 1):
            f = k / (n + 1)
            out.append((p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f))
        out.append(q)
    return out


def tile_of(lat, lon):
    return (math.floor(lat / TILE_LAT), math.floor(lon / TILE_LON))


class Tiles:
    def __init__(self):
        # tile -> {"names": {name: idx}, "ways": [...]}
        self.data = defaultdict(lambda: {"names": {}, "ways": []})
        self.count = 0

    def add(self, points, limit, name):
        """Delar upp vägen per ruta och lägger in varje del."""
        pieces = defaultdict(list)  # tile -> list of runs
        current = {}
        for i in range(len(points) - 1):
            p, q = points[i], points[i + 1]
            tiles = {tile_of(*p), tile_of(*q)}
            for t in tiles:
                run = current.get(t)
                if run is not None and run[-1] == p:
                    run.append(q)
                else:
                    run = [p, q]
                    pieces[t].append(run)
                    current[t] = run
        if len(points) == 1:
            pieces[tile_of(*points[0])].append([points[0]])
        for t, runs in pieces.items():
            tile = self.data[t]
            if name:
                idx = tile["names"].setdefault(name, len(tile["names"]))
            else:
                idx = -1
            base_lat = round(t[0] * TILE_LAT * SCALE)
            base_lon = round(t[1] * TILE_LON * SCALE)
            for run in runs:
                row = [limit or 0, idx]
                for lat, lon in run:
                    row.append(round(lat * SCALE) - base_lat)
                    row.append(round(lon * SCALE) - base_lon)
                tile["ways"].append(row)
        self.count += 1

    def write(self, out_dir):
        if os.path.isdir(out_dir):
            shutil.rmtree(out_dir)
        total = 0
        for (ty, tx), tile in self.data.items():
            d = os.path.join(out_dir, str(ty))
            os.makedirs(d, exist_ok=True)
            names = [None] * len(tile["names"])
            for n, i in tile["names"].items():
                names[i] = n
            payload = {"v": 1, "names": names, "ways": tile["ways"]}
            path = os.path.join(d, f"{tx}.json")
            with open(path, "w", encoding="utf-8") as f:
                json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
            total += os.path.getsize(path)
        meta = {"v": 1, "tileLat": TILE_LAT, "tileLon": TILE_LON, "scale": SCALE,
                "tiles": len(self.data), "ways": self.count}
        with open(os.path.join(out_dir, "meta.json"), "w") as f:
            json.dump(meta, f)
        return total


class Handler(osmium.SimpleHandler):
    def __init__(self, tiles):
        super().__init__()
        self.tiles = tiles

    def way(self, w):
        tags = w.tags
        hw = tags.get("highway")
        if not hw or not CAR_ROADS.match(hw):
            return
        if hw == "service" and tags.get("service") in SKIP_SERVICE:
            return
        if tags.get("area") == "yes" or tags.get("access") in ("no", "private"):
            return
        try:
            pts = [(n.lat, n.lon) for n in w.nodes if n.location.valid()]
        except osmium.InvalidLocationError:
            return
        if not pts:
            return
        tagd = {k: tags.get(k) for k in ("maxspeed", "maxspeed:forward", "maxspeed:backward", "highway")}
        limit = way_limit(tagd)
        name = tags.get("name") or tags.get("ref")
        self.tiles.add(densify(simplify(pts, SIMPLIFY_M)), limit, name)


def main():
    if len(sys.argv) != 3:
        print("Användning: build_tiles.py <karta.osm.pbf> <utmapp>")
        sys.exit(1)
    src, out_dir = sys.argv[1], sys.argv[2]
    tiles = Tiles()
    Handler(tiles).apply_file(src, locations=True, idx="flex_mem")
    size = tiles.write(out_dir)
    print(f"{tiles.count} vägar, {len(tiles.data)} rutor, {size / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
