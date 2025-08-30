"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Stethoscope, Calendar } from "lucide-react"
import Link from "next/link"

export default function HealthServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="ghost" className="text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-xl font-medium">
                <ArrowLeft className="w-5 h-5 mr-2" />
                กลับหน้าหลัก
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Theerin Health</h1>
            <div className="w-8"></div>
          </div>
          <p className="text-base text-slate-600 text-center font-medium">บริการสุขภาพครอบคลุมสำหรับผู้สูงอายุ</p>
        </div>
      </div>

      <div className="bg-white p-8 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Link href="/find-doctor">
              <Card className="p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white hover:-translate-y-2 shadow-xl">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">หาหมอ</h3>
                <p className="text-sm opacity-90">ค้นหาแพทย์เฉพาะทาง</p>
              </Card>
            </Link>

            <Link href="/appointment">
              <Card className="p-8 text-center cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:-translate-y-2 shadow-xl">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">นัดหมาย</h3>
                <p className="text-sm opacity-90">จองคิวออนไลน์</p>
              </Card>
            </Link>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">บริการสุขภาพของเรา</h2>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>ค้นหาแพทย์เฉพาะทางในโรงพยาบาลต่างๆ</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>จองนัดหมายออนไลน์ได้ตลอด 24 ชั่วโมง</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>ข้อมูลแพทย์และโรงพยาบาลที่ครบถ้วน</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span>บริการเฉพาะสำหรับผู้สูงอายุ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
