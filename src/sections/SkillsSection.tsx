import React from 'react'
import { Wrench, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { skillsData } from '@/data/skills'

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative py-28 border-t border-[#1E2638]"
    >
      <div className="portfolio-container max-w-5xl">
        <div className="flex flex-col items-start gap-4 mb-14">
          <Badge variant="cyan" className="flex items-center gap-1.5">
            <Wrench className="w-3 h-3 text-[#65E5FF]" />
            <span>02 // Skills & Arsenal</span>
          </Badge>
          <h2 id="skills-title" className="text-3xl sm:text-4xl font-extrabold text-[#F4F6FC] tracking-tight">
            Technical Stack & Core Disciplines
          </h2>
          <p className="text-[#A4ADBF] max-w-2xl text-base leading-relaxed">
            Curated toolkit honed across real-time 3D web interfaces, enterprise software, and scalable APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-xl bg-[#151B2A] border border-[#2A364F] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-[#F4F6FC] mb-2">{category.title}</h3>
                <p className="text-xs text-[#A4ADBF] mb-6 leading-relaxed">
                  {category.description}
                </p>

                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#101522] border border-[#1E2638]"
                    >
                      <span className="font-medium text-[#F4F6FC] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#65E5FF]" />
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="font-mono text-[10px] text-[#8175FF]">
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
