"use client"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function CommunityChatsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="text-xl">←</span>
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">{t("community.chats.title")}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-40 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src="/seniors-chatting-over-coffee.png"
              alt="Seniors casually chatting and smiling over coffee"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">{t("community.chats.heroText")}</p>
        </div>

        {/* Chat Groups */}
        <div className="space-y-6">
          {/* Help & Advice Corner */}
          <Link href="/community/chats/help-advice">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-yellow-300 bg-white rounded-lg">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.chats.helpAdvice")}</h3>
                  <p className="text-lg text-slate-600">{t("community.chats.helpAdviceDesc")}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Local News & Stories */}
          <Link href="/community/chats/local-news">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-white rounded-lg">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📰</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.chats.localNews")}</h3>
                  <p className="text-lg text-slate-600">{t("community.chats.localNewsDesc")}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Hobbies & Interests */}
          <Link href="/community/chats/hobbies">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-300 bg-white rounded-lg">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.chats.hobbies")}</h3>
                  <p className="text-lg text-slate-600">{t("community.chats.hobbiesDesc")}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/community">
            <button className="w-full text-lg py-4 bg-transparent border border-slate-300 rounded-lg hover:bg-slate-50">
              {t("community.chats.backToCommunity")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
