"use client"
import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const consultants = [
  {
    id: 1,
    name: "นพ.สมชาย ใจดี",
    specialty: "แพทย์เวชศาสตร์ครอบครัว",
    category: "health",
    rating: 4.9,
    experience: "15 ปี",
    price: "300 บาท/30 นาที",
    avatar: "/professional-thai-male-doctor-headshot.png",
    available: true,
    nextSlot: "14:00 น.",
    description: "เชี่ยวชาญด้านการดูแลสุขภาพผู้สูงอายุ โรคเรื้อรัง และการป้องกันโรค",
    fullDescription:
      "นพ.สมชาย ใจดี เป็นแพทย์เวชศาสตร์ครอบครัวที่มีประสบการณ์ 15 ปี ในการดูแลสุขภาพผู้สูงอายุ เชี่ยวชาญเฉพาะด้านโรคเรื้อรัง การป้องกันโรค และการให้คำปรึกษาด้านสุขภาพแบบองค์รวม",
    expertise: ["การดูแลสุขภาพผู้สูงอายุ", "โรคเรื้อรัง", "การป้องกันโรค", "การตรวจสุขภาพ"],
    education: "แพทยศาสตรบัณฑิต จุฬาลงกรณ์มหาวิทยาลัย",
    certifications: ["ใบรับรองแพทย์เวชศาสตร์ครอบครัว", "ใบรับรองการดูแลผู้สูงอายุ"],
  },
  {
    id: 2,
    name: "นพ.หญิง มาลี สุขใส",
    specialty: "แพทย์โรคหัวใจ",
    category: "health",
    rating: 4.8,
    experience: "20 ปี",
    price: "500 บาท/30 นาที",
    avatar: "/professional-thai-female-insurance-consultant-head.png",
    available: true,
    nextSlot: "15:30 น.",
    description: "ผู้เชี่ยวชาญด้านโรคหัวใจและหลอดเลือด การดูแลสุขภาพหัวใจผู้สูงอายุ",
    fullDescription: "นพ.หญิง มาลี สุขใส เป็นแพทย์โรคหัวใจที่มีประสบการณ์ 20 ปี เชี่ยวชาญด้านการดูแลโรคหัวใจและหลอดเลือดในผู้สูงอายุ",
    expertise: ["โรคหัวใจ", "โรคหลอดเลือด", "ความดันโลหิตสูง", "การดูแลหัวใจผู้สูงอายุ"],
    education: "แพทยศาสตรบัณฑิต มหาวิทยาลัยมหิดล",
    certifications: ["ใบรับรองแพทย์โรคหัวใจ", "ใบรับรองการดูแลผู้ป่วยโรคหัวใจ"],
  },
  {
    id: 3,
    name: "คุณประยุทธ์ เงินดี",
    specialty: "ที่ปรึกษาการเงิน",
    category: "finance",
    rating: 4.7,
    experience: "25 ปี",
    price: "400 บาท/45 นาที",
    avatar: "/professional-thai-male-financial-advisor-headshot.png",
    available: false,
    nextSlot: "พรุ่งนี้ 10:00 น.",
    description: "ให้คำปรึกษาการวางแผนการเงิน การออม และการลงทุนสำหรับผู้สูงอายุ",
    fullDescription: "คุณประยุทธ์ เงินดี เป็นที่ปรึกษาการเงินที่มีประสบการณ์ 25 ปี เชี่ยวชาญด้านการวางแผนการเงินสำหรับผู้สูงอายุ",
    expertise: ["การวางแผนการเงิน", "การออมเงิน", "การลงทุน", "ประกันชีวิต"],
    education: "ปริญญาโท การเงิน จุฬาลงกรณ์มหาวิทยาลัย",
    certifications: ["CFP (Certified Financial Planner)", "ใบอนุญาตที่ปรึกษาการลงทุน"],
  },
  {
    id: 4,
    name: "ทนายความสุดา ยุติธรรม",
    specialty: "ทนายความครอบครัว",
    category: "legal",
    rating: 4.6,
    experience: "18 ปี",
    price: "600 บาท/60 นาที",
    avatar: "/professional-thai-female-lawyer-headshot.png",
    available: true,
    nextSlot: "16:00 น.",
    description: "ให้คำปรึกษาด้านกฎหมายครอบครัว มรดก และสิทธิผู้สูงอายุ",
    fullDescription: "ทนายความสุดา ยุติธรรม เป็นทนายความที่มีประสบการณ์ 18 ปี เชี่ยวชาญด้านกฎหมายครอบครัวและสิทธิผู้สูงอายุ",
    expertise: ["กฎหมายครอบครัว", "กฎหมายมรดก", "สิทธิผู้สูงอายุ", "พินัยกรรม"],
    education: "นิติศาสตรบัณฑิต มหาวิทยาลัยธรรมศาสตร์",
    certifications: ["ใบอนุญาตประกอบวิชาชีพทนายความ", "ใบรับรองทนายความครอบครัว"],
  },
  {
    id: 5,
    name: "คุณวิชัย เทคโนโลยี",
    specialty: "ผู้เชี่ยวชาญเทคโนโลยี",
    category: "tech",
    rating: 4.5,
    experience: "12 ปี",
    price: "250 บาท/30 นาที",
    avatar: "/professional-thai-male-tech-consultant-headshot.png",
    available: true,
    nextSlot: "13:00 น.",
    description: "สอนการใช้สมาร์ทโฟน แอปพลิเคชัน และเทคโนโลยีต่างๆ สำหรับผู้สูงอายุ",
    fullDescription: "คุณวิชัย เทคโนโลยี เป็นผู้เชี่ยวชาญเทคโนโลยีที่มีประสบการณ์ 12 ปี เชี่ยวชาญด้านการสอนเทคโนโลยีสำหรับผู้สูงอายุ",
    expertise: ["การใช้สมาร์ทโฟน", "แอปพลิเคชัน", "อินเทอร์เน็ต", "การช้อปปิ้งออนไลน์"],
    education: "วิทยาศาสตรบัณฑิต เทคโนโลยีสารสนเทศ",
    certifications: ["ใบรับรองผู้สอนเทคโนโลยี", "ใบรับรองการสอนผู้สูงอายุ"],
  },
  {
    id: 6,
    name: "คุณสุมาลี สุขภาพดี",
    specialty: "นักโภชนาการ",
    category: "lifestyle",
    rating: 4.8,
    experience: "10 ปี",
    price: "300 บาท/45 นาที",
    avatar: "/professional-thai-female-nutritionist-headshot.png",
    available: true,
    nextSlot: "14:30 น.",
    description: "ให้คำปรึกษาด้านโภชนาการ การกิน และการดูแลสุขภาพผู้สูงอายุ",
    fullDescription: "คุณสุมาลี สุขภาพดี เป็นนักโภชนาการที่มีประสบการณ์ 10 ปี เชี่ยวชาญด้านโภชนาการสำหรับผู้สูงอายุ",
    expertise: ["โภชนาการผู้สูงอายุ", "การควบคุมน้ำหนัก", "อาหารเพื่อสุขภาพ", "การวางแผนอาหาร"],
    education: "วิทยาศาสตรบัณฑิต โภชนาการ",
    certifications: ["ใบรับรองนักโภชนาการ", "ใบรับรองโภชนาการผู้สูงอายุ"],
  },
]

export default function ConsultantProfilePage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const consultant = consultants.find((c) => c.id === Number.parseInt(params.id))

  if (!consultant) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{t("consulting.profile.notFound")}</h1>
          <Link href="/consulting" className="text-blue-600 hover:text-blue-700">
            {t("consulting.profile.backToConsulting")}
          </Link>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    if (selectedDay && selectedTime) {
      setShowConfirmation(true)
    }
  }

  const confirmBooking = () => {
    console.log(`Booking confirmed for ${consultant.name} on ${selectedDay} at ${selectedTime}`)
    setShowConfirmation(false)
    setSelectedDay("")
    setSelectedTime("")
    alert(t("consulting.profile.bookingSuccess"))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/consulting">
              <button className="p-2 hover:bg-slate-100 rounded-lg">
                <span className="text-xl">←</span>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">{t("consulting.profile.title")}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Consultant Profile */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100">
              <img
                src={consultant.avatar || "/placeholder.svg"}
                alt={consultant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{consultant.name}</h2>
            <p className="text-lg text-slate-600 mb-3">{consultant.specialty}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{consultant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👤</span>
                <span>
                  {t("consulting.profile.experience")} {consultant.experience}
                </span>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("consulting.profile.about")}</h3>
            <p className="text-slate-700 leading-relaxed">{consultant.fullDescription}</p>
          </div>

          {/* Expertise */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("consulting.profile.expertise")}</h3>
            <div className="flex flex-wrap gap-2">
              {consultant.expertise.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{t("consulting.profile.qualifications")}</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">🎓</span>
                <span className="text-slate-700 text-sm">{consultant.education}</span>
              </div>
              {consultant.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-green-600">🏆</span>
                  <span className="text-slate-700 text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{t("consulting.profile.serviceRate")}</h3>
            <p className="text-2xl font-bold text-blue-600">{consultant.price}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">{t("consulting.profile.bookConsultation")}</h3>
          <p className="text-slate-600 mb-6">{t("consulting.profile.bookingDescription")}</p>

          {/* Day Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-slate-900 mb-3">{t("consulting.profile.selectDay")}</h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "today", label: t("consulting.profile.today") },
                { key: "tomorrow", label: t("consulting.profile.tomorrow") },
                { key: "nextWeek", label: t("consulting.profile.nextWeek") },
              ].map((day) => (
                <button
                  key={day.key}
                  onClick={() => setSelectedDay(day.key)}
                  className={`p-3 rounded-lg border text-sm font-medium ${
                    selectedDay === day.key
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-slate-900 mb-3">{t("consulting.profile.selectTime")}</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "morning", label: t("consulting.profile.morning") },
                { key: "afternoon", label: t("consulting.profile.afternoon") },
              ].map((time) => (
                <button
                  key={time.key}
                  onClick={() => setSelectedTime(time.key)}
                  className={`p-3 rounded-lg border text-sm font-medium ${
                    selectedTime === time.key
                      ? "bg-blue-100 border-blue-500 text-blue-700"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            disabled={!selectedDay || !selectedTime}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-lg text-lg"
          >
            {t("consulting.profile.bookButton")}
          </button>

          <p className="text-xs text-slate-500 text-center mt-3">{t("consulting.profile.registeredPhone")}</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">{t("consulting.profile.confirmBooking")}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">{t("consulting.profile.expert")}:</span>
                <span className="font-medium">{consultant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{t("consulting.profile.day")}:</span>
                <span className="font-medium">
                  {selectedDay === "today" && t("consulting.profile.today")}
                  {selectedDay === "tomorrow" && t("consulting.profile.tomorrow")}
                  {selectedDay === "nextWeek" && t("consulting.profile.nextWeek")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{t("consulting.profile.time")}:</span>
                <span className="font-medium">
                  {selectedTime === "morning" && t("consulting.profile.morning")}
                  {selectedTime === "afternoon" && t("consulting.profile.afternoon")}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">{t("consulting.profile.callbackInfo")}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
              >
                {t("consulting.profile.cancel")}
              </button>
              <button
                onClick={confirmBooking}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                {t("consulting.profile.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
