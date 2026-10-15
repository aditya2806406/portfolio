import React, { useState } from 'react'
import { CheckCircle2, Terminal } from 'lucide-react'
import { developmentTimelineData, type DevelopmentMilestone } from '@/data/timeline'

export const DevelopmentTimeline: React.FC = () => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(developmentTimelineData[0]?.id || '')

  return (
    <div className="relative w-full">
      {/* Timeline Section Header */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#1E2638]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#65E5FF]" />
          <h3 className="text-base font-bold text-[#F4F6FC] tracking-tight">
            Personal Engineering & Learning Milestones
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#8175FF] bg-[#8175FF]/10 px-2.5 py-0.5 rounded-full border border-[#8175FF]/20">
          5 Verified Milestones
        </span>
      </div>

      {/* Vertical Continuous Rail */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#65E5FF] before:via-[#8175FF] before:to-[#1E2638]">
        {developmentTimelineData.map((milestone: DevelopmentMilestone, idx: number) => {
          const isActive = activeMilestoneId === milestone.id
          const isCyan = milestone.accentColor === 'cyan'

          return (
            <div
              key={milestone.id}
              onClick={() => setActiveMilestoneId(milestone.id)}
              className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isActive
                  ? isCyan
                    ? 'bg-[#151B2A]/90 border-[#65E5FF]/60 shadow-[0_0_25px_rgba(101,229,255,0.15)] -translate-y-0.5'
                    : 'bg-[#151B2A]/90 border-[#8175FF]/60 shadow-[0_0_25px_rgba(129,117,255,0.15)] -translate-y-0.5'
                  : 'bg-[#101522]/60 border-[#1E2638] hover:border-[#2A364F] hover:bg-[#151B2A]/60'
              }`}
            >
              {/* Left timeline marker beacon */}
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? isCyan
                      ? 'bg-[#080A10] border-[#65E5FF] shadow-[0_0_12px_#65E5FF] scale-125'
                      : 'bg-[#080A10] border-[#8175FF] shadow-[0_0_12px_#8175FF] scale-125'
                    : 'bg-[#080A10] border-[#2A364F] group-hover:border-[#65E5FF]/60'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full m-auto mt-[3px] transition-colors ${
                    isActive ? (isCyan ? 'bg-[#65E5FF]' : 'bg-[#8175FF]') : 'bg-transparent'
                  }`}
                />
              </div>

              {/* Header meta badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold tracking-wider uppercase border ${
                      isCyan
                        ? 'bg-[#65E5FF]/10 text-[#65E5FF] border-[#65E5FF]/20'
                        : 'bg-[#8175FF]/10 text-[#8175FF] border-[#8175FF]/20'
                    }`}
                  >
                    {milestone.phase}
                  </span>
                  <span className="text-xs font-mono text-[#A4ADBF]">{milestone.categoryLabel}</span>
                </div>

                <span className="text-[11px] font-mono text-[#6B778D]">Step 0{idx + 1}</span>
              </div>

              {/* Title & Narrative */}
              <h4
                className={`text-base sm:text-lg font-bold mb-2 transition-colors ${
                  isActive ? 'text-[#F4F6FC]' : 'text-[#E2E8F4] group-hover:text-[#65E5FF]'
                }`}
              >
                {milestone.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#A4ADBF] leading-relaxed mb-4">
                {milestone.description}
              </p>

              {/* Key Learnings List */}
              <div className="space-y-1.5 mb-4 pt-2 border-t border-[#1E2638]/60">
                {milestone.keyLearnings.map((learning, lIdx) => (
                  <div key={lIdx} className="flex items-start gap-2 text-xs text-[#A4ADBF]">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                        isCyan ? 'text-[#65E5FF]' : 'text-[#8175FF]'
                      }`}
                    />
                    <span>{learning}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {milestone.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080A10] text-[#A4ADBF] border border-[#1E2638]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
