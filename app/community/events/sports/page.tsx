"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const sportsEvents = [
  {
    id: "snooker",
    name: "ชมรมสนุกเกอร์ประจำสัปดาห์",
    image: "/seniors-playing-snooker.png",
    schedule: "ทุกวันอังคาร บ่าย",
    location: "ศูนย์ชุมชนดอนแก้ว",
    participants: "12 คน",
    description: "เกมสนุกเกอร์เป็นมิตร ทุกระดับทักษะยินดีต้อนรับ",
  },
  {
    id: "yoga",
    name: "โยคะเช้าสำหรับทุกคน",
    image: "/seniors-doing-yoga.png",
    schedule: "วันพฤหัสบดี 9:00 น.",
    location: "สวนสาธารณะท้องถิ่น",
    participants: "18 คน",
    description: "โยคะนั่งหรือยืนเบาๆ เหมาะสำหรับทุกคน",
  },
  {
    id: "walking",
    name: "กลุ่มเดินเบาๆ",
    image: "/seniors-walking-in-park.png",
    schedule: "จันทร์และศุกร์ 7:30 น.",
    location: "สวนแม่ข่าจาน ดอนแก้ว",
    participants: "25 คน",
    description: "เดินเล่นเบาๆ ในบรรยากาศธรรมชาติ",
  },
]

export default function SportsEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community/events">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">กีฬาและการออกกำลังกาย</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-40 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src="/seniors-doing-gentle-yoga.png"
              alt="Seniors doing gentle yoga or playing snooker"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            เคลื่อนไหวและมีสุขภาพดี! เข้าร่วมชมรมและกิจกรรมที่ออกแบบมาสำหรับทุกระดับความสามารถ
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">กิจกรรมที่จะมาถึง</h2>

          {sportsEvents.map((event) => (
            <Link key={event.id} href={`/community/events/sports/${event.id}`}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-300 bg-white">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-orange-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{event.name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.participants}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{event.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/community/events">
            <Button variant="outline" size="lg" className="w-full text-lg py-4 bg-transparent">
              กลับไปที่ภาพรวมกิจกรรม
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
