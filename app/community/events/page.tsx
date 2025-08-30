"use client"
import { ArrowLeft, Dumbbell, Book, Coffee } from "lucide-react"
import Link from "next/link"

export default function EventsClubsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">กิจกรรมและชมรมสนุกๆ ใกล้คุณ!</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-48 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
              <div className="text-white text-center">
                <Dumbbell className="w-16 h-16 mx-auto mb-2" />
                <p className="text-lg font-semibold">กิจกรรมสำหรับผู้สูงอายุ</p>
              </div>
            </div>
          </div>
          <p className="text-xl text-slate-700 leading-relaxed font-medium">
            ไม่เคยเบื่อ! ค้นหากิจกรรมที่น่าตื่นเต้น เข้าร่วมชมรม และพบปะผู้คนใหม่ในดอนแก้ว เชียงใหม่ มีกิจกรรมเกิดขึ้นตลอดเวลา!
          </p>
        </div>

        {/* Event Categories */}
        <div className="space-y-6">
          {/* Sports & Fitness */}
          <Link href="/community/events/sports">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">กีฬาและการออกกำลังกาย</h3>
                  <p className="text-lg text-slate-600">สนุกเกอร์ โบว์ลิ่ง โยคะ วิ่ง เดินป่า!</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Learning & Tours */}
          <Link href="/community/events/learning">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Book className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">การเรียนรู้และทัวร์</h3>
                  <p className="text-lg text-slate-600">สำรวจสถานที่ใหม่ เรียนรู้สิ่งใหม่</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Social Gatherings */}
          <Link href="/community/events/social">
            <div className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-white rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">การพบปะสังสรรค์</h3>
                  <p className="text-lg text-slate-600">แชท งานเลี้ยงคริสต์มาส และอื่นๆ อีกมากมาย!</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/community">
            <button className="w-full text-lg py-4 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              กลับไปที่ชุมชนหลัก
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
