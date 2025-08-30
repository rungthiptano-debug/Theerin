"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Phone, DollarSign, Users } from "lucide-react"
import Link from "next/link"

export default function SnookerClubPage() {
  const [showInterest, setShowInterest] = useState(false)

  const handleInterest = () => {
    setShowInterest(true)
    setTimeout(() => setShowInterest(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community/events/sports">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">ชมรมสนุกเกอร์ประจำสัปดาห์</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Main Image */}
        <div className="w-full h-48 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-6 overflow-hidden">
          <img
            src="/snooker-balls-on-table.png"
            alt="Close-up photo of snooker balls on table with hands holding cues"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <Card className="p-6 mb-6 bg-white">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">ชมรมสนุกเกอร์ประจำสัปดาห์</h2>

          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            เพลิดเพลินกับเกมสนุกเกอร์เป็นมิตร! ยินดีต้อนรับทุกระดับทักษะ ตั้งแต่ผู้เริ่มต้นจนถึงผู้เล่นที่มีประสบการณ์ เป็นวิธีที่ดีในการเข้าสังคมและสนุกสนาน
          </p>

          {/* When */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-900">เมื่อไหร่:</h3>
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-medium">ทุกวันอังคาร</span>
              </div>
              <p className="text-lg text-slate-700">14:00 - 16:00 น.</p>
            </div>
          </div>

          {/* Where */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-900">ที่ไหน:</h3>
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-medium">ศูนย์ชุมชนดอนแก้ว (ห้องกิจกรรม 2)</span>
              </div>
              <Button variant="outline" className="mt-2 text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                ดูแผนที่
              </Button>
              <p className="text-slate-600 mt-2">ที่อยู่: 456 ถนนท้องถิ่น ดอนแก้ว เชียงใหม่</p>
            </div>
          </div>

          {/* What to Bring */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-900">ต้องเตรียมอะไรบ้าง:</h3>
            <div className="bg-slate-50 p-4 rounded-xl">
              <ul className="space-y-2 text-lg text-slate-700">
                <li>• แค่ตัวคุณและรอยยิ้ม!</li>
                <li>• มีไม้คิวให้ แต่ถ้าชอบก็นำมาเองได้</li>
              </ul>
            </div>
          </div>

          {/* Cost */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-900">ค่าใช้จ่าย:</h3>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-xl font-bold text-green-700">ฟรีสำหรับสมาชิก!</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-slate-900">ติดต่อสอบถาม:</h3>
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-lg font-medium">คุณสมชาย: 081-123-4567</p>
                  <p className="text-slate-600">สำหรับคำถามต่างๆ</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Interest Button */}
        <div className="text-center mb-6">
          {!showInterest ? (
            <Button
              onClick={handleInterest}
              size="lg"
              className="w-full text-xl py-4 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Users className="w-6 h-6 mr-3" />
              ฉันสนใจ!
            </Button>
          ) : (
            <Card className="p-6 bg-green-50 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-2">ขอบคุณ!</h3>
              <p className="text-lg text-green-600">
                คุณได้แสดงความสนใจในชมรมสนุกเกอร์แล้ว เราจะส่งการแจ้งเตือนให้คุณก่อนวันกิจกรรม!
              </p>
              <Button
                variant="outline"
                className="mt-4 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                เข้าใจแล้ว!
              </Button>
            </Card>
          )}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/community/events/sports">
            <Button variant="outline" size="lg" className="w-full text-lg py-4 bg-transparent">
              กลับไปที่กีฬาและการออกกำลังกาย
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
