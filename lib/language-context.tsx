"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getTranslation } from "./translations"

export type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}

export const languages: Language[] = [
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文", flag: "🇨🇳" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", flag: "🇹🇼" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "my", name: "Myanmar", nativeName: "မြန်မာ", flag: "🇲🇲" },
  { code: "km", name: "Cambodian", nativeName: "ខ្មែរ", flag: "🇰🇭" },
  { code: "ms", name: "Malaysian", nativeName: "Bahasa Malaysia", flag: "🇲🇾" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "lo", name: "Laotian", nativeName: "ລາວ", flag: "🇱🇦" },
  { code: "en-GB", name: "British English", nativeName: "British English", flag: "🇬🇧" },
  { code: "en-AU", name: "Australian English", nativeName: "Australian English", flag: "🇦🇺" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]) // Default to Thai

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("selectedLanguage")
    if (savedLanguage) {
      const language = languages.find((lang) => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("selectedLanguage", language.code)
  }

  const t = (key: string): string => {
    return getTranslation(currentLanguage.code, key)
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
