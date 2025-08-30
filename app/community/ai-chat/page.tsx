"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { createBrowserClient } from "@supabase/ssr"

interface Message {
  id: number
  author: string
  isAI: boolean
  time: string
  message: string
  user_id?: string
  created_at?: string
}

const generateSimpleAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()

  if (message.includes("สวัสดี") || message.includes("หวัดดี")) {
    return "สวัสดีค่ะ! ยินดีที่ได้พูดคุยกับคุณ วันนี้เป็นอย่างไรบ้างคะ?"
  }

  if (message.includes("สุขภาพ") || message.includes("ป่วย") || message.includes("เจ็บ")) {
    return "เรื่องสุขภาพสำคัญมากค่ะ ควรดูแลตัวเองให้ดี กินอาหารที่มีประโยชน์ ออกกำลังกายเบาๆ และพักผ่อนให้เพียงพอนะคะ หากมีอาการไม่สบายควรไปพบแพทย์ค่ะ"
  }

  if (message.includes("เหงา") || message.includes("เศร้า") || message.includes("เครียด")) {
    return "ฉันเข้าใจความรู้สึกของคุณค่ะ บางครั้งการรู้สึกเหงาหรือเศร้าเป็นเรื่องปกติ ลองหาสิ่งที่ทำให้มีความสุข เช่น ฟังเพลง อ่านหนังสือ หรือคุยกับเพื่อนๆ ฉันอยู่ที่นี่เพื่อคุณเสมอค่ะ"
  }

  if (message.includes("ครอบครัว") || message.includes("ลูก") || message.includes("หลาน")) {
    return "ครอบครัวเป็นสิ่งสำคัญมากค่ะ การมีเวลาร่วมกันและแสดงความรักความห่วงใยต่อกันเป็นสิ่งที่ดีมาก คุณมีเรื่องราวดีๆ เกี่ยวกับครอบครัวที่อยากแบ่งปันไหมคะ?"
  }

  if (message.includes("งาน") || message.includes("ทำงาน") || message.includes("อาชีพ")) {
    return "การทำงานหรือมีกิจกรรมที่มีความหมายช่วยให้ชีวิตมีจุดหมายค่ะ ไม่ว่าจะเป็นงานอาสา งานฝีมือ หรือช่วยเหลือชุมชน ทุกอย่างล้วนมีคุณค่าค่ะ"
  }

  if (message.includes("ขอบคุณ") || message.includes("ขอบใจ")) {
    return "ไม่เป็นไรค่ะ ฉันดีใจที่ได้ช่วยเหลือคุณ อย่าลืมดูแลตัวเองให้ดีนะคะ และมาคุยกับฉันได้เสมอเมื่อไหร่ก็ได้ค่ะ"
  }

  // Default responses
  const defaultResponses = [
    "ฉันเข้าใจค่ะ เล่าให้ฉันฟังเพิ่มเติมได้ไหมคะ?",
    "น่าสนใจมากค่ะ คุณรู้สึกอย่างไรกับเรื่องนี้คะ?",
    "ฉันอยู่ที่นี่เพื่อฟังคุณค่ะ มีอะไรอีกที่อยากแบ่งปันไหมคะ?",
    "ขอบคุณที่แบ่งปันเรื่องราวกับฉันค่ะ คุณเป็นคนที่น่ารักมากเลยค่ะ",
    "ฉันดีใจที่ได้รู้จักคุณค่ะ มีเรื่องอื่นที่อยากคุยกันอีกไหมคะ?",
  ]

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
}

export default function AIChatPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [supabase] = useState(() =>
    createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!),
  )

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        author: t("community.aiChat.aiName"),
        isAI: true,
        time: "08:00",
        message: t("community.aiChat.initialMessage"),
      },
    ]
    setMessages(initialMessages)
  }, [t])

  useEffect(() => {
    loadConversationHistory()
  }, [])

  const loadConversationHistory = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: chatHistory } = await supabase
          .from("ai_chat_messages")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })
          .limit(50)

        if (chatHistory && chatHistory.length > 0) {
          const formattedMessages = chatHistory.map((msg: any, index: number) => ({
            id: index + 2, // Start from 2 since initial message is id 1
            author: msg.is_ai ? t("community.aiChat.aiName") : t("community.aiChat.you"),
            isAI: msg.is_ai,
            time: new Date(msg.created_at).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
            message: msg.message,
            user_id: msg.user_id,
            created_at: msg.created_at,
          }))
          setMessages((prev) => [...prev, ...formattedMessages])
        }
      }
    } catch (error) {
      console.log("[v0] Could not load chat history:", error)
    }
  }

  const saveMessageToDatabase = async (message: string, isAI: boolean) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("ai_chat_messages").insert({
          user_id: user.id,
          message: message,
          is_ai: isAI,
          created_at: new Date().toISOString(),
        })
      }
    } catch (error) {
      console.log("[v0] Could not save message:", error)
    }
  }

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        author: t("community.aiChat.you"),
        isAI: false,
        time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
        message: newMessage,
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      const currentMessage = newMessage
      setNewMessage("")

      await saveMessageToDatabase(currentMessage, false)

      setTimeout(async () => {
        const aiResponseText = generateSimpleAIResponse(currentMessage)

        const aiResponse: Message = {
          id: messages.length + 2,
          author: t("community.aiChat.aiName"),
          isAI: true,
          time: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
          message: aiResponseText,
        }

        setMessages((prev) => [...prev, aiResponse])
        await saveMessageToDatabase(aiResponseText, true)
        setIsLoading(false)
      }, 1000) // Simulate thinking time
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-orange-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4">
            <Link href="/community">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="text-xl">←</span>
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{t("community.aiChat.title")}</h1>
                <p className="text-sm text-orange-600">{t("community.aiChat.subtitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-md mx-auto p-6">
        <div className="p-6 mb-6 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-lg">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">💖</span>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">{t("community.aiChat.heroText")}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-md mx-auto w-full px-6 overflow-y-auto">
        <div className="space-y-4 pb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.isAI ? "" : "flex-row-reverse"}`}>
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {message.isAI ? <span className="text-xl">💖</span> : <span className="text-xl">👤</span>}
              </div>
              <div className={`flex-1 max-w-xs ${message.isAI ? "" : "text-right"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-700">{message.author}</span>
                  <span className="text-xs text-slate-500">{message.time}</span>
                </div>
                <div
                  className={`p-4 rounded-lg ${message.isAI ? "bg-orange-100 text-orange-900" : "bg-pink-500 text-white"}`}
                >
                  <p className="text-base leading-relaxed">{message.message}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-xl">💖</span>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-700">{t("community.aiChat.aiName")}</span>
                </div>
                <div className="p-4 bg-orange-100 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-orange-200 p-6">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("community.aiChat.messagePlaceholder")}
              className="flex-1 text-lg py-3 px-4 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl text-white disabled:opacity-50"
              disabled={!newMessage.trim() || isLoading}
            >
              <span className="text-lg">📤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
