"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import {
  ArrowLeft,
  Calendar,
  Stethoscope,
  MessageCircle,
  MapPin,
  CheckCircle,
  Clock,
  Briefcase,
  TrendingUp,
  AlertCircle,
  FileText,
  Activity,
  Mail,
  Download,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function HistoryPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [jobApplications, setJobApplications] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const historyCategories = [
    { id: "all", name: t("history.categories.all"), icon: FileText },
    { id: "jobs", name: t("history.categories.jobs"), icon: Briefcase },
    { id: "appointments", name: t("history.categories.appointments"), icon: Calendar },
    { id: "checkups", name: t("history.categories.checkups"), icon: Stethoscope },
    { id: "consultations", name: t("history.categories.consultations"), icon: MessageCircle },
    { id: "checkins", name: t("history.categories.checkins"), icon: CheckCircle },
    { id: "locations", name: t("history.categories.locations"), icon: MapPin },
  ]

  const staticHistoryData = [
    {
      id: 1,
      type: "appointments",
      title: "นัดหมายพบแพทย์",
      subtitle: "นพ.สมชาย ใจดี - แพทย์เวชศาสตร์ครอบครัว",
      date: "2024-01-15",
      time: "14:00",
      status: "completed",
      location: "โรงพยาบาลศรีนครินทร์",
      details: "ตรวจสุขภาพประจำปี ผลตรวจปกติทุกอย่าง",
    },
    {
      id: 2,
      type: "checkups",
      title: "ตรวจสุขภาพประจำปี",
      subtitle: "การตรวจสุขภาพทั่วไป",
      date: "2024-01-15",
      time: "14:30",
      status: "completed",
      location: "โรงพยาบาลศรีนครินทร์",
      details: "ความดันโลหิต 120/80, น้ำหนัก 65 กก., ส่วนสูง 165 ซม.",
    },
    {
      id: 3,
      type: "consultations",
      title: "ปรึกษาออนไลน์",
      subtitle: "คุณสุมาลี สุขภาพดี - นักโภชนาการ",
      date: "2024-01-10",
      time: "16:00",
      status: "completed",
      location: "ปรึกษาออนไลน์",
      details: "ปรึกษาเรื่องการกินสำหรับผู้สูงอายุ ได้แผนอาหาร 7 วัน",
    },
    {
      id: 4,
      type: "checkins",
      title: "เช็คอินรายวัน",
      subtitle: "บันทึกสุขภาพประจำวัน",
      date: "2024-01-20",
      time: "08:00",
      status: "completed",
      location: "บ้าน",
      details: "รู้สึกสบายดี นอนหลับดี ออกกำลังกายเดิน 30 นาที",
    },
    {
      id: 5,
      type: "locations",
      title: "ออกจากบ้าน",
      subtitle: "แจ้งเตือนการเดินทาง",
      date: "2024-01-20",
      time: "09:30",
      status: "completed",
      location: "บ้าน → ตลาดสด",
      details: "ออกไปซื้อของที่ตลาดสด กลับบ้าน 11:00 น.",
    },
    {
      id: 6,
      type: "appointments",
      title: "นัดหมายพบแพทย์",
      subtitle: "นพ.หญิง มาลี สุขใส - แพทย์โรคหัวใจ",
      date: "2024-01-25",
      time: "10:00",
      status: "upcoming",
      location: "โรงพยาบาลศรีพัฒน์",
      details: "ตรวจติดตามโรคหัวใจ นัดหมายถัดไป",
    },
  ]

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        await fetchJobApplications(user.id)
      }
      setIsLoading(false)
    }
    getUser()
  }, [])

  const fetchJobApplications = async (userId) => {
    try {
      const { data: applications, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (!error && applications) {
        const jobHistoryItems = applications.map((app) => ({
          id: `job_${app.id}`,
          type: "jobs",
          title: app.job_title,
          subtitle: app.company_name,
          date: app.created_at.split("T")[0],
          time: new Date(app.created_at).toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: app.status || "applied",
          location: "สมัครออนไลน์",
          details: `สมัครตำแหน่ง ${app.job_title} ที่ ${app.company_name}`,
          jobId: app.job_id,
          applicationId: app.id,
        }))
        setJobApplications(jobHistoryItems)
      }
    } catch (error) {
      console.error("Error fetching job applications:", error)
    }
  }

  const allHistoryData = [...staticHistoryData, ...jobApplications]
  const filteredHistory = allHistoryData.filter((item) => selectedCategory === "all" || item.type === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "accepted":
        return "bg-green-100 text-green-700"
      case "upcoming":
      case "applied":
        return "bg-blue-100 text-blue-700"
      case "under_review":
        return "bg-yellow-100 text-yellow-700"
      case "interview":
        return "bg-purple-100 text-purple-700"
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusText = (status: string) => {
    return t(`history.status.${status}`) || t("history.status.unknown")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "jobs":
        return <Briefcase className="w-5 h-5" />
      case "appointments":
        return <Calendar className="w-5 h-5" />
      case "checkups":
        return <Stethoscope className="w-5 h-5" />
      case "consultations":
        return <MessageCircle className="w-5 h-5" />
      case "checkins":
        return <CheckCircle className="w-5 h-5" />
      case "locations":
        return <MapPin className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getJobStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="w-4 h-4" />
      case "under_review":
        return <AlertCircle className="w-4 h-4" />
      case "interview":
        return <MessageCircle className="w-4 h-4" />
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-slate-600 font-medium">{t("history.loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-xl">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <button className="p-3 text-white hover:bg-white/20 rounded-xl transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("history.title")}</h1>
              <p className="text-blue-100 mt-1">{t("history.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6">
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-3">
            {historyCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-sm rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm border border-slate-200"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {(selectedCategory === "all" || selectedCategory === "jobs") && jobApplications.length > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{t("history.jobStats")}</h3>
                <p className="text-slate-600">{t("history.jobStatsDesc")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-1">{jobApplications.length}</div>
                <div className="text-sm text-slate-600 font-medium">{t("history.totalApplications")}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {jobApplications.filter((job) => job.status === "accepted").length}
                </div>
                <div className="text-sm text-slate-600 font-medium">{t("history.acceptedApplications")}</div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            {t("history.activityHistory")}
            <span className="text-sm font-normal text-slate-500">
              ({t("history.itemsCount", { count: filteredHistory.length })})
            </span>
          </h2>

          {filteredHistory.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                      <p className="text-slate-600">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{new Date(item.date).toLocaleDateString("th-TH")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{item.time} น.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{item.location}</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-slate-700 leading-relaxed">{item.details}</p>
                </div>

                {/* Job-specific status indicator */}
                {item.type === "jobs" && (
                  <div className="flex items-center gap-2 text-slate-600">
                    {getJobStatusIcon(item.status)}
                    <span className="font-medium">{t(`history.jobStatusMessages.${item.status}`) || ""}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {item.status === "upcoming" && (
                    <>
                      <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                        onClick={() => router.push(`/appointment/${item.id}`)}
                      >
                        {t("history.actions.viewDetails")}
                      </button>
                      <button className="flex-1 border-2 border-slate-300 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                        {t("history.actions.editAppointment")}
                      </button>
                    </>
                  )}
                  {item.type === "jobs" && (
                    <>
                      <button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                        onClick={() => router.push(`/jobs/${item.jobId}`)}
                      >
                        {t("history.actions.viewJobDetails")}
                      </button>
                      {item.status === "rejected" && (
                        <button className="flex-1 border-2 border-slate-300 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                          {t("history.actions.findSimilarJobs")}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 text-xl font-semibold mb-2">{t("history.noHistory")}</p>
              <p className="text-slate-500">{t("history.tryOtherCategory")}</p>
            </div>
          )}
        </div>

        {selectedCategory === "jobs" && (
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              {t("history.quickActions")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex flex-col items-center gap-3 py-6 border-2 border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
                onClick={() => router.push("/find-job")}
              >
                <Briefcase className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-slate-700">{t("history.findNewJob")}</span>
              </button>
              <button
                className="flex flex-col items-center gap-3 py-6 border-2 border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all"
                onClick={() => router.push("/job-chat")}
              >
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-slate-700">{t("history.aiJobRecommendation")}</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            {t("history.exportData")}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-3 py-6 border-2 border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all">
              <FileText className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-slate-700">{t("history.exportPDF")}</span>
            </button>
            <button className="flex flex-col items-center gap-3 py-6 border-2 border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all">
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-slate-700">{t("history.sendEmail")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
