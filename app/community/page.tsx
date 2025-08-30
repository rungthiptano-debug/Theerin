"use client"
import { ArrowLeft, MessageCircle, Bot, Calendar } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function CommunityHubPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">{t("community.welcome")}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src="/diverse-seniors-laughing-together-outdoors-in-a-pa.png"
              alt="Diverse seniors enjoying time together in Chiang Mai park"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">{t("community.heroText")}</p>
        </div>

        {/* Interactive Sections */}
        <div className="space-y-6">
          {/* Community Chats */}
          <Link href="/community/chats">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.communityChats")}</h3>
                  <p className="text-lg text-slate-600">{t("community.communityChatsDesc")}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Expert Advice Hub */}
          <Link href="/community/expert-advice">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-amber-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.expertAdvice")}</h3>
                  <p className="text-lg text-slate-600">{t("community.expertAdviceDesc")}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* AI Chat */}
          <Link href="/community/ai-chat">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Bot className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.aiChat")}</h3>
                  <p className="text-lg text-slate-600">{t("community.aiChatDesc")}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Events & Clubs */}
          <Link href="/community/events">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t("community.eventsClubs")}</h3>
                  <p className="text-lg text-slate-600">{t("community.eventsClubsDesc")}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Welcome Message */}
        <div className="mt-8 text-center">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 border rounded-lg shadow-md">
            <p className="text-lg text-amber-800 font-medium">{t("community.welcomeMessage")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
