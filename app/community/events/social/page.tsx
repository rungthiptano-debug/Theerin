"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const socialEvents = [
  {
    id: "coffee-chat",
    name: "กาแฟและแชทตอนเช้า",
    image: "/coffee-cups-seniors-talking.png",
    schedule: "ทุกวันพุธ",
    location: "คาเฟ่อบอุ่น ดอนแก้ว",
    participants: "22 คน",
    description: "พบปะเพื่อนใหม่ในบรรยากาศสบายๆ",
  },
  {
    id: "christmas-party",
    name: "งานเลี้ยงคริสต์มาสประจำปี",
    image: "/seniors-christmas-party.png",
    schedule: "เก็บวันไว้สำหรับความสนุก!",
    location: "ศาลาชุมชนดอนแก้ว",
    participants: "50+ คน",
    description: "เฉลิมฉลองเทศกาลด้วยกันอย่างสนุกสนาน",
  },
]

export default function SocialEventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community/events">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">การพบปะสังสรรค์</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-40 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src="/seniors-chatting-laughing-tea.png"
              alt="Warm, inviting photo of seniors chatting and laughing over tea or at a party"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            มาร่วมแชทเป็นมิตร งานเฉลิมฉลองพิเศษ และโอกาสที่จะเพลิดเพลินกับเพื่อนๆ ที่ดี!
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">กิจกรรมที่จะมาถึง</h2>

          {socialEvents.map((event) => (
            <Card
              key={event.id}
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-white"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-green-100 rounded-xl flex items-center justify-center overflow-hidden">
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
