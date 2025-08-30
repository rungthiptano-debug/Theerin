"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const learningEvents = [
  {
    id: "temple-tour",
    name: "ทัวร์วัดท้องถิ่น",
    image: "/beautiful-local-temple.png",
    schedule: "เดือนหน้า: เรียนรู้ประวัติศาสตร์ท้องถิ่น",
    location: "วัดสวนดอก ดอนแก้ว",
    participants: "15 คน",
    description: "เรียนรู้ประวัติศาสตร์และวัฒนธรรมท้องถิ่น",
  },
  {
    id: "gardening",
    name: "เวิร์กช็อปการทำสวน",
    image: "/senior-tending-plants.png",
    schedule: "เรียนรู้เทคนิคสำหรับสวนที่บ้าน",
    location: "ตลาดเกษตรกรดอนแก้ว",
    participants: "20 คน",
    description: "เทคนิคการปลูกผักและดูแลต้นไม้",
  },
]

export default function LearningEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community/events">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">การเรียนรู้และทัวร์</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-40 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src="/seniors-exploring-temple.png"
              alt="Seniors exploring a local temple or historical site in Chiang Mai"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            ค้นพบวัฒนธรรมอันยาวนานของเชียงใหม่และเรียนรู้สิ่งใหม่! ทัวร์และการบรรยายของเราออกแบบมาเพื่อความเพลิดเพลินง่ายๆ
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">กิจกรรมที่จะมาถึง</h2>

          {learningEvents.map((event) => (
            <Card
              key={event.id}
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-white"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center overflow-hidden">
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
