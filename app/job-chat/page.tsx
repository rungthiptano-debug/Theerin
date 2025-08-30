"use client"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import { ArrowLeft, MessageCircle, Bot, User, Heart, Lightbulb, Clock, DollarSign, Building2 } from "lucide-react"

export default function JobChatPage() {
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [chatHistory, setChatHistory] = useState([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [user, setUser] = useState(null)
  const messagesEndRef = useRef(null)
  const router = useRouter()
  const supabase = createClient()

  const chatQuestions = [
    {
      id: 1,
      question: t("jobs.chat.questions.workType"),
      options: [
        { id: "consulting", text: t("jobs.chat.options.consulting"), icon: "💡" },
        { id: "teaching", text: t("jobs.chat.options.teaching"), icon: "📚" },
        { id: "care", text: t("jobs.chat.options.care"), icon: "❤️" },
        { id: "creative", text: t("jobs.chat.options.creative"), icon: "🎨" },
      ],
    },
    {
      id: 2,
      question: t("jobs.chat.questions.schedule"),
      options: [
        { id: "flexible", text: t("jobs.chat.options.flexible"), icon: "🕐" },
        { id: "part-time", text: t("jobs.chat.options.partTime"), icon: "📅" },
        { id: "regular", text: t("jobs.chat.options.regular"), icon: "📋" },
        { id: "project", text: t("jobs.chat.options.project"), icon: "📊" },
      ],
    },
    {
      id: 3,
      question: t("jobs.chat.questions.priority"),
      options: [
        { id: "impact", text: t("jobs.chat.options.impact"), icon: "🌟" },
        { id: "learning", text: t("jobs.chat.options.learning"), icon: "📖" },
        { id: "social", text: t("jobs.chat.options.social"), icon: "👥" },
        { id: "income", text: t("jobs.chat.options.income"), icon: "💰" },
      ],
    },
    {
      id: 4,
      question: t("jobs.chat.questions.experience"),
      options: [
        { id: "business", text: t("jobs.chat.options.business"), icon: "💼" },
        { id: "education", text: t("jobs.chat.options.education"), icon: "🎓" },
        { id: "healthcare", text: t("jobs.chat.options.healthcare"), icon: "🏥" },
        { id: "community", text: t("jobs.chat.options.community"), icon: "🤝" },
      ],
    },
  ]

  const jobRecommendations = {
    "consulting-flexible-impact-business": [
      {
        id: 1,
        title: "ที่ปรึกษาทางการเงิน",
        company: "ธนาคารกรุงศรี",
        salary: "15,000-25,000 บาท",
        type: "Part-time",
        match: 95,
        reason: "ตรงกับความต้องการช่วยเหลือสังคมและประสบการณ์ด้านธุรกิจของคุณ",
      },
      {
        id: 7,
        title: "ที่ปรึกษาโครงการตลาดริมน้ำ",
        company: "เทศบาลนครเชียงใหม่",
        salary: "8,000-12,000 บาท",
        type: "Part-time",
        match: 90,
        reason: "โครงการที่สร้างผลกระทบดีต่อชุมชน เหมาะกับคนที่มีประสบการณ์",
      },
    ],
    "teaching-part-time-learning-education": [
      {
        id: 2,
        title: "ครูสอนภาษาอังกฤษ",
        company: "มหาวิทยาลัยเชียงใหม่",
        salary: "300-500 บาท/ชั่วโมง",
        type: "Flexible",
        match: 92,
        reason: "เหมาะกับคนที่รักการสอนและต้องการเวลาทำงานยืดหยุ่น",
      },
      {
        id: 10,
        title: "ครูอาสาสอนทักษะชีวิต",
        company: "สำนักงานการศึกษา จ.เชียงใหม่",
        salary: "6,000-10,000 บาท",
        type: "Flexible",
        match: 88,
        reason: "ส่งต่อภูมิปัญญาชีวิตให้คนรุ่นใหม่ สร้างสังคมที่เข้มแข็ง",
      },
    ],
    default: [
      {
        id: 8,
        title: "อาสาสมัครพัฒนาชุมชน",
        company: "มูลนิธิชุมชนเชียงใหม่",
        salary: "5,000-8,000 บาท + ความภาคภูมิใจ",
        type: "Flexible",
        match: 85,
        reason: "งานที่ให้ความหมายมากกว่าเงิน เหมาะกับทุกคนที่อยากช่วยสังคม",
      },
    ],
  }

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Initial greeting
    setChatHistory([
      {
        type: "bot",
        message: t("jobs.chat.greeting"),
        timestamp: new Date(),
      },
      {
        type: "bot",
        message: t("jobs.chat.introduction"),
        timestamp: new Date(),
      },
    ])
  }, [t])

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleAnswer = async (questionId, answerId, answerText) => {
    const newAnswers = { ...answers, [questionId]: answerId }
    setAnswers(newAnswers)

    // Add user's answer to chat
    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        message: answerText,
        timestamp: new Date(),
      },
    ])

    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsTyping(false)

    if (currentQuestion < chatQuestions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1)
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: chatQuestions[currentQuestion + 1].question,
          timestamp: new Date(),
        },
      ])
    } else {
      // Generate recommendations
      await generateRecommendations(newAnswers)
    }
  }

  const generateRecommendations = async (userAnswers) => {
    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: t("jobs.chat.searching"),
        timestamp: new Date(),
      },
    ])

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate recommendation key
    const key = Object.values(userAnswers).join("-")
    const recs = jobRecommendations[key] || jobRecommendations.default

    setRecommendations(recs)
    setShowRecommendations(true)

    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        message: t("jobs.chat.foundJobs", { count: recs.length }),
        timestamp: new Date(),
      },
      {
        type: "bot",
        message: t("jobs.chat.jobsMatch"),
        timestamp: new Date(),
      },
    ])
  }

  const restartChat = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowRecommendations(false)
    setRecommendations([])
    setChatHistory([
      {
        type: "bot",
        message: t("jobs.chat.restartMessage"),
        timestamp: new Date(),
      },
    ])

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: chatQuestions[0].question,
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-secondary">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4">
            <Link href="/find-job">
              <Button variant="ghost" size="sm" className="p-2 text-primary-foreground hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
              <h1 className="text-xl font-heading font-bold text-primary-foreground">{t("jobs.chat.title")}</h1>
            </div>
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={restartChat}
                className="text-primary-foreground hover:bg-white/20 text-sm"
              >
                {t("jobs.chat.restart")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-md mx-auto h-[calc(100vh-120px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-green-100"
                  }`}
                >
                  {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-green-600" />}
                </div>
                <Card
                  className={`p-4 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border-green-200 shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.message}</p>
                </Card>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100">
                  <Bot className="w-4 h-4 text-green-600" />
                </div>
                <Card className="p-4 bg-card border-green-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{t("jobs.chat.thinking")}</span>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Job Recommendations */}
          {showRecommendations && (
            <div className="space-y-4">
              {recommendations.map((job, index) => (
                <Card key={job.id} className="p-4 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-foreground text-lg">{job.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm">{job.company}</span>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {job.match}% {t("jobs.chat.suitable")}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <div className="bg-white/50 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{job.reason}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => router.push(`/jobs/${job.id}`)}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        {t("jobs.chat.viewDetails")}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        {t("jobs.chat.applyNow")}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-amber-800 text-sm font-medium mb-1">{t("jobs.chat.encouragementTitle")}</p>
                    <p className="text-amber-700 text-sm leading-relaxed">{t("jobs.chat.encouragementText")}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Question Options */}
        {!showRecommendations && !isTyping && currentQuestion < chatQuestions.length && (
          <div className="p-4 border-t bg-background">
            <div className="space-y-3">
              {chatQuestions[currentQuestion]?.options.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  onClick={() => handleAnswer(chatQuestions[currentQuestion].id, option.id, option.text)}
                  className="w-full justify-start text-left h-auto p-4 hover:bg-primary/5 hover:border-primary/30"
                >
                  <span className="mr-3 text-lg">{option.icon}</span>
                  <span className="text-sm">{option.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Restart Button */}
        {showRecommendations && (
          <div className="p-4 border-t bg-background">
            <Button onClick={restartChat} variant="outline" className="w-full bg-transparent">
              <MessageCircle className="w-4 h-4 mr-2" />
              {t("jobs.chat.findNewJob")}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
