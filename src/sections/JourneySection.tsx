import React from 'react'
import { Milestone, Award, GraduationCap, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { educationData } from '@/data/education'
import { certificationsData } from '@/data/certifications'

export const JourneySection: React.FC = () => {
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative py-28 border-t border-[#1E2638]"
    >
      <div className="portfolio-container max-w-5xl">
        <div className="flex flex-col items-start gap-4 mb-14">
          <Badge variant="cyan" className="flex items-center gap-1.5">
            <Milestone className="w-3 h-3 text-[#65E5FF]" />
            <span>04 // Journey & Trajectory</span>
          </Badge>
          <h2 id="journey-title" className="text-3xl sm:text-4xl font-extrabold text-[#F4F6FC] tracking-tight">
            Academic Background & Milestones
          </h2>
          <p className="text-[#A4ADBF] max-w-2xl text-base leading-relaxed">
            The formative experiences, degree studies, and credentials shaping my engineering ethos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#F4F6FC] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#65E5FF]" />
              <span>Higher Education</span>
            </h3>

            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="p-6 rounded-xl bg-[#151B2A] border border-[#2A364F] relative"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#65E5FF] mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </div>
                <h4 className="text-base font-bold text-[#F4F6FC] mb-1">{edu.degree}</h4>
                <p className="text-sm text-[#A4ADBF] mb-3">{edu.institution}</p>
                {edu.grade && (
                  <span className="inline-block text-xs font-mono px-2.5 py-1 rounded bg-[#101522] text-[#8175FF] border border-[#1E2638] mb-3">
                    {edu.grade}
                  </span>
                )}
                {edu.details && (
                  <ul className="text-xs text-[#A4ADBF] space-y-1.5 list-disc list-inside">
                    {edu.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Certifications column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#F4F6FC] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#8175FF]" />
              <span>Certifications & Specialized Training</span>
            </h3>

            <div className="space-y-4">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-xl bg-[#151B2A] border border-[#2A364F] flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#F4F6FC] mb-1">{cert.title}</h4>
                    <p className="text-xs text-[#A4ADBF]">{cert.issuer}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#65E5FF] bg-[#65E5FF]/10 px-2 py-0.5 rounded border border-[#65E5FF]/20">
                    {cert.issueDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
