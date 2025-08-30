"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, UserCheck, Star, MapPinIcon, UserX, ChevronRight, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { hospitals, departments, hospitalDepartments, doctors } from "@/lib/medical-data"

export default function FindDoctorPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [findDoctorStep, setFindDoctorStep] = useState(1)
  const [selectedHospital, setSelectedHospital] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")

  const handleHospitalSelect = (hospitalId: string) => {
    setSelectedHospital(hospitalId)
    setFindDoctorStep(2)
  }

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId)
    setFindDoctorStep(3)
  }

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId)
  }

  const handleBackClick = () => {
    if (findDoctorStep === 1) {
      router.push("/")
    } else {
      setFindDoctorStep(findDoctorStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackClick}
              className="text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-xl font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("findDoctor.backButton")}
            </button>
            <h1 className="text-2xl font-bold text-slate-900">{t("findDoctor.title")}</h1>
            <div className="w-8"></div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= findDoctorStep ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step < findDoctorStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${step < findDoctorStep ? "bg-blue-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {findDoctorStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("findDoctor.selectHospital")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("findDoctor.selectHospitalDesc")}</p>

            <div className="grid grid-cols-1 gap-6">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 rounded-3xl bg-white overflow-hidden"
                  onClick={() => handleHospitalSelect(hospital.id)}
                >
                  {/* Hospital Image - Large and prominent at the top */}
                  <div className="relative h-48 w-full">
                    {hospital.image ? (
                      <img
                        src={hospital.image || "/placeholder.svg"}
                        alt={hospital.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${hospital.color} flex items-center justify-center`}
                      >
                        <hospital.icon className="w-16 h-16 text-white" />
                      </div>
                    )}
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Hospital Information - Below the image */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{hospital.name}</h3>
                    <p className="text-slate-600 text-base mb-3 leading-relaxed">{hospital.description}</p>

                    {/* Location with larger, more visible styling */}
                    <div className="flex items-center gap-2 text-slate-500 mb-4">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPinIcon className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{hospital.location}</span>
                    </div>

                    {/* Status indicators for better UX */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            hospital.hours === "24 ชั่วโมง" ? "bg-green-500" : "bg-blue-500"
                          }`}
                        ></div>
                        <span
                          className={`text-sm font-medium ${
                            hospital.hours === "24 ชั่วโมง" ? "text-green-600" : "text-blue-600"
                          }`}
                        >
                          {hospital.hours === "24 ชั่วโมง" ? "เปิด 24 ชั่วโมง" : "เปิดบริการ"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {findDoctorStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{t("findDoctor.selectDepartment")}</h2>
              <p className="text-slate-600">{t("findDoctor.selectDepartmentDesc")}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {departments
                .filter((dept) => hospitalDepartments[selectedHospital]?.includes(dept.id))
                .map((department) => (
                  <button
                    key={department.id}
                    onClick={() => handleDepartmentSelect(department.id)}
                    className="p-6 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-r ${department.color} text-white group-hover:scale-110 transition-transform duration-200`}
                      >
                        <department.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-800 mb-1">{department.name}</h3>
                        <p className="text-slate-600">{department.description}</p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </button>
                ))}
            </div>

            {hospitalDepartments[selectedHospital]?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">{t("findDoctor.noDepartments")}</p>
              </div>
            )}
          </div>
        )}

        {findDoctorStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">{t("findDoctor.selectDoctor")}</h2>
            <p className="text-slate-600 text-center mb-8">{t("findDoctor.selectDoctorDesc")}</p>

            <div className="grid grid-cols-1 gap-6">
              {doctors
                .filter((doctor) => doctor.hospital === selectedHospital && doctor.department === selectedDepartment)
                .map((doctor) => (
                  <div
                    key={doctor.id}
                    className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 rounded-2xl bg-white"
                    onClick={() => handleDoctorSelect(doctor.id)}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium text-sm mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span>
                            {t("findDoctor.experience")} {doctor.experience}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{doctor.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">{doctor.schedule}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {doctors.filter(
              (doctor) => doctor.hospital === selectedHospital && doctor.department === selectedDepartment,
            ).length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserX className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-600 mb-2">{t("findDoctor.noDoctors")}</h3>
                <p className="text-slate-500 mb-6">{t("findDoctor.noDoctorsDesc")}</p>
                <button
                  onClick={() => setFindDoctorStep(2)}
                  className="text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg"
                >
                  {t("findDoctor.selectNewDepartment")}
                </button>
              </div>
            )}

            {selectedDoctor && (
              <div className="mt-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <UserCheck className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">{t("findDoctor.doctorInfo")}</h3>
                    {(() => {
                      const doctor = doctors.find((d) => d.id === selectedDoctor)
                      const hospital = hospitals.find((h) => h.id === selectedHospital)
                      return (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <span className="text-slate-600 font-medium">{t("findDoctor.name")}:</span>
                            <span className="text-slate-900 font-bold">{doctor?.name}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <span className="text-slate-600 font-medium">{t("findDoctor.specialty")}:</span>
                            <span className="text-slate-900 font-bold">{doctor?.specialty}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <span className="text-slate-600 font-medium">{t("findDoctor.hospital")}:</span>
                            <span className="text-slate-900 font-bold">{hospital?.name}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <span className="text-slate-600 font-medium">{t("findDoctor.phone")}:</span>
                            <span className="text-slate-900 font-bold">{doctor?.phone}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-xl">
                            <span className="text-slate-600 font-medium">{t("findDoctor.schedule")}:</span>
                            <span className="text-slate-900 font-bold text-sm">{doctor?.schedule}</span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <button
                    onClick={() => {
                      const doctor = doctors.find((d) => d.id === selectedDoctor)
                      alert(t("findDoctor.callingDoctor", { name: doctor?.name, phone: doctor?.phone }))
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-6 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Phone className="w-6 h-6 mr-3 inline" />
                    {t("findDoctor.callDoctor")}
                  </button>

                  <Link href="/appointment">
                    <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 bg-transparent">
                      <Calendar className="w-5 h-5 mr-2 inline" />
                      {t("findDoctor.bookAppointment")}
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
