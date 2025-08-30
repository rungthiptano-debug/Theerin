"use client"

import { Card } from "@/components/ui/card"
import { MapPinIcon } from "lucide-react"

interface Hospital {
  id: string
  name: string
  description: string
  location: string
  image?: string
  icon: any
  color: string
}

interface HospitalCardProps {
  hospital: Hospital
  onClick: (hospitalId: string) => void
}

export function HospitalCard({ hospital, onClick }: HospitalCardProps) {
  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 rounded-2xl bg-white"
      onClick={() => onClick(hospital.id)}
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
    </Card>
  )
}
