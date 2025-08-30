"use client"
import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function ConsultingPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [selectedConsultant, setSelectedConsultant] = useState(null)
  const [messageForm, setMessageForm] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const consultingCategories = [
    { id: "health", name: t("consulting.health"), icon: "🏥", color: "bg-green-100 text-green-700" },
    { id: "finance", name: t("consulting.finance"), icon: "💰", color: "bg-blue-100 text-blue-700" },
    { id: "legal", name: t("consulting.legal"), icon: "⚖️", color: "bg-purple-100 text-purple-700" },
    { id: "tech", name: t("consulting.tech"), icon: "💻", color: "bg-orange-100 text-orange-700" },
    { id: "lifestyle", name: t("consulting.lifestyle"), icon: "🌱", color: "bg-pink-100 text-pink-700" },
  ]

  const consultants = [
    {
      id: 1,
      name: "คุณสมชาย ใจดี",
      englishName: "Khun Somchai Jaidee",
      title: "Certified Financial Planner",
      specialty: "ที่ปรึกษาทางการเงิน",
      category: "finance",
      rating: 4.9,
      experience: "15 Years of Experience",
      specialization: "Retirement & Health Insurance",
      available: true,
      bio: "My mission is to provide clear, honest financial guidance to help families in Chiang Mai achieve peace of mind and a secure future.",
      image: "/professional-thai-male-financial-advisor-headshot.png",
    },
    {
      id: 2,
      name: "คุณหญิง มาลี สุขใจ",
      englishName: "Khunying Malee Sukjai",
      title: "Senior Insurance Consultant",
      specialty: "ที่ปรึกษาประกันภัย",
      category: "finance",
      rating: 4.8,
      experience: "20 Years of Experience",
      specialization: "Life & Estate Planning",
      available: true,
      bio: "I help you protect what matters most. Let's build a secure plan for you and your loved ones.",
      image: "/professional-thai-female-insurance-consultant-head.png",
    },
    {
      id: 3,
      name: "นพ.ประยุทธ์ สุขภาพดี",
      englishName: "Dr. Prayuth Sukhapdi",
      title: "Family Medicine Physician",
      specialty: "แพทย์เวชศาสตร์ครอบครัว",
      category: "health",
      rating: 4.7,
      experience: "25 Years of Experience",
      specialization: "Elderly Care & Chronic Diseases",
      available: false,
      bio: "Dedicated to providing comprehensive healthcare for seniors with focus on preventive medicine and chronic disease management.",
      image: "/professional-thai-male-doctor-headshot.png",
    },
    {
      id: 4,
      name: "ทนายความสุดา ยุติธรรม",
      englishName: "Lawyer Suda Yuttitham",
      title: "Family Law Attorney",
      specialty: "ทนายความครอบครัว",
      category: "legal",
      rating: 4.6,
      experience: "18 Years of Experience",
      specialization: "Estate Planning & Elder Rights",
      available: true,
      bio: "Providing compassionate legal guidance for families, specializing in inheritance planning and protecting senior citizens' rights.",
      image: "/professional-thai-female-lawyer-headshot.png",
    },
    {
      id: 5,
      name: "คุณวิชัย เทคโนโลยี",
      englishName: "Khun Wichai Technology",
      title: "Senior Technology Consultant",
      specialty: "ผู้เชี่ยวชาญเทคโนโลยี",
      category: "tech",
      rating: 4.5,
      experience: "12 Years of Experience",
      specialization: "Digital Literacy for Seniors",
      available: true,
      bio: "Making technology accessible and enjoyable for seniors through patient, step-by-step guidance and practical training.",
      image: "/professional-thai-male-tech-consultant-headshot.png",
    },
    {
      id: 6,
      name: "คุณสุมาลี สุขภาพดี",
      englishName: "Khun Sumalee Sukhapdi",
      title: "Certified Nutritionist",
      specialty: "นักโภชนาการ",
      category: "lifestyle",
      rating: 4.8,
      experience: "10 Years of Experience",
      specialization: "Senior Nutrition & Wellness",
      available: true,
      bio: "Helping seniors maintain optimal health through personalized nutrition plans and lifestyle guidance tailored for aging well.",
      image: "/professional-thai-female-nutritionist-headshot.png",
    },
  ]

  const filteredConsultants = consultants.filter(
    (consultant) => selectedCategory === "all" || consultant.category === selectedCategory,
  )

  const handleSendMessage = (consultant) => {
    setSelectedConsultant(consultant)
    setShowMessageModal(true)
  }

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    setShowMessageModal(false)
    setShowConfirmation(true)
    setMessageForm({ name: "", phone: "", message: "" })
    setTimeout(() => {
      setShowConfirmation(false)
    }, 5000)
  }

  const handleInputChange = (field, value) => {
    setMessageForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="text-xl">←</span>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">{t("consulting.title")}</h1>
          </div>
          <p className="text-slate-600">{t("consulting.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">{t("consulting.categories")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`h-auto p-4 flex flex-col items-center gap-2 rounded-lg border-2 transition-colors ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              <span className="text-2xl">🔍</span>
              <span className="text-sm">{t("consulting.all")}</span>
            </button>
            {consultingCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`h-auto p-4 flex flex-col items-center gap-2 rounded-lg border-2 transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Consultants List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {t("consulting.experts")} ({filteredConsultants.length} {t("consulting.people")})
          </h2>

          {filteredConsultants.map((consultant) => (
            <div key={consultant.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
              {/* Status Indicator - Upper Right Corner */}
              <div className="absolute top-4 right-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    consultant.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {consultant.available ? t("consulting.available") : t("consulting.unavailable")}
                </div>
              </div>

              <div className="space-y-4">
                {/* Professional Headshot and Basic Info */}
                <div className="flex items-start gap-4 pr-32">
                  <img
                    src={consultant.image || "/placeholder.svg"}
                    alt={consultant.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{consultant.name}</h3>
                    <p className="text-sm text-slate-500 mb-1">({consultant.englishName})</p>
                    <p className="text-blue-700 font-semibold">{consultant.title}</p>
                  </div>
                </div>

                {/* Key Credentials */}
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span className="font-medium">
                      {consultant.rating} {t("consulting.rating")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📜</span>
                    <span>{consultant.experience}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <span>✔</span>
                  <span>
                    {t("consulting.specializes")} {consultant.specialization}
                  </span>
                </div>

                {/* Professional Bio */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-700 text-sm leading-relaxed italic">"{consultant.bio}"</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link href={`/consulting/${consultant.id}`} className="flex-1">
                    <button
                      disabled={!consultant.available}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg font-medium transition-colors"
                    >
                      {t("consulting.viewProfile")}
                    </button>
                  </Link>
                  <button
                    onClick={() => handleSendMessage(consultant)}
                    disabled={!consultant.available}
                    className="px-6 h-12 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-700 disabled:text-slate-400 rounded-lg font-medium transition-colors"
                  >
                    {t("consulting.sendMessage")}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredConsultants.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl text-slate-300 block mb-4">💬</span>
              <p className="text-slate-500 text-lg">{t("consulting.noExperts")}</p>
              <p className="text-slate-400">{t("consulting.tryOther")}</p>
            </div>
          )}
        </div>

        {/* Emergency Consultation */}
        <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-900 mb-2">{t("consulting.emergency.title")}</h3>
            <p className="text-red-700 text-sm mb-4">{t("consulting.emergency.description")}</p>
            <button className="bg-red-600 hover:bg-red-700 text-white w-full h-12 rounded-lg font-medium flex items-center justify-center gap-2">
              <span>📞</span>
              <span>{t("consulting.emergency.call")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">{t("consulting.message.title")}</h3>
              <button onClick={() => setShowMessageModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="text-slate-600">
                {t("consulting.message.sendTo")} <strong>{selectedConsultant?.name}</strong>
              </p>
              <p className="text-sm text-slate-500">{t("consulting.message.response")}</p>
            </div>

            <form onSubmit={handleSubmitMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("consulting.message.yourName")}
                </label>
                <input
                  type="text"
                  required
                  value={messageForm.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t("consulting.message.enterName")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("consulting.message.phoneNumber")}
                </label>
                <input
                  type="tel"
                  required
                  value={messageForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t("consulting.message.enterPhone")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t("consulting.message.helpWith")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={messageForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t("consulting.message.describe")}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                >
                  {t("consulting.message.cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  {t("consulting.message.send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("consulting.confirmation.title")}</h3>
            <p className="text-slate-600 mb-4">
              {t("consulting.confirmation.sent")} <strong>{selectedConsultant?.name}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 font-medium">📱 {t("consulting.confirmation.autoReply")}</p>
              <p className="text-blue-700 text-sm mt-1">"{t("consulting.confirmation.replyMessage")}"</p>
            </div>
            <p className="text-sm text-slate-500">
              <strong>{t("consulting.confirmation.waitTime")}</strong>
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="mt-4 w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {t("consulting.confirmation.gotIt")}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
