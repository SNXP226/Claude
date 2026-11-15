import { dateLocale, timeZone } from "@/i18n";

// Swedish date, e.g. "15 nov. 2026"
export function formatDate(d: Date | string) {
  return new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "short", year: "numeric", timeZone }).format(new Date(d));
}

// Swedish time, e.g. "14:05"
export function formatTime(d: Date | string) {
  return new Intl.DateTimeFormat(dateLocale, { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date(d));
}

// Swedish phone number, e.g. "070-123 45 67". Ready for future SMS feature.
export function formatPhoneSE(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("46")) d = "0" + d.slice(2);
  if (/^07\d{8}$/.test(d)) return `${d.slice(0, 3)}-${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
  return raw.trim();
}
