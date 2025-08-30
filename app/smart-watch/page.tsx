"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

export default function SmartWatchPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [discoveredDevices, setDiscoveredDevices] = useState<any[]>([])
  const [selectedDevice, setSelectedDevice] = useState<any>(null)
  const [connectionStep, setConnectionStep] = useState(0)
  const [pulseAnimation, setPulseAnimation] = useState(false)
  const [fadeInCards, setFadeInCards] = useState(false)
  const [connectedDeviceData, setConnectedDeviceData] = useState<any>(null)
  const [showFirstConfirmation, setShowFirstConfirmation] = useState(false)
  const [showSecondConfirmation, setShowSecondConfirmation] = useState(false)

  const simulateDataPersistence = () => {
    // Simulate loading existing connection from localStorage
    const existingConnection = localStorage.getItem("watchConnection")
    if (existingConnection) {
      const connectionData = JSON.parse(existingConnection)
      setIsConnected(true)
      setConnectedDeviceData(connectionData)
    }
  }

  const saveWatchConnection = (device: any) => {
    const connectionData = {
      device_name: device.name,
      device_type: device.type,
      battery_level: device.battery,
      connection_status: "connected",
      last_sync: new Date().toISOString(),
    }
    localStorage.setItem("watchConnection", JSON.stringify(connectionData))
    return connectionData
  }

  useEffect(() => {
    simulateDataPersistence()
  }, [])

  const handleViewDashboard = () => {
    router.push("/smart-watch/dashboard")
  }

  const handleWatchSettings = () => {
    router.push("/smart-watch/settings")
  }

  useEffect(() => {
    if (isConnecting && connectionStep === 0) {
      const timer = setTimeout(() => {
        setDiscoveredDevices([
          { id: 1, name: "Apple Watch Series 9", battery: 85, type: "apple" },
          { id: 2, name: "Samsung Galaxy Watch", battery: 72, type: "samsung" },
          { id: 3, name: "Fitbit Sense 2", battery: 91, type: "fitbit" },
        ])
        setConnectionStep(1)
        setTimeout(() => setFadeInCards(true), 100)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isConnecting, connectionStep])

  useEffect(() => {
    if (connectionStep === 2 || connectionStep === 3) {
      setPulseAnimation(true)
      const timer = setTimeout(() => setPulseAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [connectionStep])

  const handleConnect = async (device: any) => {
    setSelectedDevice(device)
    setConnectionStep(2)

    setTimeout(async () => {
      setConnectionStep(3)
      const savedConnection = saveWatchConnection(device)
      setConnectedDeviceData(savedConnection)

      setTimeout(() => {
        setIsConnected(true)
        setIsConnecting(false)
        setConnectionStep(0)
      }, 1500)
    }, 2000)
  }

  const startDiscovery = () => {
    setIsConnecting(true)
    setConnectionStep(0)
    setDiscoveredDevices([])
    setFadeInCards(false)
  }

  const handleDisconnectWatch = () => {
    setShowFirstConfirmation(true)
  }

  const handleFirstConfirmation = () => {
    setShowFirstConfirmation(false)
    setShowSecondConfirmation(true)
  }

  const handleFinalDisconnect = () => {
    // Remove from localStorage
    localStorage.removeItem("watchConnection")

    // Reset all states
    setIsConnected(false)
    setConnectedDeviceData(null)
    setShowSecondConfirmation(false)
    setSelectedDevice(null)
    setDiscoveredDevices([])
    setConnectionStep(0)
  }

  const handleCancelDisconnect = () => {
    setShowFirstConfirmation(false)
    setShowSecondConfirmation(false)
  }

  const getDeviceIcon = (type: string) => {
    if (type === "apple") {
      return <img src="/apple-watch-series-9.png" alt="Apple Watch Series 9" className="w-full h-full object-contain" />
    } else if (type === "samsung") {
      return (
        <img src="/samsung-galaxy-watch.avif" alt="Samsung Galaxy Watch" className="w-full h-full object-contain" />
      )
    } else if (type === "fitbit") {
      return <img src="/fitbit-sense2.webp" alt="Fitbit Sense 2" className="w-full h-full object-contain" />
    }

    return (
      <div className="relative w-8 h-8">
        <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg shadow-inner">
          <div className="absolute inset-1 bg-gradient-to-br from-slate-800 to-black rounded-md">
            <div className="absolute inset-0.5 bg-gradient-to-br from-blue-900 to-slate-900 rounded-sm">
              <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-40"></div>
            </div>
          </div>
          <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-slate-600 rounded-sm"></div>
        </div>
      </div>
    )
  }

  const Watch3D = ({ size = "w-24 h-24", isAnimating = false }) => (
    <div className={`${size} relative mx-auto`}>
      <div
        className={`w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-2xl shadow-2xl transform transition-all duration-700 ${isAnimating ? "rotate-12 scale-110" : "hover:rotate-6 hover:scale-105"}`}
      >
        <div className="absolute inset-2 bg-gradient-to-br from-slate-900 to-black rounded-xl overflow-hidden">
          <div className="absolute inset-1 bg-gradient-to-br from-blue-900 via-slate-900 to-black rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-400 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-blue-400 transform -translate-x-1/2 -translate-y-1/2 origin-left rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 origin-left rotate-90"></div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-lg"></div>
          </div>
        </div>
        <div className="absolute -right-1 top-1/4 w-2 h-4 bg-gradient-to-r from-slate-600 to-slate-800 rounded-r-lg shadow-lg"></div>
        <div className="absolute -right-0.5 top-1/2 w-1 h-2 bg-gradient-to-r from-slate-600 to-slate-800 rounded-r shadow-md"></div>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-slate-700 rounded-t-lg"></div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-slate-700 rounded-b-lg"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 sm:p-6 shadow-xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl active:scale-95"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 border-l-2 border-b-2 border-white transform rotate-45 -translate-x-0.5"></div>
          </button>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Theerin Watch</h1>
            <p className="text-blue-100 text-sm sm:text-lg">Professional Health Monitoring</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto">
        {!isConnected ? (
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-6">
                  <Watch3D size="w-40 h-40 sm:w-48 sm:h-48" isAnimating={pulseAnimation} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">{t("smartWatch.connectTitle")}</h2>
                <p className="text-slate-600 mb-8 text-base sm:text-lg px-4">{t("smartWatch.connectDesc")}</p>

                {!isConnecting ? (
                  <button
                    onClick={startDiscovery}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-8 sm:px-10 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl active:scale-95 text-lg"
                  >
                    {t("smartWatch.startPairing")}
                  </button>
                ) : (
                  <div className="space-y-6">
                    {connectionStep === 0 && (
                      <div className="text-center">
                        <div className="inline-block relative mb-4">
                          <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                          <div className="absolute inset-0 animate-ping w-12 h-12 border-2 border-blue-300 rounded-full opacity-20"></div>
                        </div>
                        <p className="text-slate-600 animate-pulse text-lg">{t("smartWatch.scanning")}</p>
                      </div>
                    )}

                    {connectionStep === 2 && selectedDevice && (
                      <div className="text-center">
                        <div className="mb-4">
                          <Watch3D size="w-24 h-24" isAnimating={true} />
                        </div>
                        <p className="text-slate-600 animate-pulse text-lg">{t("smartWatch.connecting")}</p>
                      </div>
                    )}

                    {connectionStep === 3 && (
                      <div className="text-center">
                        <div className="inline-block relative mb-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center animate-bounce shadow-xl">
                            <div className="w-8 h-8 border-l-4 border-b-4 border-white transform rotate-45 -translate-x-1 -translate-y-1"></div>
                          </div>
                          <div className="absolute inset-0 animate-ping w-20 h-20 bg-emerald-300 rounded-full opacity-40"></div>
                        </div>
                        <p className="text-emerald-600 font-semibold animate-pulse text-lg">
                          {t("smartWatch.connected")}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {discoveredDevices.length > 0 && connectionStep === 1 && (
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 text-center">
                  {t("smartWatch.availableDevices")}
                </h3>
                <div className="space-y-4">
                  {discoveredDevices.map((device, index) => (
                    <div
                      key={device.id}
                      onClick={() => handleConnect(device)}
                      className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl cursor-pointer hover:from-sky-100 hover:to-blue-100 transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:shadow-lg transform hover:-translate-y-1 ${
                        fadeInCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      <div className="w-20 h-20 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 p-2">
                        {getDeviceIcon(device.type)}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-bold text-slate-800 text-lg">{device.name}</h4>
                        <p className="text-slate-600">
                          {t("smartWatch.battery")}: {device.battery}%
                        </p>
                      </div>
                      <button className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:scale-95">
                        {t("smartWatch.connect")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <p className="text-green-700 font-medium text-sm sm:text-base">{t("smartWatch.connectionSaved")}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-200 hover:shadow-2xl transition-all duration-500">
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-xl p-4">
                    <img
                      src="/apple-watch-series-9.png"
                      alt="Apple Watch Series 9"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                  {connectedDeviceData?.device_name || "Apple Watch Series 9"}
                </h3>
                <p className="text-emerald-600 font-semibold text-lg mb-4">
                  {t("common.connected")} • {t("smartWatch.battery")} {connectedDeviceData?.battery_level || 85}%
                </p>

                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                  </div>
                  <button
                    onClick={handleDisconnectWatch}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl active:scale-95 text-sm sm:text-base"
                  >
                    {t("smartWatch.disconnect")}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 sm:p-8 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full relative">
                    <div className="absolute inset-1 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">72 BPM</div>
                <div className="text-red-100 text-base sm:text-lg">{t("smartWatch.heartRate")}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 border-2 border-white rounded-lg relative">
                    <div className="absolute bottom-0 left-0 w-2 h-4 bg-white rounded-sm"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">8,432</div>
                <div className="text-amber-100 text-base sm:text-lg">{t("smartWatch.stepsToday")}</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <div className="w-8 h-4 bg-white rounded-full relative">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">7.5h</div>
                <div className="text-indigo-100 text-base sm:text-lg">{t("smartWatch.sleepQuality")}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={handleViewDashboard}
                className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-4 sm:p-6 rounded-2xl font-bold text-base sm:text-lg hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl active:scale-95"
              >
                {t("smartWatch.viewDashboard")}
              </button>
              <button
                onClick={handleWatchSettings}
                className="bg-white border-2 border-blue-600 text-blue-600 p-4 sm:p-6 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl active:scale-95"
              >
                {t("smartWatch.watchSettings")}
              </button>
            </div>
          </div>
        )}
      </div>

      {showFirstConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-red-600 font-bold text-2xl">!</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
                {t("smartWatch.disconnectConfirm.title")}
              </h3>
              <p className="text-slate-600 mb-8 text-base sm:text-lg">
                {t("smartWatch.disconnectConfirm.message", {
                  deviceName: connectedDeviceData?.device_name || "Apple Watch Series 9",
                })}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCancelDisconnect}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  {t("smartWatch.disconnectConfirm.cancel")}
                </button>
                <button
                  onClick={handleFirstConfirmation}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  {t("smartWatch.disconnectConfirm.continue")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSecondConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform animate-scale-in border-2 border-red-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-10 h-10 text-white font-bold text-3xl">⚠</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">{t("smartWatch.finalConfirm.title")}</h3>
              <p className="text-slate-700 mb-2 text-base sm:text-lg font-semibold">
                {t("smartWatch.finalConfirm.warning")}
              </p>
              <p className="text-slate-600 mb-8 text-sm sm:text-base">{t("smartWatch.finalConfirm.message")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCancelDisconnect}
                  className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 text-base sm:text-lg"
                >
                  {t("smartWatch.finalConfirm.keepConnected")}
                </button>
                <button
                  onClick={handleFinalDisconnect}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 text-base sm:text-lg"
                >
                  {t("smartWatch.finalConfirm.disconnectNow")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
