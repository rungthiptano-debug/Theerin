"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Scale, Heart } from "lucide-react"
import Link from "next/link"

export default function ExpertAdviceHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">ที่ปรึกษาที่เชื่อถือได้</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
            <img
              src="/professional-thai-advisors-group.png"
              alt="Professional Thai advisors in modern Chiang Mai office"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">ได้รับความชัดเจนและความมั่นใจสำหรับอนาคตของคุณ</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            เชื่อมต่อกับเครือข่ายผู้เชี่ยวชาญท้องถิ่นที่ผ่านการตรวจสอบแล้วในดอนแก้วและเชียงใหม่ เพื่อคำแนะนำส่วนบุคคลเกี่ยวกับการเงิน ประกัน และอื่นๆ
          </p>
        </div>

        {/* Interactive Sections */}
        <div className="space-y-6">
          {/* Financial & Insurance Planning */}
          <Link href="/community/expert-advice/financial">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-white">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">การวางแผนการเงินและประกัน</h3>
                  <p className="text-lg text-slate-600">รักษาความปลอดภัยการเกษียณ เข้าใจประกัน และวางแผนการลงทุน</p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Legal & Official Matters */}
          <Link href="/community/expert-advice/legal">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-amber-300 bg-white">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Scale className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">เรื่องกฎหมายและเอกสารราชการ</h3>
                  <p className="text-lg text-slate-600">รับความช่วยเหลือเรื่องพินัยกรรม เอกสารทรัพย์สิน และคำถามทางกฎหมายอื่นๆ</p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Health & Wellness Consulting */}
          <Link href="/find-doctor">
            <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-white">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">คำปรึกษาด้านสุขภาพและความเป็นอยู่</h3>
                  <p className="text-lg text-slate-600">พูดคุยกับผู้เชี่ยวชาญเกี่ยวกับการวางแผนสุขภาพระยะยาวและตัวเลือกการดูแล</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Trust Message */}
        <div className="mt-8 text-center">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <p className="text-lg text-blue-800 font-medium">
              ✨ ผู้เชี่ยวชาญของเราทุกคนได้รับการตรวจสอบและมีประสบการณ์ในการให้บริการชุมชนเชียงใหม่ ✨
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
