"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBack: () => void
  showProgress?: boolean
  currentStep?: number 
  totalSteps?: number
}

export function PageHeader({ title, subtitle, onBack, showProgress, currentStep, totalSteps }: PageHeaderProps) {
  return (
    <div className="bg-white shadow-lg border-b border-slate-200">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-xl font-medium flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            ย้อนกลับ
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <div className="w-8"></div>
        </div>
        {subtitle && <p className="text-base text-slate-600 text-center font-medium">{subtitle}</p>}

        {showProgress && currentStep && totalSteps && (
          <div className="flex items-center justify-center mt-6">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step < currentStep ? "✓" : step}
                </div>
                {step < totalSteps && (
                  <div className={`w-8 h-1 mx-1 ${step < currentStep ? "bg-blue-600" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
