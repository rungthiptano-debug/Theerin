import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"
import StartupAnimation from "@/components/startup-animation"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Theerin - แอปสำหรับผู้สูงอายุ",
  description: "Theerin - Wisdom at work, wellness in lives. แอปพลิเคชันที่ออกแบบมาเพื่อผู้สูงอายุไทย เน้นความปลอดภัยและใช้งานง่าย",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className={`${workSans.variable} ${openSans.variable} font-sans antialiased`}>
        <LanguageProvider>
          <StartupAnimation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
