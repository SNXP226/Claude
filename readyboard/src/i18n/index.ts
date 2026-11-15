import sv, { type Messages } from "./sv";
import en from "./en";

// To add a language: create a new file like sv.ts and add it here.
export const messages = { sv, en } satisfies Record<string, Messages>;
export type Lang = keyof typeof messages;
export const defaultLang: Lang = "sv";
export const languages = Object.keys(messages) as Lang[];

// Locale used for dates and times. Swedish formats are used for both languages,
// because the trucks are in Sweden.
export const dateLocale = "sv-SE";
export const timeZone = "Europe/Stockholm";

export function getMessages(lang: string | null | undefined): Messages {
  return messages[(lang as Lang) in messages ? (lang as Lang) : defaultLang];
}
export function isLang(x: unknown): x is Lang {
  return typeof x === "string" && x in messages;
}

// Fills in {n}-style placeholders, e.g. fill("Order {n}", { n: 5 }) -> "Order 5"
export function fill(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));
}
