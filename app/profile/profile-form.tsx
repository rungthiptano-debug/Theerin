"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  full_name: string | null
  age: number | null
  location: string | null
  phone: string | null
  education: string | null
  work_experience: string | null
  skills: string[] | null
  preferred_job_types: string[] | null
}

interface ProfileFormProps {
  user: User
  profile: Profile | null
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    age: profile?.age?.toString() || "",
    location: profile?.location || "",
    phone: profile?.phone || "",
    education: profile?.education || "",
    work_experience: profile?.work_experience || "",
    skills: profile?.skills?.join(", ") || "",
    preferred_job_types: profile?.preferred_job_types?.join(", ") || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    try {
      const updateData = {
        full_name: formData.full_name || null,
        age: formData.age ? Number.parseInt(formData.age) : null,
        location: formData.location || null,
        phone: formData.phone || null,
        education: formData.education || null,
        work_experience: formData.work_experience || null,
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : null,
        preferred_job_types: formData.preferred_job_types
          ? formData.preferred_job_types
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : null,
      }

      const { error } = await supabase.from("profiles").upsert({ id: user.id, ...updateData })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : t("profile.errorOccurred"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("profile.title")}</h1>
        <p className="text-gray-600">{t("profile.subtitle")}</p>
      </div>

      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
          <span className="mr-2">←</span>
          {t("profile.backToHome")}
        </Link>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-white hover:bg-gray-50"
        >
          <span className="mr-2">⏻</span>
          {t("profile.signOut")}
        </button>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-lg shadow-xl border-0 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t("profile.personalInfo")}</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="full_name" className="text-gray-700 font-medium block">
                  {t("profile.fullName")} {t("profile.required")}
                </label>
                <input
                  id="full_name"
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="age" className="text-gray-700 font-medium block">
                  {t("profile.age")}
                </label>
                <input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-gray-700 font-medium block">
                  {t("profile.location")}
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder={t("profile.locationPlaceholder")}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-gray-700 font-medium block">
                  {t("profile.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder={t("profile.phonePlaceholder")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="education" className="text-gray-700 font-medium block">
                {t("profile.education")}
              </label>
              <textarea
                id="education"
                placeholder={t("profile.educationPlaceholder")}
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full min-h-[100px] text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="work_experience" className="text-gray-700 font-medium block">
                {t("profile.workExperience")}
              </label>
              <textarea
                id="work_experience"
                placeholder={t("profile.workExperiencePlaceholder")}
                value={formData.work_experience}
                onChange={(e) => setFormData({ ...formData, work_experience: e.target.value })}
                className="w-full min-h-[120px] text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="skills" className="text-gray-700 font-medium block">
                {t("profile.skills")}
              </label>
              <input
                id="skills"
                type="text"
                placeholder={t("profile.skillsPlaceholder")}
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="preferred_job_types" className="text-gray-700 font-medium block">
                {t("profile.preferredJobTypes")}
              </label>
              <input
                id="preferred_job_types"
                type="text"
                placeholder={t("profile.preferredJobTypesPlaceholder")}
                value={formData.preferred_job_types}
                onChange={(e) => setFormData({ ...formData, preferred_job_types: e.target.value })}
                className="w-full h-12 text-base px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-600">{t("profile.saveSuccess")}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 text-base bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              <span className="mr-2">💾</span>
              {isLoading ? t("profile.saving") : t("profile.saveButton")}
            </button>
          </form>
        </div>
      </div>

      {/* Application History */}
      <div className="bg-white rounded-lg shadow-xl border-0 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t("profile.applicationHistory")}</h2>
        </div>
        <div>
          <p className="text-gray-600">{t("profile.noApplicationHistory")}</p>
          <Link href="/find-job" className="inline-block mt-4">
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium">
              {t("profile.startJobSearch")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
