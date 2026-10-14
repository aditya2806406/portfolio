import React from 'react'
import { FolderGit2, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/ui/Icons'
import { Badge } from '@/components/ui/Badge'
import { projectsData } from '@/data/projects'

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative py-28 border-t border-[#1E2638] bg-[#101522]/30"
    >
      <div className="portfolio-container max-w-5xl">
        <div className="flex flex-col items-start gap-4 mb-14">
          <Badge variant="purple" className="flex items-center gap-1.5">
            <FolderGit2 className="w-3 h-3 text-[#8175FF]" />
            <span>03 // Featured Works</span>
          </Badge>
          <h2 id="projects-title" className="text-3xl sm:text-4xl font-extrabold text-[#F4F6FC] tracking-tight">
            Selected Creations & Experiments
          </h2>
          <p className="text-[#A4ADBF] max-w-2xl text-base leading-relaxed">
            Showcasing interactive spatial web apps, full-stack platforms, and developer tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded-xl bg-[#151B2A] border border-[#2A364F] hover:border-[#65E5FF]/60 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#65E5FF] px-2 py-0.5 rounded bg-[#65E5FF]/10 border border-[#65E5FF]/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub source for ${project.title}`}
                        className="text-[#A4ADBF] hover:text-[#F4F6FC] transition-colors p-1"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        aria-label={`Live demo for ${project.title}`}
                        className="text-[#A4ADBF] hover:text-[#65E5FF] transition-colors p-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F4F6FC] group-hover:text-[#65E5FF] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-[#8175FF] font-medium mb-3">
                  {project.tagline}
                </p>
                <p className="text-sm text-[#A4ADBF] leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1E2638]">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#101522] text-[#A4ADBF] border border-[#1E2638]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
