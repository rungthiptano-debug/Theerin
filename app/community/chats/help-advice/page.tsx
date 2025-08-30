"use client"
import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const initialMessages = [
  {
    id: 1,
    author: "คุณสมชาย",
    avatar: "male-senior",
    time: "10:30",
    message: "มีใครรู้จักบริการแท็กซี่ที่เชื่อถือได้ในดอนแก้วบ้างครับ?",
    isOwn: false,
  },
  {
    id: 2,
    author: "คุณมาลี",
    avatar: "female-senior",
    time: "10:45",
    message: "ลุงสมชายค่ะ ฉันใช้บริการของคุณประยุทธ์ เบอร์ 081-234-5678 เขาขับดีและราคาไม่แพงค่ะ",
    isOwn: false,
  },
  {
    id: 3,
    author: "คุณวิไล",
    avatar: "female-senior-2",
    time: "11:00",
    message: "ขอบคุณคุณมาลีค่ะ ฉันก็กำลังหาอยู่เหมือนกัน จะลองติดต่อดูค่ะ",
    isOwn: false,
  },
]

const renderAvatar = (avatarType: string) => {
  const avatarClass = "w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"

  switch (avatarType) {
    case "male-senior":
      return (
        <div className={`${avatarClass} bg-blue-500`}>
          <span className="text-lg">👤</span>
        </div>
      )
    case "female-senior":
      return (
        <div className={`${avatarClass} bg-pink-500`}>
          <span className="text-lg">👤</span>
        </div>
      )
    case "female-senior-2":
      return (
        <div className={`${avatarClass} bg-purple-500`}>
          <span className="text-lg">👤</span>
        </div>
      )
    default:
      return (
        <div className={`${avatarClass} bg-slate-500`}>
          <span className="text-lg">👤</span>
        </div>
      )
  }
}

export default function HelpAdviceChatPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        author: t("community.chats.helpAdviceChat.you"),
        avatar: "user",
        time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
        message: newMessage,
        isOwn: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4">
            <Link href="/community/chats">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="text-xl">←</span>
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{t("community.chats.helpAdviceChat.title")}</h1>
              <p className="text-sm text-slate-600">
                {t("community.chats.helpAdviceChat.members")} 24 {t("community.chats.helpAdviceChat.people")} •{" "}
                {t("community.chats.helpAdviceChat.online")} 8 {t("community.chats.helpAdviceChat.people")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-md mx-auto w-full p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}>
              {renderAvatar(message.avatar)}
              <div className={`flex-1 max-w-xs ${message.isOwn ? "text-right" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-700">{message.author}</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span className="text-sm">🕐</span>
                    <span>{message.time}</span>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl ${message.isOwn ? "bg-blue-500 text-white" : "bg-white shadow-sm border border-slate-200"}`}
                >
                  <p className="text-base leading-relaxed">{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-slate-200 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("community.chats.helpAdviceChat.messagePlaceholder")}
              className="flex-1 text-lg py-3 px-4 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <span className="text-lg">📤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
