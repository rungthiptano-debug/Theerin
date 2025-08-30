"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/language-context"
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Users,
  Star,
  CheckCircle,
  Heart,
  Award,
  Target,
  Lightbulb,
  HandHeart,
  TrendingUp,
  Shield,
  User,
  Calendar,
  Briefcase,
} from "lucide-react"

const jobDetails = {
  1: {
    id: 1,
    title: "ที่ปรึกษาทางการเงิน",
    company: "ธนาคารกรุงศรี",
    location: "เชียงใหม่",
    salary: "15,000-25,000 บาท",
    type: "Part-time",
    category: "consulting",
    description: "ต้องการผู้มีประสบการณ์ด้านการเงินมาให้คำปรึกษาลูกค้า มีความรู้ด้านการลงทุนและการออม",
    rating: 4.5,
    applicants: 23,
    posted: "2 วันที่แล้ว",
    requirements: [
      "ประสบการณ์ด้านการเงินอย่างน้อย 5 ปี",
      "มีใบอนุญาตที่ปรึกษาการลงทุน (หากมี)",
      "ทักษะการสื่อสารที่ดี",
      "ความอดทนและใจเย็นในการให้คำปรึกษา",
      "สามารถทำงานแบบยืดหยุ่นได้",
    ],
    benefits: ["เงินเดือนตามประสบการณ์", "โบนัสตามผลงาน", "ประกันสุขภาพ", "การฝึกอบรมต่อเนื่อง", "เวลาทำงานยืดหยุ่น"],
    motivation: {
      title: "ช่วยสร้างความมั่นคงทางการเงินให้ชุมชน",
      description:
        "ประสบการณ์อันล้ำค่าของคุณจะช่วยให้คนในชุมชนมีความรู้ด้านการเงินที่ถูกต้อง สร้างความมั่นคงให้ครอบครัวไทย และส่งเสริมเศรษฐกิจฐานรากให้แข็งแกร่ง",
      impact: "ลูกค้าแต่ละรายที่ได้รับคำปรึกษาจากคุณจะสามารถวางแผนการเงินได้ดีขึ้น ลดหนี้สิน และสร้างความมั่นคงให้ลูกหลาน",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 1: ขจัดความยากจน", "เป้าหมาย 8: การจ้างงานที่มีคุณค่าและการเติบโตทางเศรษฐกิจ"],
      communityBenefit: "ช่วยลดความเหลื่อมล้ำทางเศรษฐกิจในชุมชน สร้างความรู้ทางการเงินให้ประชาชน",
    },
    workEnvironment: "สำนักงานสาขาที่ทันสมัย บรรยากาศเป็นกันเอง ทีมงานให้การสนับสนุนดี",
    schedule: "จันทร์-ศุกร์ 9:00-15:00 น. (สามารถปรับเวลาได้ตามความสะดวก)",
  },
  2: {
    id: 2,
    title: "ครูสอนภาษาอังกฤษ",
    company: "มหาวิทยาลัยเชียงใหม่",
    location: "เชียงใหม่",
    salary: "300-500 บาท/ชั่วโมง",
    type: "Flexible",
    category: "teaching",
    description: "สอนภาษาอังกฤษให้กับเด็กและผู้ใหญ่ เวลาเรียนยืดหยุ่น สามารถเลือกเวลาได้ตามสะดวก",
    rating: 4.8,
    applicants: 45,
    posted: "1 วันที่แล้ว",
    requirements: [
      "ความรู้ภาษาอังกฤษระดับดี",
      "ประสบการณ์การสอนหรือการฝึกอบรม",
      "ความอดทนและรักในการสอน",
      "สามารถใช้เทคโนโลยีพื้นฐานได้",
      "มีใจรักในการถ่ายทอดความรู้",
    ],
    benefits: ["ค่าสอนตามชั่วโมง", "เวลาทำงานยืดหยุ่น", "สภาพแวดล้อมการทำงานดี", "ได้พัฒนาทักษะการสอน", "ความภาคภูมิใจในการสร้างคน"],
    motivation: {
      title: "ปลูกฝังความรู้ สร้างอนาคตให้เยาวชน",
      description: "การสอนของคุณจะเป็นรากฐานสำคัญในการพัฒนาทักษะภาษาอังกฤษของนักเรียน ช่วยเปิดโอกาสในการศึกษาและทำงานในอนาคต",
      impact: "นักเรียนทุกคนที่ได้เรียนกับคุณจะมีทักษะภาษาที่ดีขึ้น สามารถแข่งขันในตลาดงานสากลได้ และมีโอกาสในชีวิตที่กว้างขึ้น",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 4: การศึกษาที่มีคุณภาพ", "เป้าหมาย 10: ลดความเหลื่อมล้ำ"],
      communityBenefit: "พัฒนาทักษะภาษาอังกฤษให้เยาวชนไทย เพิ่มโอกาสในการแข่งขันระดับสากล",
    },
    workEnvironment: "ห้องเรียนที่ทันสมัย อุปกรณ์การสอนครบครัน บรรยากาศเอื้อต่อการเรียนรู้",
    schedule: "เลือกเวลาได้ตามความสะดวก สามารถสอนออนไลน์หรือที่มหาวิทยาลัย",
  },
  3: {
    id: 3,
    title: "ที่ปรึกษาโครงการตลาดริมน้ำ",
    company: "เทศบาลนครเชียงใหม่",
    location: "เชียงใหม่",
    salary: "20,000-30,000 บาท",
    type: "Project-based",
    category: "social",
    description: "โครงการพัฒนาชุมชนแออัดริมแม่น้ำปิงให้เป็นตลาดชุมชนที่ยั่งยืน ต้องการผู้เชี่ยวชาญด้านการพัฒนาชุมชนและการจัดการโครงการ",
    rating: 4.9,
    applicants: 12,
    posted: "3 วันที่แล้ว",
    requirements: [
      "ประสบการณ์ด้านการพัฒนาชุมชนหรือโครงการสาธารณะ",
      "ความเข้าใจในวัฒนธรรมท้องถิ่น",
      "ทักษะการสื่อสารกับชุมชน",
      "ความรู้ด้านการจัดการโครงการ",
      "จิตใจรักในการพัฒนาสังคม",
    ],
    benefits: [
      "เงินเดือนโครงการ",
      "ค่าเดินทาง",
      "ประกันอุบัติเหตุ",
      "ความภาคภูมิใจในการสร้างการเปลี่ยนแปลง",
      "เครือข่ายการทำงานด้านสังคม",
    ],
    motivation: {
      title: "สร้างการเปลี่ยนแปลงที่ยั่งยืนให้ชุมชน",
      description: "โครงการนี้จะเปลี่ยนชุมชนแออัดให้กลายเป็นแหล่งเศรษฐกิจชุมชนที่มีชีวิตชีวา สร้างรายได้ให้ผู้คนในชุมชนและอนุรักษ์วิถีชีวิตริมน้ำ",
      impact: "ครอบครัวกว่า 200 หลังคาเรือนจะมีคุณภาพชีวิตที่ดีขึ้น มีรายได้จากการค้าขาย และเป็นแบบอย่างการพัฒนาชุมชนแบบยั่งยืน",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 1: ขจัดความยากจน", "เป้าหมาย 11: เมืองและชุมชนที่ยั่งยืน", "เป้าหมาย 17: ความร่วมมือเพื่อเป้าหมาย"],
      communityBenefit: "ยกระดับคุณภาพชีวิตชุมชนแออัด สร้างเศรษฐกิจฐานราก อนุรักษ์วัฒนธรรมท้องถิ่น",
    },
    workEnvironment: "ทำงานในชุมชนจริง ได้สัมผัสกับผู้คนและวิถีชีวิต บรรยากาศการทำงานแบบครอบครัว",
    schedule: "จันทร์-ศุกร์ 8:00-16:00 น. บางครั้งอาจต้องทำงานวันเสาร์ตามกิจกรรมชุมชน",
  },
  4: {
    id: 4,
    title: "ครูอาสาสอนทักษะชีวิต",
    company: "กรมการพัฒนาชุมชน",
    location: "เชียงใหม่",
    salary: "12,000-18,000 บาท",
    type: "Part-time",
    category: "government",
    description: "สอนทักษะชีวิตให้กับเด็กและเยาวชนในชุมชนห่างไกล เน้นการพัฒนาทักษะการคิด การแก้ปัญหา และการดำรงชีวิต",
    rating: 4.7,
    applicants: 18,
    posted: "1 สัปดาห์ที่แล้ว",
    requirements: [
      "ประสบการณ์ชีวิตที่หลากหลาย",
      "ความอดทนและใจรักในการสอน",
      "สามารถเดินทางไปชุมชนห่างไกลได้",
      "ทักษะการสื่อสารที่ดี",
      "จิตอาสาและความรักในการพัฒนาเยาวชน",
    ],
    benefits: ["ค่าตอบแทนรายเดือน", "ค่าเดินทาง", "ที่พักในชุมชน", "ประกันสุขภาพ", "ความภาคภูมิใจในการสร้างคน"],
    motivation: {
      title: "ปลูกฝังทักษะชีวิตให้เยาวชนไทย",
      description: "ประสบการณ์ชีวิตของคุณจะเป็นบทเรียนสำคัญให้เด็กและเยาวชน ช่วยพัฒนาทักษะการคิด การแก้ปัญหา และการใช้ชีวิตอย่างมีคุณค่า",
      impact: "เยาวชนที่ได้เรียนรู้จากคุณจะมีทักษะชีวิตที่ดี สามารถเผชิญกับความท้าทายได้ และเป็นกำลังสำคัญในการพัฒนาชุมชน",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 4: การศึกษาที่มีคุณภาพ", "เป้าหมาย 3: สุขภาวะที่ดีและการส่งเสริมคุณภาพชีวิต"],
      communityBenefit: "พัฒนาเยาวชนในชุมชนห่างไกล สร้างทักษะชีวิตที่จำเป็น ลดปัญหาสังคม",
    },
    workEnvironment: "ทำงานในชุมชนชนบท บรรยากาศธรรมชาติ ได้สัมผัสวิถีชีวิตแบบดั้งเดิม",
    schedule: "อังคาร-เสาร์ 9:00-15:00 น. (เดินทางไปชุมชน 2-3 วันต่อสัปดาห์)",
  },
  5: {
    id: 5,
    title: "ผู้เชี่ยวชาญด้านเกษตรยั่งยืน",
    company: "มูลนิธิเกษตรกรรมยั่งยืน",
    location: "เชียงใหม่",
    salary: "18,000-25,000 บาท",
    type: "Full-time",
    category: "sustainability",
    description: "ให้คำปรึกษาเกษตรกรเรื่องการทำเกษตรยั่งยืน เกษตรอินทรีย์ และการจัดการทรัพยากรธรรมชาติ",
    rating: 4.6,
    applicants: 15,
    posted: "5 วันที่แล้ว",
    requirements: [
      "ประสบการณ์ด้านการเกษตรหรือการจัดการทรัพยากรธรรมชาติ",
      "ความรู้เรื่องเกษตรอินทรีย์และเกษตรยั่งยืน",
      "ทักษะการสื่อสารกับเกษตรกร",
      "ความรักในธรรมชาติและสิ่งแวดล้อม",
      "สามารถเดินทางไปพื้นที่เกษตรได้",
    ],
    benefits: ["เงินเดือนประจำ", "ค่าเดินทางไปพื้นที่", "ประกันสุขภาพ", "การฝึกอบรมเพิ่มเติม", "ความภาคภูมิใจในการอนุรักษ์สิ่งแวดล้อม"],
    motivation: {
      title: "อนุรักษ์สิ่งแวดล้อมและสร้างความยั่งยืน",
      description: "ความรู้และประสบการณ์ของคุณจะช่วยให้เกษตรกรเปลี่ยนมาทำเกษตรยั่งยืน ลดการใช้สารเคมี และอนุรักษ์ทรัพยากรธรรมชาติ",
      impact: "เกษตรกรที่ได้รับคำปรึกษาจะมีรายได้ที่มั่นคง ผลิตอาหารปลอดภัย และช่วยรักษาสิ่งแวดล้อมให้ลูกหลาน",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 2: ขจัดความหิวโหย", "เป้าหมาย 15: ระบบนิเวศทางบก", "เป้าหมาย 13: การรับมือการเปลี่ยนแปลงสภาพภูมิอากาศ"],
      communityBenefit: "ส่งเสริมเกษตรยั่งยืน อนุรักษ์สิ่งแวดล้อม สร้างความมั่นคงทางอาหาร",
    },
    workEnvironment: "ทำงานในไร่นาและสำนักงาน ได้สัมผัสธรรมชาติ บรรยากาศการทำงานแบบครอบครัว",
    schedule: "จันทร์-ศุกร์ 8:00-16:00 น. บางครั้งต้องออกพื้นที่วันเสาร์",
  },
  6: {
    id: 6,
    title: "พนักงานต้อนรับ",
    company: "โรงแรมแกรนด์",
    location: "เชียงใหม่",
    salary: "12,000-15,000 บาท",
    type: "Full-time",
    category: "hospitality",
    description: "ต้อนรับแขกที่มาพักโรงแรม ให้ข้อมูลและความช่วยเหลือ ดูแลความพึงพอใจของลูกค้า",
    rating: 4.3,
    applicants: 32,
    posted: "4 วันที่แล้ว",
    requirements: [
      "บุคลิกดี มีมนุษยสัมพันธ์ที่ดี",
      "ทักษะการสื่อสารที่ดี",
      "ความอดทนและใจเย็น",
      "สามารถใช้คอมพิวเตอร์พื้นฐานได้",
      "ความรับผิดชอบสูง",
    ],
    benefits: ["เงินเดือนประจำ", "โบนัสประจำปี", "ประกันสุขภาพ", "ชุดยูนิฟอร์ม", "อาหารกลางวัน"],
    motivation: {
      title: "สร้างความประทับใจให้นักท่องเที่ยว",
      description: "การต้อนรับที่อบอุ่นของคุณจะทำให้นักท่องเที่ยวรู้สึกประทับใจในไทย ช่วยส่งเสริมการท่องเที่ยวและเศรษฐกิจของประเทศ",
      impact: "แขกทุกคนที่ได้รับการต้อนรับจากคุณจะกลับไปเล่าถึงความอบอุ่นของคนไทย ช่วยสร้างชื่อเสียงที่ดีให้ประเทศ",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 8: การจ้างงานที่มีคุณค่าและการเติบโตทางเศรษฐกิจ"],
      communityBenefit: "ส่งเสริมการท่องเที่ยว สร้างรายได้ให้ชุมชน แสดงความเป็นไทยที่อบอุ่น",
    },
    workEnvironment: "โรงแรมที่ทันสมัย บรรยากาศการทำงานดี ทีมงานเป็นกันเอง",
    schedule: "เวรเช้า 6:00-14:00 น. หรือเวรบ่าย 14:00-22:00 น.",
  },
  7: {
    id: 7,
    title: "ผู้ช่วยนักวิจัย",
    company: "สถาบันวิจัยสังคม",
    location: "เชียงใหม่",
    salary: "15,000-20,000 บาท",
    type: "Part-time",
    category: "research",
    description: "ช่วยงานวิจัยด้านสังคมและชุมชน เก็บข้อมูล สัมภาษณ์ และวิเคราะห์ข้อมูลเบื้องต้น",
    rating: 4.4,
    applicants: 21,
    posted: "6 วันที่แล้ว",
    requirements: [
      "ความสนใจในงานวิจัยและการพัฒนาสังคม",
      "ทักษะการสื่อสารและการสัมภาษณ์",
      "ความละเอียดรอบคอบ",
      "สามารถใช้คอมพิวเตอร์ได้",
      "ความอดทนในการเก็บข้อมูล",
    ],
    benefits: ["ค่าตอบแทนรายเดือน", "ค่าเดินทาง", "ได้เรียนรู้งานวิจัย", "ประกันอุบัติเหตุ", "ความภาคภูมิใจในการสร้างความรู้"],
    motivation: {
      title: "สร้างความรู้เพื่อพัฒนาสังคม",
      description: "งานวิจัยที่คุณช่วยทำจะเป็นข้อมูลสำคัญในการกำหนดนโยบายและพัฒนาสังคมไทยให้ดีขึ้น",
      impact: "ผลงานวิจัยจะช่วยให้หน่วยงานรัฐและเอกชนเข้าใจปัญหาสังคมและหาทางแก้ไขที่เหมาะสม",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 16: สันติภาพ ความยุติธรรม และสถาบันที่เข้มแข็ง"],
      communityBenefit: "สร้างฐานข้อมูลสำคัญเพื่อการพัฒนาสังคม ช่วยแก้ไขปัญหาชุมชน",
    },
    workEnvironment: "สำนักงานวิจัย ห้องสมุด และพื้นที่ชุมชน บรรยากาศเอื้อต่อการเรียนรู้",
    schedule: "จันทร์-ศุกร์ 9:00-15:00 น. (ยืดหยุ่นตามงานวิจัย)",
  },
  8: {
    id: 8,
    title: "ผู้ประสานงานโครงการ CSR",
    company: "บริษัท ซีพี ออลล์",
    location: "เชียงใหม่",
    salary: "22,000-28,000 บาท",
    type: "Full-time",
    category: "social",
    description: "ประสานงานโครงการความรับผิดชอบต่อสังคม ดูแลกิจกรรมเพื่อชุมชน และติดตามผลการดำเนินงาน",
    rating: 4.5,
    applicants: 19,
    posted: "1 สัปดาห์ที่แล้ว",
    requirements: [
      "ประสบการณ์ด้านการจัดการโครงการ",
      "ความเข้าใจในแนวคิด CSR และความยั่งยืน",
      "ทักษะการประสานงานและการสื่อสาร",
      "ความรับผิดชอบและความละเอียดรอบคอบ",
      "จิตใจรักในการทำงานเพื่อสังคม",
    ],
    benefits: ["เงินเดือนตามประสบการณ์", "โบนัสประจำปี", "ประกันสุขภาพ", "การฝึกอบรม", "ความภาคภูมิใจในการทำงานเพื่อสังคม"],
    motivation: {
      title: "สร้างผลกระทบเชิงบวกให้สังคม",
      description: "การทำงานของคุณจะช่วยให้บริษัทสร้างคุณค่าให้สังคม ผ่านโครงการต่างๆ ที่ช่วยเหลือชุมชนและสิ่งแวดล้อม",
      impact: "โครงการ CSR ที่คุณดูแลจะสร้างการเปลี่ยนแปลงเชิงบวกให้ชุมชน สร้างความยั่งยืนให้สังคมไทย",
    },
    socialImpact: {
      sdgGoals: ["เป้าหมาย 17: ความร่วมมือเพื่อเป้าหมาย", "เป้าหมาย 11: เมืองและชุมชนที่ยั่งยืน"],
      communityBenefit: "ส่งเสริมความร่วมมือระหว่างภาคเอกชนและชุมชน สร้างโครงการที่ยั่งยืน",
    },
    workEnvironment: "สำนักงานบริษัทและพื้นที่ชุมชน ทีมงานมืออาชีพ บรรยากาศการทำงานที่ดี",
    schedule: "จันทร์-ศุกร์ 8:30-17:30 น. บางครั้งต้องทำงานวันเสาร์ตามกิจกรรม",
  },
}

export default function JobDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [appliedJobs, setAppliedJobs] = useState(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationStep, setConfirmationStep] = useState(1)
  const [requirementChecks, setRequirementChecks] = useState({})
  const supabase = createClient()

  const jobId = Number.parseInt(params.id as string)
  const job = jobDetails[jobId]

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setUserProfile(profile)

        const { data: applications } = await supabase.from("job_applications").select("job_id").eq("user_id", user.id)
        if (applications) {
          setAppliedJobs(new Set(applications.map((app) => app.job_id)))
        }
      }
    }
    getUser()
  }, [])

  const checkRequirementMatch = (requirement, profile) => {
    if (!profile) return false

    const req = requirement.toLowerCase()
    const experience = profile.experience?.toLowerCase() || ""
    const education = profile.education?.toLowerCase() || ""
    const skills = Array.isArray(profile.skills)
      ? profile.skills.join(" ").toLowerCase()
      : profile.skills?.toString().toLowerCase() || ""

    if (req.includes("ประสบการณ์") && req.includes("5 ปี")) {
      return experience.includes("ปี") && Number.parseInt(experience.match(/\d+/)?.[0] || "0") >= 5
    }
    if (req.includes("การสื่อสาร")) {
      return skills.includes("สื่อสาร") || experience.includes("สื่อสาร")
    }
    if (req.includes("ภาษาอังกฤษ")) {
      return skills.includes("อังกฤษ") || education.includes("อังกฤษ")
    }
    if (req.includes("การสอน")) {
      return experience.includes("สอน") || experience.includes("ครู")
    }

    return Math.random() > 0.3 // Fallback for demo
  }

  const handleApplyJob = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!userProfile || !userProfile.full_name || !userProfile.location) {
      router.push("/profile")
      return
    }

    const checks = {}
    job.requirements.forEach((req, index) => {
      checks[index] = checkRequirementMatch(req, userProfile)
    })
    setRequirementChecks(checks)
    setConfirmationStep(1)
    setShowConfirmation(true)
  }

  const confirmApplication = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("job_applications").insert({
        user_id: user.id,
        job_id: job.id,
        job_title: job.title,
        company_name: job.company,
        status: "applied",
      })

      if (!error) {
        setAppliedJobs((prev) => new Set([...prev, job.id]))
        setShowConfirmation(false)
        setConfirmationStep(1)
        console.log("[v0] Successfully applied to job:", job.title)
      }
    } catch (error) {
      console.error("[v0] Error applying to job:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">{t("jobs.detail.jobNotFound")}</h1>
          <Link href="/find-job">
            <Button>{t("jobs.detail.backToJobs")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-secondary">
        <div className="max-w-md mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="p-2 text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-heading font-bold text-primary-foreground">{t("jobs.detail.title")}</h1>
            <div className="ml-auto">
              {user && (
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="p-2 text-primary-foreground hover:bg-white/20">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Job Header */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">{job.title}</h2>
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary" />
                  <p className="text-muted-foreground font-semibold text-lg">{job.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-700">{job.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground text-lg">{job.salary}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{job.type}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">{job.schedule}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Motivational Section */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading font-bold text-green-800 mb-2">{job.motivation.title}</h3>
              <p className="text-green-700 leading-relaxed mb-3">{job.motivation.description}</p>
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <p className="text-green-800 text-sm font-medium">{job.motivation.impact}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Job Description */}
        <Card className="p-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            {t("jobs.detail.jobDescription")}
          </h3>
          <p className="text-card-foreground leading-relaxed text-base">{job.description}</p>
        </Card>

        {/* Requirements */}
        <Card className="p-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {t("jobs.requirements")}
          </h3>
          <ul className="space-y-3">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Benefits */}
        <Card className="p-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            {t("jobs.benefits")}
          </h3>
          <ul className="space-y-3">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Work Environment */}
        <Card className="p-6">
          <h3 className="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {t("jobs.detail.workEnvironment")}
          </h3>
          <p className="text-card-foreground leading-relaxed">{job.workEnvironment}</p>
        </Card>

        {/* Social Impact */}
        {job.socialImpact && (
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-blue-800 mb-2">
                  {t("jobs.detail.socialImpactTitle")}
                </h3>
                <p className="text-blue-700 leading-relaxed mb-3">{job.socialImpact.communityBenefit}</p>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-blue-800 text-sm font-medium">{t("jobs.detail.sdgGoals")}:</p>
                  </div>
                  <ul className="list-disc list-inside mt-2">
                    {job.socialImpact.sdgGoals.map((goal, index) => (
                      <li key={index} className="text-blue-700 text-sm">
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Application Stats */}
        <Card className="p-6 bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {job.applicants} {t("jobs.detail.applicantsCount")}
              </span>
            </div>
            <span className="font-medium">
              {t("jobs.detail.postedTime")} {job.posted}
            </span>
          </div>
        </Card>

        {/* Application Button */}
        <div className="sticky bottom-6 bg-background/95 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
          {appliedJobs.has(job.id) ? (
            <Button disabled className="w-full h-14 text-lg font-semibold bg-green-600 text-white">
              <CheckCircle className="w-6 h-6 mr-2" />
              {t("jobs.detail.appliedAlready")}
            </Button>
          ) : (
            <Button
              onClick={handleApplyJob}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <HandHeart className="w-6 h-6 mr-2" />
              {t("jobs.detail.applyNow")}
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Application Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-background">
            {confirmationStep === 1 && (
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {t("jobs.detail.checkQualifications")}
                  </h3>
                  <p className="text-muted-foreground">{t("jobs.detail.qualificationCheck")}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">{t("jobs.detail.requiredQualifications")}:</h4>
                  {job.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      {requirementChecks[index] ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted-foreground rounded-full mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <span
                          className={`text-sm ${requirementChecks[index] ? "text-green-700" : "text-muted-foreground"}`}
                        >
                          {req}
                        </span>
                        {requirementChecks[index] && (
                          <p className="text-xs text-green-600 mt-1">✓ {t("jobs.detail.matchesExperience")}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-blue-800 text-sm font-medium mb-1">{t("jobs.detail.advice")}</p>
                      <p className="text-blue-700 text-sm">{t("jobs.detail.adviceText")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1">
                    {t("common.cancel")}
                  </Button>
                  <Button onClick={() => setConfirmationStep(2)} className="flex-1">
                    {t("jobs.detail.continue")}
                  </Button>
                </div>
              </div>
            )}

            {confirmationStep === 2 && (
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {t("jobs.detail.profileInfo")}
                  </h3>
                  <p className="text-muted-foreground">{t("jobs.detail.checkProfile")}</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">{t("jobs.name")}:</span>
                      <span className="col-span-2 text-foreground">{userProfile?.full_name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">{t("jobs.age")}:</span>
                      <span className="col-span-2 text-foreground">
                        {userProfile?.age} {t("jobs.years")}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">{t("jobs.address")}:</span>
                      <span className="col-span-2 text-foreground">{userProfile?.location}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">{t("jobs.education")}:</span>
                      <span className="col-span-2 text-foreground">{userProfile?.education}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">{t("jobs.experience")}:</span>
                      <span className="col-span-2 text-foreground">{userProfile?.experience}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="font-medium text-muted-foreground">{t("jobs.detail.skills")}:</span>
                      <span className="col-span-2 text-foreground">{userProfile?.skills}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">{t("jobs.detail.applyingFor")}:</h4>
                    <p className="text-amber-700 font-medium">{job.title}</p>
                    <p className="text-amber-600 text-sm">
                      {t("jobs.detail.at")} {job.company}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <HandHeart className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-800 text-sm font-medium mb-1">{t("jobs.detail.encouragement")}</p>
                      <p className="text-green-700 text-sm">{t("jobs.detail.encouragementText")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setConfirmationStep(1)} className="flex-1">
                    {t("jobs.detail.goBack")}
                  </Button>
                  <Button onClick={confirmApplication} disabled={isLoading} className="flex-1">
                    {isLoading ? t("jobs.detail.submitting") : t("jobs.detail.confirmApplication")}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
