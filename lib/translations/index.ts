import th from "./th.json"
import en from "./en.json"
import zhCN from "./zh-CN.json"
import ja from "./ja.json"
import ko from "./ko.json"
import vi from "./vi.json"

export const translations = {
  th: th,
  en: en,
  "en-US": en,
  "en-GB": en,
  "en-AU": en,
  "zh-CN": zhCN,
  "zh-TW": zhCN, // Using simplified for now
  ja: ja,
  ko: ko,
  vi: vi,
  my: en, // Fallback to English for Myanmar
  km: en, // Fallback to English for Cambodian
  ms: en, // Fallback to English for Malaysian
  hi: en, // Fallback to English for Hindi
  ru: en, // Fallback to English for Russian
  lo: en, // Fallback to English for Laotian
}

export type TranslationKey = keyof typeof th
export type NestedTranslationKey = string

export function getTranslation(languageCode: string, key: string): string {
  const translation = translations[languageCode as keyof typeof translations] || translations.th

  // Handle nested keys like "home.travelAlert"
  const keys = key.split(".")
  let value: any = translation

  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) break
  }

  return value || key
}
