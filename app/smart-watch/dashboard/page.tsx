"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"

export default function HealthDashboard() {
  const { t } = useLanguage()
  const [animatedValues, setAnimatedValues] = useState({
    heartRate: 0,
    steps: 0,
    calories: 0,
    sleep: 0,
    bloodPressure: { systolic: 0, diastolic: 0 },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null)

  const targetValues = {
    heartRate: 72,
    steps: 8432,
    calories: 2150,
    sleep: 7.5,
    bloodPressure: { systolic: 120, diastolic: 80 },
  }

  const loadHealthDataFromStorage = () => {
    try {
      const savedData = localStorage.getItem("theerin_health_data")
      if (savedData) {
        const data = JSON.parse(savedData)
        setLastSyncTime(data.lastSync || null)
        return data.metrics || targetValues
      }
      return targetValues
    } catch (error) {
      console.error("Error loading health data from storage:", error)
      return targetValues
    }
  }

  const saveHealthDataToStorage = (data: any) => {
    try {
      const healthData = {
        metrics: data,
        lastSync: new Date().toISOString(),
      }
      localStorage.setItem("theerin_health_data", JSON.stringify(healthData))
      setLastSyncTime(healthData.lastSync)
    } catch (error) {
      console.error("Error saving health data to storage:", error)
    }
  }

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true)

      const watchConnection = localStorage.getItem("theerin_watch_connection")
      const isWatchConnected = watchConnection && JSON.parse(watchConnection).isConnected

      let healthValues = targetValues

      if (isWatchConnected) {
        healthValues = loadHealthDataFromStorage()
        saveHealthDataToStorage(healthValues)
      }

      const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const current = start + (end - start) * easeOutQuart
          callback(Math.round(current))

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        animate()
      }

      setTimeout(
        () =>
          animateValue(0, healthValues.heartRate, 2000, (val) =>
            setAnimatedValues((prev) => ({ ...prev, heartRate: val })),
          ),
        200,
      )

      setTimeout(
        () =>
          animateValue(0, healthValues.steps, 2500, (val) => setAnimatedValues((prev) => ({ ...prev, steps: val }))),
        400,
      )

      setTimeout(
        () =>
          animateValue(0, healthValues.calories, 2200, (val) =>
            setAnimatedValues((prev) => ({ ...prev, calories: val })),
          ),
        600,
      )

      setTimeout(
        () =>
          animateValue(0, healthValues.sleep * 10, 2000, (val) =>
            setAnimatedValues((prev) => ({ ...prev, sleep: val / 10 })),
          ),
        800,
      )

      setTimeout(() => {
        animateValue(0, targetValues.bloodPressure.systolic, 2000, (val) =>
          setAnimatedValues((prev) => ({ ...prev, bloodPressure: { ...prev.bloodPressure, systolic: val } })),
        )
        animateValue(0, targetValues.bloodPressure.diastolic, 2000, (val) =>
          setAnimatedValues((prev) => ({ ...prev, bloodPressure: { ...prev.bloodPressure, diastolic: val } })),
        )
      }, 1000)

      setIsLoading(false)
    }

    initializeData()
  }, [])

  const CircularProgress = ({ percentage, size = 120, strokeWidth = 12, color = "blue" }: any) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const colorConfig = {
      blue: {
        gradient: "url(#blueGradient)",
        shadow: "drop-shadow-lg filter drop-shadow-blue-500/30",
        glow: "shadow-blue-500/20",
      },
      amber: {
        gradient: "url(#amberGradient)",
        shadow: "drop-shadow-lg filter drop-shadow-amber-500/30",
        glow: "shadow-amber-500/20",
      },
      green: {
        gradient: "url(#greenGradient)",
        shadow: "drop-shadow-lg filter drop-shadow-green-500/30",
        glow: "shadow-green-500/20",
      },
      red: {
        gradient: "url(#redGradient)",
        shadow: "drop-shadow-lg filter drop-shadow-red-500/30",
        glow: "shadow-red-500/20",
      },
    }

    return (
      <div className={`relative ${colorConfig[color].glow}`}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-30"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorConfig[color].gradient}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-2000 ease-out ${colorConfig[color].shadow}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">{Math.round(percentage)}%</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:scale-105"
          >
            <span className="text-xl">←</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Health Dashboard</h1>
            <p className="text-blue-100 font-medium">Your daily health insights</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {lastSyncTime && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-green-700 font-medium">
              Health data synced • Last update: {new Date(lastSyncTime).toLocaleTimeString()}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Heart Rate */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-full relative">
                  <div className="absolute inset-1 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedValues.heartRate}</div>
                <div className="text-sm font-medium text-gray-500">BPM</div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress percentage={(animatedValues.heartRate / 100) * 100} color="red" size={100} />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">Heart Rate</div>
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">
                Normal Range
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-6 bg-amber-500 rounded-sm relative">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedValues.steps.toLocaleString()}</div>
                <div className="text-sm font-medium text-gray-500">Steps</div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress percentage={(animatedValues.steps / 10000) * 100} color="amber" size={100} />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">Daily Steps</div>
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">
                84% of Goal
              </div>
            </div>
          </div>

          {/* Sleep */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-6 bg-white rounded-full relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-1 left-2 right-2 h-1 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-800">{animatedValues.sleep.toFixed(1)}h</div>
                <div className="text-sm font-medium text-gray-500">Sleep</div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress percentage={(animatedValues.sleep / 8) * 100} color="blue" size={100} />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">Last Night</div>
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">
                Good Quality
              </div>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-4 border-2 border-green-500 rounded-sm relative">
                    <div className="absolute inset-1 bg-green-500 rounded-sm opacity-30"></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {animatedValues.bloodPressure.systolic}/{animatedValues.bloodPressure.diastolic}
                </div>
                <div className="text-sm font-medium text-gray-500">mmHg</div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CircularProgress percentage={85} color="green" size={100} />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-700">Blood Pressure</div>
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">Optimal</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Weekly Trends</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-6">Heart Rate</h4>
              <div className="h-40 bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-6 flex items-end justify-between shadow-inner">
                {[65, 68, 72, 70, 74, 69, 72].map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-gradient-to-t from-red-500 via-red-400 to-pink-400 rounded-t-xl shadow-lg transition-all duration-1000 ease-out hover:scale-110"
                      style={{
                        height: `${(value / 80) * 100}px`,
                        width: "24px",
                        animationDelay: `${index * 200}ms`,
                      }}
                    ></div>
                    <div className="text-xs font-medium text-gray-600 mt-3">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-6">Daily Steps</h4>
              <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 flex items-end justify-between shadow-inner">
                {[7200, 8500, 9200, 8800, 10200, 7800, 8432].map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-400 rounded-t-xl shadow-lg transition-all duration-1000 ease-out hover:scale-110"
                      style={{
                        height: `${(value / 12000) * 100}px`,
                        width: "24px",
                        animationDelay: `${index * 200}ms`,
                      }}
                    ></div>
                    <div className="text-xs font-medium text-gray-600 mt-3">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Health Insights</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-bold text-green-800 text-lg">Great Sleep Quality</h4>
                <p className="text-green-700 font-medium">
                  You had {animatedValues.sleep.toFixed(1)} hours of quality sleep last night. Keep up the good routine!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white text-lg font-bold">!</span>
              </div>
              <div>
                <h4 className="font-bold text-amber-800 text-lg">Almost There!</h4>
                <p className="text-amber-700 font-medium">
                  You're {(10000 - animatedValues.steps).toLocaleString()} steps away from your daily goal. A short walk
                  will get you there!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
