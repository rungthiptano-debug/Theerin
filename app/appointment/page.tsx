"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Calendar, Clock, MapPinIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { hospitals, departments, availableDates, timeSlots } from "@/lib/medical-data"

export default function AppointmentPage() {
  const { t } = useLanguage()
  const [appointmentStep, setAppointmentStep] = useState(1)
  const [selectedHospital, setSelectedHospital] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setAppointmentStep(4)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setAppointmentStep(5)
  }

  const handleConfirmAppointment = () => {
    const hospital = hospitals.find((h) => h.id === selectedHospital)
    const department = departments.find((d) => d.id === selectedDepartment)
    const dateDisplay = availableDates.find((d) => d.date === selectedDate)?.display

    alert(
      t("appointment.bookingSuccess", {
        hospital: hospital?.name,
        department: department?.name,
        date: dateDisplay,
        time: selectedTime,
      }),
    )

    // Reset form
    setAppointmentStep(1)
    setSelectedHospital("")
    setSelectedDepartment("")
    setSelectedDate("")
    setSelectedTime("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => (appointmentStep === 1 ? window.history.back() : setAppointmentStep(appointmentStep - 1))}
              className="text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-xl font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
              {t("appointment.backButton")}
            </button>
            <h1 className="text-2xl font-bold text-slate-900">{t("appointment.title")}</h1>
            <div className="w-8"></div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step <= appointmentStep ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step < appointmentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-8 h-1 mx-1 ${step < appointmentStep ? "bg-blue-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {appointmentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("appointment.selectHospital")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("appointment.selectHospitalDesc")}</p>

            <div className="grid grid-cols-1 gap-4">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 rounded-2xl bg-white"
                  onClick={() => {
                    setSelectedHospital(hospital.id)
                    setAppointmentStep(2)
                  }}
                >
                  <div className="flex items-center gap-4">
                    {hospital.image ? (
                      <img
                        src={hospital.image || "/placeholder.svg"}
                        alt={hospital.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${hospital.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <hospital.icon className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{hospital.name}</h3>
                      <p className="text-slate-600 text-sm mb-1">{hospital.description}</p>
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <MapPinIcon className="w-3 h-3" />
                        {hospital.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {appointmentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("appointment.selectDepartment")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("appointment.selectDepartmentDesc")}</p>

            <div className="grid grid-cols-1 gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 rounded-2xl bg-white"
                  onClick={() => {
                    setSelectedDepartment(dept.id)
                    setAppointmentStep(3)
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${dept.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <dept.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{dept.name}</h3>
                      <p className="text-slate-600 text-sm">{dept.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {appointmentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("appointment.selectDate")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("appointment.selectDateDesc")}</p>

            <div className="grid grid-cols-1 gap-4">
              {availableDates.map((dateOption) => (
                <div
                  key={dateOption.date}
                  className={`p-6 cursor-pointer transition-all duration-300 rounded-2xl ${
                    dateOption.available
                      ? "hover:shadow-xl border-2 border-transparent hover:border-blue-200 bg-white"
                      : "bg-slate-100 cursor-not-allowed opacity-50"
                  }`}
                  onClick={() => dateOption.available && handleDateSelect(dateOption.date)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          dateOption.available ? "bg-blue-100" : "bg-slate-200"
                        }`}
                      >
                        <Calendar className={`w-6 h-6 ${dateOption.available ? "text-blue-600" : "text-slate-400"}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{dateOption.display}</h3>
                        <p className={`text-sm ${dateOption.available ? "text-green-600" : "text-red-500"}`}>
                          {dateOption.available ? t("appointment.available") : t("appointment.full")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {appointmentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("appointment.selectTime")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("appointment.selectTimeDesc")}</p>

            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((slot) => (
                <div
                  key={slot.time}
                  className={`p-6 cursor-pointer transition-all duration-300 rounded-2xl text-center ${
                    slot.available
                      ? "hover:shadow-xl border-2 border-transparent hover:border-blue-200 bg-white"
                      : "bg-slate-100 cursor-not-allowed opacity-50"
                  }`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                      slot.available ? "bg-blue-100" : "bg-slate-200"
                    }`}
                  >
                    <Clock className={`w-6 h-6 ${slot.available ? "text-blue-600" : "text-slate-400"}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{slot.time} น.</h3>
                  <p className={`text-sm ${slot.available ? "text-green-600" : "text-red-500"}`}>
                    {slot.available ? t("appointment.timeAvailable") : t("appointment.timeFull")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {appointmentStep === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("appointment.confirmBooking")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("appointment.confirmBookingDesc")}</p>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 mb-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{t("appointment.bookingSummary")}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="text-slate-600 font-medium">{t("appointment.hospital")}:</span>
                  <span className="text-slate-900 font-bold">
                    {hospitals.find((h) => h.id === selectedHospital)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="text-slate-600 font-medium">{t("appointment.department")}:</span>
                  <span className="text-slate-900 font-bold">
                    {departments.find((d) => d.id === selectedDepartment)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="text-slate-600 font-medium">{t("appointment.date")}:</span>
                  <span className="text-slate-900 font-bold">
                    {availableDates.find((d) => d.date === selectedDate)?.display}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                  <span className="text-slate-600 font-medium">{t("appointment.time")}:</span>
                  <span className="text-slate-900 font-bold">{selectedTime} น.</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleConfirmAppointment}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CheckCircle className="w-6 h-6 mr-3 inline" />
                {t("appointment.confirmButton")}
              </button>

              <button
                onClick={() => setAppointmentStep(4)}
                className="w-full border-2 border-slate-300 text-slate-700 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50"
              >
                {t("appointment.editTime")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
