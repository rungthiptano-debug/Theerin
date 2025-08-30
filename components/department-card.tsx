"use client"
import { ChevronRight } from "lucide-react"

interface Department {
  id: string
  name: string
  description: string
  icon: any
  color: string
}

interface DepartmentCardProps {
  department: Department
  onClick: (departmentId: string) => void
}

export function DepartmentCard({ department, onClick }: DepartmentCardProps) {
  return (
    <button
      onClick={() => onClick(department.id)}
      className="p-6 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-200 text-left group w-full"
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
  )
}
