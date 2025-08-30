"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

export default function WatchSettings() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState({
    heartRateMonitoring: true,
    sleepTracking: true,
    stepGoal: 10000,
    notifications: {
      calls: true,
      messages: true,
      health: true,
      reminders: true,
    },
    privacy: {
      shareData: false,
      anonymousData: true,
    },
    accessibility: {
      largeText: true,
      highContrast: false,
      voiceOver: false,
    },
    watchFace: "classic",
    batteryOptimization: true,
  })

  const updateSetting = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".")
      const newSettings = { ...prev }
      let current: any = newSettings

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert("Settings saved successfully!")
    console.log("[v0] Settings saved:", settings)
  }

  const handleResetToDefault = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      setSettings({
        heartRateMonitoring: true,
        sleepTracking: true,
        stepGoal: 10000,
        notifications: {
          calls: true,
          messages: true,
          health: true,
          reminders: true,
        },
        privacy: {
          shareData: false,
          anonymousData: true,
        },
        accessibility: {
          largeText: true,
          highContrast: false,
          voiceOver: false,
        },
        watchFace: "classic",
        batteryOptimization: true,
      })
      alert("Settings reset to default!")
    }
  }

  const ToggleSwitch = ({ enabled, onToggle, label, description }: any) => (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
      <div className="flex-1 pr-4">
        <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{label}</h4>
        {description && <p className="text-gray-600 text-xs sm:text-sm mt-1">{description}</p>}
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-7 sm:w-14 sm:h-8 rounded-full transition-colors flex-shrink-0 ${
          enabled ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-6 h-6 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-transform ${
            enabled ? "translate-x-5 sm:translate-x-7" : "translate-x-0.5 sm:translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  const watchFaces = [
    {
      id: "classic",
      name: "Classic",
      preview: (
        <div className="w-12 h-12 bg-black rounded-xl border-2 border-gray-300 relative overflow-hidden">
          <div className="absolute inset-1 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 border border-white/30 rounded-full relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-white transform -translate-x-0.5 origin-bottom rotate-0"></div>
              <div className="absolute top-1/2 left-1/2 w-1.5 h-0.5 bg-white transform -translate-x-0.5 -translate-y-0.5 origin-left rotate-90"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-0.5 -translate-y-0.5"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "digital",
      name: "Digital",
      preview: (
        <div className="w-12 h-12 bg-black rounded-xl border-2 border-gray-300 relative overflow-hidden">
          <div className="absolute inset-1 bg-gradient-to-br from-gray-900 to-black rounded-lg flex flex-col items-center justify-center">
            <div className="text-xs text-green-400 font-mono font-bold">10:09</div>
            <div className="text-[8px] text-gray-400 font-mono">MON 28</div>
          </div>
        </div>
      ),
    },
    {
      id: "health",
      name: "Health Focus",
      preview: (
        <div className="w-12 h-12 bg-black rounded-xl border-2 border-gray-300 relative overflow-hidden">
          <div className="absolute inset-1 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-4 h-3 relative">
                <div className="absolute inset-0 bg-white rounded-t-full"></div>
                <div className="absolute -top-0.5 left-1 w-1 h-1.5 bg-white rounded-t"></div>
                <div className="absolute -top-0.5 right-1 w-1 h-1.5 bg-white rounded-t"></div>
                <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-red-600 transform -translate-x-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: (
        <div className="w-12 h-12 bg-black rounded-xl border-2 border-gray-300 relative overflow-hidden">
          <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 border border-gray-300 rounded-full relative">
              <div className="absolute top-0.5 left-1/2 w-0.5 h-1 bg-gray-600 transform -translate-x-0.5"></div>
              <div className="absolute bottom-0.5 left-1/2 w-0.5 h-1 bg-gray-600 transform -translate-x-0.5"></div>
              <div className="absolute left-0.5 top-1/2 w-1 h-0.5 bg-gray-600 transform -translate-y-0.5"></div>
              <div className="absolute right-0.5 top-1/2 w-1 h-0.5 bg-gray-600 transform -translate-y-0.5"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 rounded-full transform -translate-x-0.5 -translate-y-0.5"></div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6 shadow-lg">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-sm sm:text-base"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Watch Settings</h1>
            <p className="text-blue-100 text-sm sm:text-base">Customize your smart watch</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Device Info */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Device Information</h3>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center">
              <img
                src="/apple-watch-series-9.png"
                alt="Apple Watch Series 9"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 truncate">Apple Watch Series 9</h4>
              <p className="text-gray-600 text-sm sm:text-base">Connected • Battery 85%</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2 w-full max-w-24 sm:max-w-32">
                <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium hover:from-amber-500 hover:to-amber-600 transition-all text-xs sm:text-base flex-shrink-0 whitespace-nowrap">
              Update
            </button>
          </div>
        </div>

        {/* Watch Face */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Watch Face</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {watchFaces.map((face) => (
              <button
                key={face.id}
                onClick={() => updateSetting("watchFace", face.id)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                  settings.watchFace === face.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex justify-center mb-2">{face.preview}</div>
                <div className="text-xs sm:text-sm font-medium text-gray-700">{face.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Health Monitoring */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Health Monitoring</h3>
          <div className="space-y-3 sm:space-y-4">
            <ToggleSwitch
              enabled={settings.heartRateMonitoring}
              onToggle={() => updateSetting("heartRateMonitoring", !settings.heartRateMonitoring)}
              label="Heart Rate Monitoring"
              description="Continuous heart rate tracking throughout the day"
            />
            <ToggleSwitch
              enabled={settings.sleepTracking}
              onToggle={() => updateSetting("sleepTracking", !settings.sleepTracking)}
              label="Sleep Tracking"
              description="Monitor sleep patterns and quality"
            />
            <ToggleSwitch
              enabled={settings.batteryOptimization}
              onToggle={() => updateSetting("batteryOptimization", !settings.batteryOptimization)}
              label="Battery Optimization"
              description="Optimize battery life for health monitoring"
            />

            {/* Step Goal */}
            <div className="p-3 sm:p-4 bg-white rounded-xl border border-blue-100">
              <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-3 sm:mb-4">Daily Step Goal</h4>
              <div className="flex items-center gap-3 sm:gap-4">
                <input
                  type="range"
                  min="5000"
                  max="20000"
                  step="500"
                  value={settings.stepGoal}
                  onChange={(e) => updateSetting("stepGoal", Number.parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold min-w-[80px] sm:min-w-[100px] text-center text-sm sm:text-base">
                  {settings.stepGoal.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Notifications</h3>
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.notifications.calls}
              onToggle={() => updateSetting("notifications.calls", !settings.notifications.calls)}
              label="Phone Calls"
              description="Receive call notifications on your watch"
            />
            <ToggleSwitch
              enabled={settings.notifications.messages}
              onToggle={() => updateSetting("notifications.messages", !settings.notifications.messages)}
              label="Messages"
              description="Get text message alerts"
            />
            <ToggleSwitch
              enabled={settings.notifications.health}
              onToggle={() => updateSetting("notifications.health", !settings.notifications.health)}
              label="Health Alerts"
              description="Important health notifications and reminders"
            />
            <ToggleSwitch
              enabled={settings.notifications.reminders}
              onToggle={() => updateSetting("notifications.reminders", !settings.notifications.reminders)}
              label="Medication Reminders"
              description="Daily medication and appointment reminders"
            />
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Accessibility</h3>
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.accessibility.largeText}
              onToggle={() => updateSetting("accessibility.largeText", !settings.accessibility.largeText)}
              label="Large Text"
              description="Increase text size for better readability"
            />
            <ToggleSwitch
              enabled={settings.accessibility.highContrast}
              onToggle={() => updateSetting("accessibility.highContrast", !settings.accessibility.highContrast)}
              label="High Contrast"
              description="Enhanced contrast for better visibility"
            />
            <ToggleSwitch
              enabled={settings.accessibility.voiceOver}
              onToggle={() => updateSetting("accessibility.voiceOver", !settings.accessibility.voiceOver)}
              label="Voice Over"
              description="Audio descriptions for screen content"
            />
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Privacy & Data</h3>
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.privacy.shareData}
              onToggle={() => updateSetting("privacy.shareData", !settings.privacy.shareData)}
              label="Share Health Data"
              description="Share data with healthcare providers"
            />
            <ToggleSwitch
              enabled={settings.privacy.anonymousData}
              onToggle={() => updateSetting("privacy.anonymousData", !settings.privacy.anonymousData)}
              label="Anonymous Analytics"
              description="Help improve the app with anonymous usage data"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 pb-6">
          <button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-base sm:text-lg"
          >
            Save Settings
          </button>
          <button
            onClick={handleResetToDefault}
            className="bg-white border-2 border-red-500 text-red-500 p-4 rounded-xl font-semibold hover:bg-red-50 transition-all text-base sm:text-lg"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  )
}
