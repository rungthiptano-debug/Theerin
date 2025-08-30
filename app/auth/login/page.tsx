"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/profile`,
        },
      })
      if (error) throw error
      router.push("/profile")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("auth.login.errorOccurred"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
            <span className="mr-2">←</span>
            {t("auth.login.backToHome")}
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl border-0 p-6">
          <div className="text-center pb-6">
            <h1 className="text-2xl font-bold text-gray-900">{t("auth.login.title")}</h1>
            <p className="text-gray-600 mt-2">{t("auth.login.subtitle")}</p>
          </div>
          <div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-gray-700 font-medium block">
                  {t("auth.login.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("auth.login.emailPlaceholder")}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-gray-700 font-medium block">
                  {t("auth.login.password")}
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full h-12 text-base bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? t("auth.login.loggingIn") : t("auth.login.loginButton")}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {t("auth.login.noAccount")}{" "}
                <Link href="/auth/sign-up" className="text-amber-600 hover:text-amber-700 font-medium">
                  {t("auth.login.signUp")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
