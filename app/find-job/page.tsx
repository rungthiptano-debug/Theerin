"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

const jobListings = [
  {
    id: 1,
    title: "ที่ปรึกษาโครงการตลาดริมน้ำ",
    company: "เทศบาลนครเชียงใหม่",
    location: "ใจกลางเมือง เชียงใหม่ (1 กม.)",
    pay: "15,000 บาท/เดือน",
    schedule: "งานพาร์ทไทม์ ประชุม 2-3 ครั้ง/สัปดาห์",
    hook: "ช่วยเปลี่ยนชุมชนแออัดให้เป็นตลาดริมน้ำที่สวยงาม!",
    type: "Government",
    phone: "053-999-888",
    isImpact: true,
    category: "government",
    socialImpact: "โครงการนี้จะช่วยยกระดับคุณภาพชีวิตของชุมชน สร้างรายได้ให้ผู้ค้าท้องถิิน และอนุรักษ์วัฒนธรรมไทย",
    motivation: "ประสบการณ์ของคุณจะช่วยสร้างการเปลี่ยนแปลงที่ยั่งยืนให้กับชุมชน แม้เงินเดือนไม่สูง แต่ความภาคภูมิใจที่ได้ช่วยเหลือสังคมนั้นล้ำค่า",
    requirements: ["ประสบการณ์การทำงานกับชุมชน", "ทักษะการสื่อสาร", "ความเข้าใจในวัฒนธรรมท้องถิิน"],
    benefits: ["ได้ร่วมสร้างประวัติศาสตร์", "เครือข่ายชุมชนที่แข็งแกร่ง", "ความภาคภูมิใจในการช่วยเหลือสังคม"],
    sdgGoals: ["เมืองและชุมชนที่ยั่งยืน", "การลดความเหลื่อมล้ำ", "การเติบโตทางเศรษฐกิจ"],
    rating: 4.9,
    applicants: 12,
    postedDays: 3,
  },
  {
    id: 2,
    title: "ครูอาสาสอนทักษะชีวิต",
    company: "กรมการศึกษานอกระบบ",
    location: "โรงเรียนชุมชน เชียงใหม่ (2 กม.)",
    pay: "8,000 บาท/เดือน + ค่าเดินทาง",
    schedule: "2-3 วัน/สัปดาห์ เช้า 9:00-12:00",
    hook: "ถ่ายทอดภูมิปัญญาและประสบการณ์ชีวิตให้เด็กรุ่นใหม่!",
    type: "Government",
    phone: "053-777-666",
    isImpact: true,
    category: "government",
    socialImpact: "ช่วยพัฒนาเด็กและเยาวชนให้มีทักษะชีวิตที่ดี สร้างอนาคตที่สดใสให้กับประเทศชาติ",
    motivation: "การสอนเป็นอาชีพที่สูงส่ง ประสบการณ์ชีวิตของคุณจะเป็นแสงสว่างนำทางให้เด็กๆ ได้เรียนรู้และเติบโตอย่างมีคุณภาพ",
    requirements: ["ประสบการณ์ชีวิตที่หลากหลาย", "ความอดทนและใจรัก", "ทักษะการสื่อสาร"],
    benefits: ["ความภาคภูมิใจในการสอน", "ได้เห็นเด็กเติบโต", "สร้างมิตรภาพใหม่"],
    sdgGoals: ["การศึกษาที่มีคุณภาพ", "การลดความเหลื่อมล้ำ", "สันติภาพและความยุติธรรม"],
    rating: 4.8,
    applicants: 8,
    postedDays: 5,
  },
  {
    id: 3,
    title: "ผู้เชี่ยวชาญด้านเกษตรยั่งยืน",
    company: "มูลนิธิเกษตรกรรมยั่งยืน",
    location: "หางดง เชียงใหม่ (15 กม.)",
    pay: "12,000 บาท/เดือน",
    schedule: "ยืดหยุ่น 3-4 วัน/สัปดาห์",
    hook: "ช่วยเกษตรกรปรับตัวสู่การเกษตรที่เป็นมิตรกับสิ่งแวดล้อม!",
    type: "Sustainability",
    phone: "081-888-9999",
    isImpact: true,
    category: "sustainability",
    socialImpact: "ช่วยลดการใช้สารเคมี ปกป้องสิ่งแวดล้อม และเพิ่มรายได้ให้เกษตรกร",
    motivation: "ความรู้ด้านเกษตรของคุณจะช่วยสร้างอนาคตที่ยั่งยืนให้กับโลก การทำงานเพื่อสิ่งแวดล้อมคือการลงทุนเพื่อลูกหลาน",
    requirements: ["ประสบการณ์ด้านเกษตรกรรม", "ความรู้เรื่องเกษตรอินทรีย์", "ความกระตือรือร้น"],
    benefits: ["ได้ช่วยปกป้องสิ่งแวดล้อม", "เครือข่ายเกษตรกร", "ความภาคภูมิใจ"],
    sdgGoals: ["การเกษตรยั่งยืน", "การดูแลสิ่งแวดล้อม", "การลดความยากจน"],
    rating: 4.7,
    applicants: 15,
    postedDays: 7,
  },
  {
    id: 4,
    title: "ผู้ประสานงาน CSR",
    company: "บริษัท CP เชียงใหม่",
    location: "นิคมอุตสาหกรรม เชียงใหม่ (10 กม.)",
    pay: "18,000 บาท/เดือน",
    schedule: "จันทร์-ศุกร์ 9:00-15:00",
    hook: "นำโครงการ CSR ที่สร้างผลกระทบเชิงบวกให้กับสังคม!",
    type: "Corporate",
    phone: "053-555-777",
    isImpact: true,
    category: "social",
    socialImpact: "ขับเคลื่อนโครงการเพื่อสังคมของบริษัทใหญ่ สร้างการเปลี่ยนแปลงเชิงบวกในวงกว้าง",
    motivation: "ประสบการณ์ของคุณจะช่วยให้บริษัทสร้างผลกระทบเชิงบวกต่อสังคม การทำงาน CSR คือการสร้างมรดกที่ดีให้กับรุ่นหลัง",
    requirements: ["ประสบการณ์การทำงานกับชุมชน", "ทักษะการจัดการโครงการ", "ภาษาอังกฤษพื้นฐาน"],
    benefits: ["เงินเดือนที่ดี", "สวัสดิการครบครัน", "ได้ทำงานเพื่อสังคม"],
    sdgGoals: ["ความรับผิดชอบขององค์กร", "การพัฒนาชุมชน", "การเติบโตที่ยั่งยืน"],
    rating: 4.6,
    applicants: 22,
    postedDays: 2,
  },
  {
    id: 5,
    title: "ที่ปรึกษาทางการเงิน",
    company: "ธนาคารกรุงศรี",
    location: "สาขาเซ็นทรัล เชียงใหม่ (3 กม.)",
    pay: "20,000 บาท/เดือน + คอมมิชชั่น",
    schedule: "จันทร์-ศุกร์ 10:00-16:00",
    hook: "ช่วยคนรุ่นใหม่วางแผนการเงินและสร้างความมั่นคงทางการเงิน!",
    type: "Part-Time",
    phone: "053-123-789",
    isImpact: false,
    category: "finance",
    socialImpact: "ช่วยให้คนในชุมชนมีความรู้ทางการเงิน สร้างความมั่นคงทางเศรษฐกิจ",
    motivation: "ประสบการณ์การเงินของคุณจะช่วยให้คนรุ่นใหม่มีอนาคตที่มั่นคง การแบ่งปันความรู้คือการสร้างสังคมที่เข้มแข็ง",
    requirements: ["ประสบการณ์ด้านการเงิน", "ใบอนุญาตที่ปรึกษาการลงทุน", "ทักษะการสื่อสาร"],
    benefits: ["เงินเดือนสูง", "คอมมิชชั่น", "การฝึกอบรมต่อเนื่อง"],
    sdgGoals: ["การเติบโตทางเศรษฐกิจ", "การลดความเหลื่อมล้ำ", "การศึกษาทางการเงิน"],
    rating: 4.5,
    applicants: 18,
    postedDays: 4,
  },
  {
    id: 6,
    title: "พนักงานต้อนรับ",
    company: "โรงแรมเชียงใหม่ แกรนด์วิว",
    location: "ใจกลางเมือง เชียงใหม่ (2 กม.)",
    pay: "15,000 บาท/เดือน + ทิป",
    schedule: "เช้า 6:00-14:00 หรือ บ่าย 14:00-22:00",
    hook: "ต้อนรับนักท่องเที่ยวด้วยรอยยิ้มและความอบอุ่นแบบไทย!",
    type: "Hospitality",
    phone: "053-456-123",
    isImpact: false,
    category: "hospitality",
    socialImpact: "ส่งเสริมการท่องเที่ยว สร้างรายได้ให้กับเศรษฐกิจท้องถิ่น",
    motivation:
      "การต้อนรับคือศิลปะที่คุณมีประสบการณ์ การแสดงความอบอุ่นของคนไทยจะสร้างความประทับใจให้นักท่องเที่ยว และช่วยส่งเสริมเศรษฐกิจท้องถิ่น",
    requirements: ["ทักษะการสื่อสาร", "ภาษาอังกฤษพื้นฐาน", "บุคลิกดี"],
    benefits: ["ทิปจากลูกค้า", "ได้พบปะคนใหม่", "สวัสดิการโรงแรม"],
    sdgGoals: ["การท่องเที่ยวยั่งยืน", "การจ้างงาน", "การเติบโตทางเศรษฐกิจ"],
    rating: 4.3,
    applicants: 25,
    postedDays: 1,
  },
  {
    id: 7,
    title: "ครูสอนภาษาอังกฤษ",
    company: "โรงเรียนสอนภาษา ECC",
    location: "นิมมานเหมินท์ เชียงใหม่ (4 กม.)",
    pay: "300 บาท/ชั่วโมง",
    schedule: "เย็น 17:00-20:00 วันจันทร์-ศุกร์",
    hook: "สอนภาษาอังกฤษให้เด็กและผู้ใหญ่ด้วยประสบการณ์ชีวิตที่หลากหลาย!",
    type: "Education",
    phone: "081-234-567",
    isImpact: false,
    category: "education",
    socialImpact: "พัฒนาทักษะภาษาอังกฤษให้คนในชุมชน เปิดโอกาสในการทำงาน",
    motivation: "การสอนภาษาคือการเปิดโลกใหม่ให้กับผู้เรียน ประสบการณ์ชีวิตของคุณจะทำให้การเรียนรู้มีความหมายมากขึ้น",
    requirements: ["ภาษาอังกฤษดี", "ประสบการณ์การสอน", "ความอดทน"],
    benefits: ["ค่าสอนสูง", "เวลาทำงานยืดหยุ่น", "ได้พัฒนาตนเอง"],
    sdgGoals: ["การศึกษาที่มีคุณภาพ", "การพัฒนาทักษะ", "โอกาสในการทำงาน"],
    rating: 4.4,
    applicants: 14,
    postedDays: 6,
  },
  {
    id: 8,
    title: "ผู้ช่วยงานวิจัยชุมชน",
    company: "มหาวิทยาลัยเชียงใหม่",
    location: "มหาวิทยาลัยเชียงใหม่ (5 กม.)",
    pay: "10,000 บาท/เดือน",
    schedule: "จันทร์-ศุกร์ 9:00-15:00",
    hook: "ร่วมวิจัยเพื่อพัฒนาชุมชนและสร้างองค์ความรู้ใหม่!",
    type: "Research",
    phone: "053-944-000",
    isImpact: true,
    category: "research",
    socialImpact: "สร้างองค์ความรู้เพื่อพัฒนาชุมชน ส่งเสริมการวิจัยที่เป็นประโยชน์ต่อสังคม",
    motivation: "การวิจัยคือการสร้างอนาคต ประสบการณ์ของคุณจะช่วยให้งานวิจัยมีความหมายและสามารถนำไปใช้ประโยชน์ได้จริง",
    requirements: ["ความสนใจในการวิจัย", "ทักษะการสื่อสาร", "ความละเอียดรอบคอบ"],
    benefits: ["ได้เรียนรู้สิ่งใหม่", "เครือข่ายนักวิจัย", "ความภาคภูมิใจ"],
    sdgGoals: ["นวัตกรรมและการวิจัย", "การพัฒนาชุมชน", "การศึกษาตตลอดชีวิต"],
    rating: 4.8,
    applicants: 9,
    postedDays: 8,
  },
]

export default function CommunityOpportunitiesPage() {
  const { t } = useLanguage()
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [appliedJobs, setAppliedJobs] = useState(new Set())
  const [expandedJobs, setExpandedJobs] = useState(new Set())
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  const filterOptions = [
    { id: "all", name: t("jobs.filters.all"), icon: "💼" },
    { id: "government", name: t("jobs.filters.government"), icon: "🏛️" },
    { id: "social", name: t("jobs.filters.social"), icon: "❤️" },
    { id: "sustainability", name: t("jobs.filters.sustainability"), icon: "🌱" },
    { id: "near", name: t("jobs.filters.near"), icon: "📍" },
  ]

  useEffect(() => {
    const mockUser = localStorage.getItem("mockUser")
    if (mockUser) {
      setUser(JSON.parse(mockUser))
      setUserProfile(JSON.parse(mockUser))
    }
  }, [])

  const handleApplyJob = async (job) => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    setSelectedJob(job)
    setShowApplicationModal(true)
  }

  const confirmApplication = async () => {
    if (!selectedJob || !user) return

    try {
      const applications = JSON.parse(localStorage.getItem("jobApplications") || "[]")
      applications.push({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company,
        appliedAt: new Date().toISOString(),
      })
      localStorage.setItem("jobApplications", JSON.stringify(applications))

      setAppliedJobs((prev) => new Set([...prev, selectedJob.id]))
      setShowApplicationModal(false)
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error applying to job:", error)
    }
  }

  const checkRequirementMatch = (job, profile) => {
    if (!profile) return { score: 0, matches: [], suggestions: [] }

    const skills = Array.isArray(profile.skills)
      ? profile.skills.join(" ").toLowerCase()
      : (profile.skills || "").toString().toLowerCase()
    const experience = (profile.experience || "").toLowerCase()
    const education = (profile.education || "").toLowerCase()

    const matches = []
    let score = 0

    job.requirements.forEach((req) => {
      const reqLower = req.toLowerCase()
      if (skills.includes(reqLower) || experience.includes(reqLower) || education.includes(reqLower)) {
        matches.push(req)
        score += 1
      }
    })

    const percentage = Math.round((score / job.requirements.length) * 100)

    return {
      score: percentage,
      matches,
      suggestions: job.requirements.filter((req) => !matches.includes(req)),
    }
  }

  const toggleJobExpansion = (jobId) => {
    setExpandedJobs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(jobId)) {
        newSet.delete(jobId)
      } else {
        newSet.add(jobId)
      }
      return newSet
    })
  }

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.hook.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "near") return matchesSearch && job.location.includes("กม.")
    return matchesSearch && job.category === selectedFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100">
                  <span className="text-lg">←</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{t("jobs.title")}</h1>
                <p className="text-sm text-slate-600">Find meaningful work opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/job-chat">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <span>💬</span>
                  <span className="hidden sm:inline">Chat</span>
                </Button>
              </Link>
              {user ? (
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <span>👤</span>
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">{t("jobs.login")}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Discover Your Next Opportunity</h2>
            <p className="text-slate-600">{t("jobs.welcome")}</p>
          </div>

          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              <span className="text-lg">🔍</span>
            </div>
            <input
              type="text"
              placeholder={t("jobs.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-base border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 text-sm font-medium ${
                  selectedFilter === filter.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{filter.icon}</span>
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isExpanded = expandedJobs.has(job.id)
            const isApplied = appliedJobs.has(job.id)
            const requirementMatch = userProfile ? checkRequirementMatch(job, userProfile) : null

            return (
              <Card
                key={job.id}
                className={`bg-white hover:shadow-lg transition-all duration-300 border border-slate-200 ${
                  job.isImpact ? "border-l-4 border-l-green-500" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1 hover:text-blue-600 cursor-pointer">
                        {job.title}
                      </h3>
                      <p className="text-lg text-slate-700 font-medium mb-2">{job.company}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <span>📍</span>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⭐</span>
                          {job.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>👥</span>
                          {job.applicants} applicants
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600 mb-1">{job.pay}</div>
                      <div className="text-sm text-slate-600">{job.postedDays} days ago</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-800 font-medium leading-relaxed">{job.hook}</p>
                      {job.isImpact && (
                        <div className="flex items-center gap-2 mt-3">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                            <span>🤝</span>
                            Social Impact
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-600 text-lg">💰</span>
                        <div>
                          <div className="text-sm text-slate-600">Salary</div>
                          <div className="font-semibold text-slate-900">{job.pay}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <span className="text-purple-600 text-lg">⏰</span>
                        <div>
                          <div className="text-sm text-slate-600">Schedule</div>
                          <div className="font-semibold text-slate-900">{job.schedule}</div>
                        </div>
                      </div>
                    </div>

                    {userProfile && requirementMatch && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-600 text-lg">🎯</span>
                          <span className="font-semibold text-blue-900">Match Score: {requirementMatch.score}%</span>
                        </div>
                        {requirementMatch.matches.length > 0 && (
                          <p className="text-sm text-blue-800">
                            ✓ Matching skills: {requirementMatch.matches.join(", ")}
                          </p>
                        )}
                      </div>
                    )}

                    {isExpanded && (
                      <div className="space-y-6 border-t border-slate-200 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <span>📋</span>
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                                  <span className="text-green-600 mt-0.5">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <span>🎁</span>
                              Benefits
                            </h4>
                            <ul className="space-y-2">
                              {job.benefits.map((benefit, index) => (
                                <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                                  <span className="text-blue-600 mt-0.5">•</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                            <span>🌍</span>
                            Social Impact
                          </h4>
                          <p className="text-green-800 text-sm leading-relaxed">{job.socialImpact}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => toggleJobExpansion(job.id)}
                        variant="outline"
                        className="flex items-center gap-2 border-slate-200 hover:bg-slate-50"
                      >
                        <span>{isExpanded ? "▲" : "▼"}</span>
                        {isExpanded ? "Hide Details" : "Show Details"}
                      </Button>

                      {isApplied ? (
                        <Button disabled className="flex-1 bg-green-600 text-white">
                          <span className="mr-2">✓</span>
                          Applied
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleApplyJob(job)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {showApplicationModal && selectedJob && userProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* ... existing modal content with professional styling ... */}
          </div>
        </div>
      )}

      {showSuccessModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
            {/* ... existing success modal content ... */}
          </div>
        </div>
      )}
    </div>
  )
}
