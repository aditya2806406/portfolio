import React from 'react'
import { GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { educationData } from '@/data/education'

export const EducationCard: React.FC = () => {
  const edu = educationData[0]
  if (!edu) return null

  return (
    <div className="relative glass-panel-elevated p-6 sm:p-8 rounded-2xl border border-[#2A364F] shadow-[0_10px_35px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Background corner glow */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#65E5FF]/10 blur-2xl pointer-events-none"
      />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#65E5FF]/15 border border-[#65E5FF]/30 text-[#65E5FF] shadow-[0_0_15px_rgba(101,229,255,0.2)]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#65E5FF] font-semibold">
              ACADEMIC DEGREE // QUALIFICATION
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#F4F6FC] leading-snug">
              {edu.degree}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101522] border border-[#1E2638] text-xs font-mono text-[#8175FF]">
          <Calendar className="w-3.5 h-3.5" />
          <span>{edu.period}</span>
        </div>
      </div>

      {/* Institution name & location */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A4ADBF] mb-6 pb-4 border-b border-[#1E2638]">
        <MapPin className="w-4 h-4 text-[#8175FF] shrink-0" />
        <span className="font-medium text-[#E2E8F4]">{edu.institution}</span>
      </div>

      {/* Detailed Highlights */}
      {edu.details && (
        <div className="space-y-2.5 mb-6">
          {edu.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A4ADBF]">
              <CheckCircle2 className="w-4 h-4 text-[#65E5FF] shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
      )}

      {/* Specialization Discipline Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#1E2638]">
        <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#101522] text-[#65E5FF] border border-[#65E5FF]/30 font-semibold">
          Data Analytics Specialization
        </span>
        <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#101522] text-[#A4ADBF] border border-[#1E2638]">
          Computer Science Engineering
        </span>
        <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#101522] text-[#8175FF] border border-[#8175FF]/30">
          Smart India Hackathon Lead
        </span>
      </div>
    </div>
  )
}
