"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function LocationReminderPage() {
  const { t } = useLanguage()
  const [showAddReminder, setShowAddReminder] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("")
  const [reminderText, setReminderText] = useState("")
  const [reminderType, setReminderType] = useState("medicine")
  const [currentLocation, setCurrentLocation] = useState("บ้าน")

  const locationReminders = [
    {
      id: 1,
      location: "บ้าน",
      address: "123 ถนนนิมมานเหมินท์ เชียงใหม่",
      reminders: [
        { id: 1, type: "medicine", text: "ทานยาความดันโลหิต", time: "เมื่อกลับถึงบ้าน", active: true },
        { id: 2, type: "task", text: "ตรวจสอบประตูล็อค", time: "เมื่อออกจากบ้าน", active: true },
      ],
      currentlyHere: true,
      lastUpdate: "12:30 น.",
    },
    {
      id: 2,
      location: "โรงพยาบาลศรีนครินทร์",
      address: "110 ถนนอินทวโรรส เชียงใหม่",
      reminders: [
        { id: 3, type: "medicine", text: "นำบัตรประกันสุขภาพ", time: "เมื่อถึงโรงพยาบาล", active: true },
        { id: 4, type: "task", text: "ถามหมอเรื่องยาใหม่", time: "เมื่อถึงโรงพยาบาล", active: true },
      ],
      currentlyHere: false,
      lastVisit: "เมื่อวาน 10:30 น.",
    },
    {
      id: 3,
      location: "ตลาดสดเชียงใหม่",
      address: "ถนนช้างคลาน เชียงใหม่",
      reminders: [
        { id: 5, type: "shopping", text: "ซื้อผักใบเขียว", time: "เมื่อถึงตลาด", active: true },
        { id: 6, type: "shopping", text: "ซื้อปลาสด", time: "เมื่อถึงตลาด", active: true },
      ],
      currentlyHere: false,
      lastVisit: "3 วันที่แล้ว",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "medicine",
      message: "เตือน: ทานยาความดันโลหิต",
      location: "บ้าน",
      time: "12:35 น.",
      status: "completed",
    },
    {
      id: 2,
      type: "task",
      message: "เตือน: ตรวจสอบประตูล็อค",
      location: "บ้าน",
      time: "09:25 น.",
      status: "completed",
    },
    {
      id: 3,
      type: "shopping",
      message: "เตือน: ซื้อผักใบเขียว",
      location: "ตลาดสดเชียงใหม่",
      time: "3 วันที่แล้ว",
      status: "missed",
    },
  ]

  const getReminderIcon = (type: string) => {
    switch (type) {
      case "medicine":
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="relative">
              <div className="w-6 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-6 bg-white rounded-full absolute top-[-2px] left-2"></div>
            </div>
          </div>
        )
      case "shopping":
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="relative">
              <div className="w-5 h-4 border-2 border-white rounded-sm"></div>
              <div className="w-6 h-1 bg-white rounded-full absolute -top-1 -left-0.5"></div>
              <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1"></div>
              <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-3"></div>
            </div>
          </div>
        )
      case "task":
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="relative">
              <div className="w-5 h-6 bg-white rounded-sm"></div>
              <div className="w-3 h-0.5 bg-amber-500 absolute top-1.5 left-1"></div>
              <div className="w-3 h-0.5 bg-amber-500 absolute top-2.5 left-1"></div>
              <div className="w-2 h-0.5 bg-amber-500 absolute top-3.5 left-1"></div>
            </div>
          </div>
        )
      default:
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-1 h-6 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full absolute mt-8"></div>
          </div>
        )
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("[v0] Checking current location...")
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const addNewReminder = () => {
    if (reminderText.trim() && selectedLocation) {
      console.log("[v0] Adding reminder:", { location: selectedLocation, text: reminderText, type: reminderType })
      setReminderText("")
      setSelectedLocation("")
      setShowAddReminder(false)
    }
  }

  const toggleReminder = (locationId: number, reminderId: number) => {
    console.log("[v0] Toggling reminder:", { locationId, reminderId })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100">
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <button className="p-3 hover:bg-blue-50 rounded-2xl transition-all duration-200 group">
                <svg
                  className="w-6 h-6 text-blue-600 group-hover:text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800 mb-1">{t("locationReminder.title")}</h1>
              <p className="text-slate-600 text-sm">{t("locationReminder.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6">
        <div className="p-8 mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-blue-100 text-sm font-medium mb-1">{t("locationReminder.currentLocation")}</p>
                <h3 className="text-white font-bold text-xl mb-1">{currentLocation}</h3>
                <p className="text-blue-100 text-sm">{t("locationReminder.autoUpdate")}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg mb-1"></div>
                <span className="text-green-200 text-xs font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>

        {locationReminders
          .find((loc) => loc.location === currentLocation && loc.currentlyHere)
          ?.reminders.filter((r) => r.active).length > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-900">{t("locationReminder.remindersHere")}</h3>
            </div>
            <div className="space-y-4">
              {locationReminders
                .find((loc) => loc.location === currentLocation)
                ?.reminders.filter((r) => r.active)
                .map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-all duration-200"
                  >
                    {getReminderIcon(reminder.type)}
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-lg mb-1">{reminder.text}</p>
                      <p className="text-slate-600 text-sm">{reminder.time}</p>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105">
                      {t("locationReminder.completed")}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="mb-10">
          <button
            onClick={() => setShowAddReminder(!showAddReminder)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-5 px-6 rounded-3xl font-semibold flex items-center justify-center gap-4 shadow-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="w-8 h-8 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-lg">{t("locationReminder.addNewReminder")}</span>
          </button>

          {showAddReminder && (
            <div className="mt-8 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{t("locationReminder.addNewReminder")}</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">สถานที่</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 text-lg"
                  >
                    <option value="">{t("locationReminder.selectLocation")}</option>
                    {locationReminders.map((location) => (
                      <option key={location.id} value={location.location}>
                        {location.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">ประเภทการเตือน</label>
                  <select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value)}
                    className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 text-lg"
                  >
                    <option value="medicine">{t("locationReminder.reminderTypes.medicine")}</option>
                    <option value="shopping">{t("locationReminder.reminderTypes.shopping")}</option>
                    <option value="task">{t("locationReminder.reminderTypes.task")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">รายละเอียด</label>
                  <input
                    type="text"
                    placeholder={t("locationReminder.reminderPlaceholder")}
                    value={reminderText}
                    onChange={(e) => setReminderText(e.target.value)}
                    className="w-full p-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 text-lg"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={addNewReminder}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 text-lg"
                  >
                    {t("locationReminder.add")}
                  </button>
                  <button
                    onClick={() => setShowAddReminder(false)}
                    className="flex-1 border-2 border-slate-300 hover:bg-slate-50 text-slate-700 py-4 rounded-2xl font-semibold transition-all duration-200 text-lg"
                  >
                    {t("locationReminder.cancel")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{t("locationReminder.locationReminders")}</h2>
          </div>
          <div className="space-y-6">
            {locationReminders.map((location) => (
              <div
                key={location.id}
                className="p-8 bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <h3 className="font-bold text-slate-900 text-xl">{location.location}</h3>
                      {location.currentlyHere && (
                        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-2xl font-semibold shadow-md">
                          {t("locationReminder.currentlyHere")}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mb-3 text-lg">{location.address}</p>
                    <p className="text-slate-500 text-sm">
                      {location.currentlyHere
                        ? `${t("locationReminder.lastUpdate")} ${location.lastUpdate}`
                        : `${t("locationReminder.lastVisit")} ${location.lastVisit}`}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {location.reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`flex items-center gap-5 p-5 rounded-2xl transition-all duration-200 ${
                        reminder.active
                          ? "bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100"
                          : "bg-slate-100 border-2 border-slate-200"
                      }`}
                    >
                      {getReminderIcon(reminder.type)}
                      <div className="flex-1">
                        <p
                          className={`font-semibold text-lg mb-1 ${reminder.active ? "text-slate-900" : "text-slate-500"}`}
                        >
                          {reminder.text}
                        </p>
                        <p className="text-slate-500">{reminder.time}</p>
                      </div>
                      <button
                        onClick={() => toggleReminder(location.id, reminder.id)}
                        className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                          reminder.active
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:from-blue-600 hover:to-indigo-700"
                            : "bg-slate-300 text-slate-600 hover:bg-slate-400"
                        }`}
                      >
                        {reminder.active ? t("locationReminder.active") : t("locationReminder.inactive")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a1 1 0 001 1h3v-8h6v8h3a1 1 0 001-1V7l-7-5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{t("locationReminder.recentAlerts")}</h2>
          </div>
          <div className="space-y-5">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-6 bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  {getReminderIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-lg mb-2">{alert.message}</p>
                    <p className="text-slate-600 mb-1">{alert.location}</p>
                    <p className="text-slate-500 text-sm">{alert.time}</p>
                  </div>
                  <span
                    className={`px-4 py-2 text-sm rounded-2xl font-semibold shadow-md ${
                      alert.status === "completed"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                    }`}
                  >
                    {alert.status === "completed" ? t("locationReminder.completed") : t("locationReminder.missed")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
