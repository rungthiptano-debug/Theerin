"use client"
import { useState } from "react"
import type React from "react"

import { ArrowLeft, Send, Clock, User } from "lucide-react"
import Link from "next/link"

const initialMessages = [
  {
    id: 1,
    author: "คุณประยุทธ",
    avatar: "male-senior", // replaced emoji with identifier
    time: "09:15",
    message: "ตลาดใกล้บ้านเราสัปดาห์นี้มีผลไม้สดใหม่มาก!",
    isOwn: false,
  },
  {
    id: 2,
    author: "คุณสุรชัย",
    avatar: "male-senior-2", // replaced emoji with identifier
    time: "09:30",
    message: "เมื่อวานไปเดินที่วัดใหม่ สวยมากครับ มีการปรับปรุงใหม่หมด",
    isOwn: false,
  },
  {
    id: 3,
    author: "คุณวิไล",
    avatar: "female-senior", // replaced emoji with identifier
    time: "10:00",
    message: "ได้ยินว่าจะมีงานประจำปีที่ศาลาประชาคมเดือนหน้า ใครรู้รายละเอียดบ้างคะ?",
    isOwn: false,
  },
]

const renderAvatar = (avatarType: string) => {
  const avatarClass = "w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"

  switch (avatarType) {
    case "male-senior":
      return (
        <div className={`${avatarClass} bg-blue-500`}>
          <User className="w-5 h-5" />
        </div>
      )
    case "male-senior-2":
      return (
        <div className={`${avatarClass} bg-indigo-500`}>
          <User className="w-5 h-5" />
        </div>
      )
    case "female-senior":
      return (
        <div className={`${avatarClass} bg-purple-500`}>
          <User className="w-5 h-5" />
        </div>
      )
    default:
      return (
        <div className={`${avatarClass} bg-slate-500`}>
          <User className="w-5 h-5" />
        </div>
      )
  }
}

export default function LocalNewsChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        author: "คุณ",
        avatar: "user", // replaced emoji with identifier
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4">
            <Link href="/community/chats">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ข่าวสารและเรื่องราวท้องถิ่น</h1>
              <p className="text-sm text-slate-600">สมาชิก 31 คน • ออนไลน์ 12 คน</p>
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
                    <Clock className="w-3 h-3" />
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
              placeholder="พิมพ์ข้อความของคุณที่นี่..."
              className="flex-1 text-lg py-3 px-4 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl text-white disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
