"use client"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Link from "next/link"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"
import Image from 'next/image'

export default function HomePage() {
  const [isGoingOut, setIsGoingOut] = useState(false)
  const { t } = useLanguage()

  const currentDate = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const currentTime = new Date().toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const handleGoingOut = () => {
    setIsGoingOut(!isGoingOut)
    alert(isGoingOut ? "แจ้งเตือน: กลับบ้านแล้ว" : "แจ้งเตือน: ออกจากบ้านแล้ว")
  }

  const handlePanicButton = () => {
    alert("🚨 ส่งสัญญาณขอความช่วยเหลือแล้ว! กำลังแจ้งเตือนผู้ติดต่อฉุกเฉิน...")
  }

  const handleDailyCheckIn = () => {
    alert("✅ บันทึกการเช็คอินรายวันแล้ว - คุณปลอดภัยดี!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/*<div className="bg-gradient-to-r from-#acd8a-600 via-#acd8a-700 to-#acd8a-800 shadow-xl">*/}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 shadow-xl">
        <div className="max-w-full mx-auto px-4 py-6">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl font-light text-white mb-3">{currentTime}</div>
            <div className="text-base text-sky-200 mb-6">{currentDate}</div>

            <div className="flex items-center justify-center mb-6">
             {/*<div className="w-20 h-20 bg-gradient-to-br from-green-400 to-white-500 rounded-3xl flex items-center justify-center shadow-lg border-2 border-white/30">*/}
             <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center p-2">
              <Image 
           src="/logos/logooooooo.png"   
           alt="Theerin Logo"
           width={120}
           height={60}
          priority
          className="object-contain"
         />
                {/*<div className="w-10 h-2.5 bg-white rounded-full shadow-sm"></div>
                <div className="absolute w-2.5 h-10 bg-white rounded-full shadow-sm"></div>*/}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-3">{t("app.title")}</h1>
            <p className="text-xl text-amber-200 font-semibold tracking-wide">Wisdom at work, wellness in lives</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-sm mx-auto mb-8">
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleGoingOut}
              className="h-20 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-4"
            >
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-3 h-4 bg-green-600 rounded-sm relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <span className="text-lg font-bold">{t("home.travelAlert")}</span>
            </button>

            <button
              onClick={handlePanicButton}
              className="h-20 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-4"
            >
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-600"></div>
                </div>
              </div>
              <span className="text-lg font-bold">{t("home.emergencyButton")}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <Link href="/find-doctor">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-1.5 bg-blue-600 rounded-full"></div>
                  <div className="absolute w-1.5 h-4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.findDoctor")}</h3>
            </Card>
          </Link>

          <Link href="/appointment">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-sky-600 to-sky-700 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-6 h-5 bg-white rounded-lg p-1">
                  <div className="w-full h-0.5 bg-sky-600 rounded-sm mb-0.5"></div>
                  <div className="grid grid-cols-3 gap-0.5">
                    <div className="w-0.5 h-0.5 bg-sky-600 rounded-sm"></div>
                    <div className="w-0.5 h-0.5 bg-sky-600 rounded-sm"></div>
                    <div className="w-0.5 h-0.5 bg-sky-600 rounded-sm"></div>
                    <div className="w-0.5 h-0.5 bg-sky-600 rounded-sm"></div>
                    <div className="w-0.5 h-0.5 bg-sky-600 rounded-sm"></div>
                    <div className="w-0.5 h-0.5 bg-sky-600 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.appointment")}</h3>
            </Card>
          </Link>

          <Link href="/find-job">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-amber-600 to-yellow-700 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-6 h-5 bg-white rounded-lg relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-amber-600 rounded-sm"></div>
                  <div className="absolute bottom-0.5 left-0.5 right-0.5 h-0.5 bg-amber-600 rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.findJob")}</h3>
            </Card>
          </Link>

          <Link href="/community">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center space-x-0.5">
                  <div className="w-1 h-1 bg-blue-700 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-700 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-700 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.community")}</h3>
            </Card>
          </Link>

          <Link href="/consulting">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-5 h-6 bg-white rounded-lg relative">
                  <div className="absolute bottom-0 left-0.5 w-1 h-1 bg-white transform rotate-45 translate-y-0.5"></div>
                  <div className="absolute top-1.5 left-1 right-1 h-0.5 bg-indigo-600 rounded-full"></div>
                  <div className="absolute top-2.5 left-1 right-1.5 h-0.5 bg-indigo-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.consulting")}</h3>
            </Card>
          </Link>

          <Link href="/smart-watch">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-white rounded-2xl relative border-2 border-purple-600">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-1.5 h-0.5 bg-white rounded-sm"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-0.5 w-1.5 h-0.5 bg-white rounded-sm"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-purple-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">Smart Watch</h3>
            </Card>
          </Link>

          <Card
            className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-xl flex flex-col items-center justify-center"
            onClick={handleDailyCheckIn}
          >
            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
              <div className="w-6 h-6 bg-white rounded-lg flex items-end justify-center space-x-0.5 p-1">
                <div className="w-0.5 h-2 bg-sky-600 rounded-sm"></div>
                <div className="w-0.5 h-3 bg-sky-600 rounded-sm"></div>
                <div className="w-0.5 h-2.5 bg-sky-600 rounded-sm"></div>
                <div className="w-0.5 h-4 bg-sky-600 rounded-sm"></div>
              </div>
            </div>
            <h3 className="text-sm font-bold leading-tight">{t("home.dailyCheckIn")}</h3>
          </Card>

          <Link href="/history">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-5 h-6 bg-white rounded-lg relative">
                  <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-slate-600 rounded-full"></div>
                  <div className="absolute top-1.5 left-0.5 right-0.5 h-0.5 bg-slate-600 rounded-full"></div>
                  <div className="absolute top-2.5 left-0.5 right-1 h-0.5 bg-slate-600 rounded-full"></div>
                  <div className="absolute top-3.5 left-0.5 right-0.5 h-0.5 bg-slate-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.history")}</h3>
            </Card>
          </Link>

          <Link href="/location-reminder">
            <Card className="h-32 p-4 text-center cursor-pointer hover:scale-105 transition-all duration-300 border-0 rounded-3xl bg-gradient-to-br from-teal-600 to-teal-700 text-white shadow-xl flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-3">
                <div className="w-5 h-6 bg-white rounded-full relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-1.5 border-r-1.5 border-t-2 border-l-transparent border-r-transparent border-t-white"></div>
                  <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-teal-600 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-sm font-bold leading-tight">{t("home.locationReminder")}</h3>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
