import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับหน้าหลัก
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">สมัครสมาชิกสำเร็จ!</CardTitle>
            <CardDescription className="text-gray-600">กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">เราได้ส่งลิงก์ยืนยันไปยังอีเมลของคุณแล้ว กรุณาคลิกลิงก์เพื่อเปิดใช้งานบัญชีก่อนเข้าสู่ระบบ</p>
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/auth/login">ไปหน้าเข้าสู่ระบบ</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
