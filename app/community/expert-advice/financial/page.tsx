"use client"
import { ArrowLeft, Star, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function FinancialAdvisorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community/expert-advice">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">ที่ปรึกษาการเงินและประกัน</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Introduction */}
        <div className="text-center mb-8">
          <p className="text-lg text-slate-700 leading-relaxed">
            พบกับทีมผู้เชี่ยวชาญด้านการเงินและประกันที่มีประสบการณ์ของเรา
            ที่ปรึกษาแต่ละคนตั้งอยู่ในเชียงใหม่และมุ่งมั่นที่จะช่วยให้คุณตัดสินใจอย่างมีข้อมูลด้วยความมั่นใจ
          </p>
        </div>

        {/* Advisor Cards */}
        <div className="space-y-6">
          {/* Advisor 1: Somchai */}
          <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
                <img src="/advisor-somchai.png" alt="คุณสมชาย ใจดี" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">คุณสมชาย ใจดี</h3>
                    <p className="text-lg text-blue-600 font-medium">ผู้วางแผนการเงินรับรอง</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    พร้อมให้คำปรึกษา
                  </div>
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>4.9 คะแนน</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>15 ปีประสบการณ์</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>เชี่ยวชาญเกษียณและประกันสุขภาพ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <p className="text-slate-700 italic">
                "ภารกิจของผมคือให้คำแนะนำทางการเงินที่ชัดเจนและซื่อสัตย์ เพื่อช่วยให้ครอบครัวในเชียงใหม่มีความสงบใจและอนาคตที่มั่นคง"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href="/community/expert-advice/financial/somchai" className="flex-1">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
                  ดูโปรไฟล์และจอง
                </button>
              </Link>
              <button className="flex-1 bg-transparent border border-slate-300 hover:bg-slate-50 py-3 px-4 rounded-lg font-medium">
                ส่งข้อความ
              </button>
            </div>
          </div>

          {/* Advisor 2: Malee */}
          <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200">
                <img src="/advisor-malee.png" alt="คุณหญิง มาลี สุขใจ" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">คุณหญิง มาลี สุขใจ</h3>
                    <p className="text-lg text-blue-600 font-medium">ที่ปรึกษาประกันอาวุโส</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    พร้อมให้คำปรึกษา
                  </div>
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>4.8 คะแนน</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>20 ปีประสบการณ์</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>เชี่ยวชาญประกันชีวิตและการวางแผนมรดก</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <p className="text-slate-700 italic">"ฉันช่วยคุณปกป้องสิ่งที่สำคัญที่สุด มาสร้างแผนที่ปลอดภัยสำหรับคุณและคนที่คุณรักกัน"</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
                ดูโปรไฟล์และจอง
              </button>
              <button className="flex-1 bg-transparent border border-slate-300 hover:bg-slate-50 py-3 px-4 rounded-lg font-medium">
                ส่งข้อความ
              </button>
            </div>
          </div>
        </div>

        {/* Trust Message */}
        <div className="mt-8 text-center">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <p className="text-lg text-blue-800 font-medium">
              💼 ที่ปรึกษาทุกคนได้รับใบอนุญาตและเป็นสมาชิกของสมาคมวิชาชีพที่เกี่ยวข้อง
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
