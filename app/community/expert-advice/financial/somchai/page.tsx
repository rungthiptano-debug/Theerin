"use client"
import Link from "next/link"
import { useState } from "react"

export default function SomchaiProfilePage() {
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleBooking = () => {
    if (selectedDay && selectedTime) {
      setShowConfirmation(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/community/expert-advice/financial">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <span className="text-xl">←</span>
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Profile of Khun Somchai Jaidee</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        {/* Profile Header */}
        <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg mb-6">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200">
              <img src="/advisor-somchai.png" alt="คุณสมชาย ใจดี" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">คุณสมชาย ใจดี (Khun Somchai Jaidee)</h2>
              <p className="text-lg text-blue-600 font-medium mb-2">Certified Financial Planner</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <span className="text-yellow-500">⭐</span>
                  <span>4.9 คะแนน</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <span className="text-blue-500">🏆</span>
                  <span>15 ปีประสบการณ์</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">About Khun Somchai</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            With over 15 years of experience serving the Chiang Mai community, Khun Somchai is dedicated to making
            financial planning simple and understandable. He believes in building long-term relationships with his
            clients based on trust and transparency. He lives in Don Kaeo with his family and enjoys volunteering at the
            local community center.
          </p>
        </div>

        {/* Areas of Expertise */}
        <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Areas of Expertise</h3>
          <div className="space-y-3">
            {[
              "Retirement Planning",
              "Health & Life Insurance Policies",
              "Investment Strategy",
              "Savings Plans",
              "Estate Planning",
            ].map((expertise, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-slate-700">{expertise}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Credentials</h3>
          <div className="space-y-2">
            <p className="text-slate-700">• Certified Financial Planner (CFP®)</p>
            <p className="text-slate-700">• Member of the Thai Financial Planners Association</p>
            <p className="text-slate-700">• License No: 1234567890</p>
          </div>
        </div>

        <div className="p-6 bg-white shadow-lg border border-slate-200 rounded-lg mb-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Book a Free Introductory Call</h3>
          <p className="text-slate-700 mb-6">
            Your first 15-minute consultation with Khun Somchai is completely free and without obligation. It's a chance
            for you to ask initial questions and see if he is the right fit for you.
          </p>

          {/* Day Selection */}
          <div className="mb-4">
            <p className="text-lg font-medium text-slate-900 mb-3">Select a preferred day for us to call you:</p>
            <div className="flex gap-3">
              {["Today", "Tomorrow", "Next Week"].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    selectedDay === day
                      ? "bg-blue-600 text-white"
                      : "bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-6">
            <p className="text-lg font-medium text-slate-900 mb-3">Select a preferred time:</p>
            <div className="flex gap-3">
              {[
                { label: "Morning (9am-12pm)", value: "morning" },
                { label: "Afternoon (1pm-4pm)", value: "afternoon" },
              ].map((time) => (
                <button
                  key={time.value}
                  onClick={() => setSelectedTime(time.value)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
                    selectedTime === time.value
                      ? "bg-blue-600 text-white"
                      : "bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!selectedDay || !selectedTime}
            className={`w-full text-lg py-3 rounded-lg font-medium transition-colors ${
              selectedDay && selectedTime
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Request My Free Call
          </button>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="p-6 bg-white max-w-sm w-full rounded-lg shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Request Sent!</h3>
              <p className="text-slate-700 mb-6">
                Thank you. Khun Somchai's office will call you at your registered phone number within one business day
                to confirm your appointment time.
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
