"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function StartupAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState("fade-in")
  const pathname = usePathname()

  const shouldShowAnimation = pathname === "/"

  useEffect(() => {
    if (!shouldShowAnimation) {
      setIsVisible(false)
      return
    }

    // Show logo and fade in
    const timer1 = setTimeout(() => {
      setAnimationPhase("show-slogan")
    }, 1000)

    // Start fade out
    const timer2 = setTimeout(() => {
      setAnimationPhase("fade-out")
    }, 3000)

    // Hide completely
    const timer3 = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [shouldShowAnimation])

  if (!shouldShowAnimation || !isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 transition-opacity duration-1000 ${
        animationPhase === "fade-out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <div
          className={`mb-8 transition-all duration-1000 ${
            animationPhase === "fade-in" ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-3 bg-white rounded-full"></div>
              <div className="absolute w-3 h-12 bg-white rounded-full"></div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-work-sans">Theerin</h1>

          <p
            className={`text-lg text-gray-600 font-open-sans transition-all duration-1000 delay-500 ${
              animationPhase === "show-slogan" || animationPhase === "fade-out"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Wisdom at work, wellness in lives
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}
