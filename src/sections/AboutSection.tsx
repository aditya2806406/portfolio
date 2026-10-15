import React from 'react'
import {
  Compass,
  Database,
  Cpu,
  Layers,
  ShieldCheck,
  Code2,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { EducationCard } from '@/components/about/EducationCard'
import { DevelopmentTimeline } from '@/components/timeline/DevelopmentTimeline'

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-section-heading"
      className="relative py-28 sm:py-36 border-t border-[#1E2638] bg-transparent overflow-hidden"
    >
      {/* Background radial atmosphere enhancement */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full radial-glow-violet opacity-25 blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-0 w-[550px] h-[550px] rounded-full radial-glow-cyan opacity-20 blur-3xl pointer-events-none -z-10"
      />

      <div className="portfolio-container relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-4 mb-16">
          <Badge variant="cyan" className="flex items-center gap-2 px-3 py-1 bg-[#101522]/80 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#65E5FF]" />
            <span className="tracking-widest">ABOUT THE CREATOR // OBSERVATORY 01</span>
          </Badge>

          <h2
            id="about-section-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F4F6FC] tracking-tight leading-[1.08] max-w-3xl"
          >
            Engineering Ideas into{' '}
            <span className="bg-gradient-to-r from-[#65E5FF] via-[#F4F6FC] to-[#8175FF] bg-clip-text text-transparent">
              Intelligent Realities.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#A4ADBF] max-w-2xl leading-relaxed">
            I am a <strong className="text-[#F4F6FC] font-semibold">B.Tech Computer Science and Engineering student specializing in Data Analytics</strong> at{' '}
            <span className="text-[#65E5FF] font-medium">Vellore Institute of Technology (VIT-AP University)</span>, driven by a deep fascination for where scalable software engineering, quantitative data intelligence, and interactive technologies converge.
          </p>
        </div>

        {/* Narrative & Architectural Focus Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#2A364F] space-y-4">
              <h3 className="text-lg font-bold text-[#F4F6FC] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#65E5FF]" />
                <span>The Engineering Philosophy</span>
              </h3>

              <p className="text-sm sm:text-base text-[#A4ADBF] leading-relaxed">
                Modern software challenges require more than isolated code — they demand holistic architectural vision. My work spans the full engineering continuum: from training predictive machine learning models and analyzing complex data pipelines, to engineering high-concurrency Node.js microservices and building immersive, spatial web applications.
              </p>

              <p className="text-sm sm:text-base text-[#A4ADBF] leading-relaxed">
                Whether deploying runtime policy enforcement proxies for autonomous AI agents (AgentGuard), building end-to-end supply chain delay classifiers, or crafting WebGL visualizers, I focus on systems that are robust, maintainable, and profoundly intuitive to experience.
              </p>

              <div className="pt-4 border-t border-[#1E2638] flex flex-wrap items-center gap-4">
                <MagneticButton asAnchor href="#projects">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-[#65E5FF] text-[#080A10] shadow-[0_0_20px_rgba(101,229,255,0.3)] hover:bg-[#8eecff] transition-all">
                    <Code2 className="w-4 h-4" />
                    <span>Explore Projects & Systems</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </MagneticButton>

                <MagneticButton asAnchor href="#skills">
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-xs sm:text-sm bg-[#151B2A] text-[#F4F6FC] border border-[#2A364F] hover:border-[#65E5FF]/60 hover:bg-[#1C2337] transition-all">
                    <span>View Technical Arsenal</span>
                  </span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Core Architectural Disciplines */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            {[
              {
                icon: <Layers className="w-4 h-4 text-[#65E5FF]" />,
                title: 'Full-Stack Development',
                desc: 'Responsive, modular web apps using React 19, TypeScript, Express, and Tailwind CSS.',
                accent: 'border-[#65E5FF]/20',
              },
              {
                icon: <Database className="w-4 h-4 text-[#8175FF]" />,
                title: 'Data Analytics & Visualization',
                desc: 'ETL pipelines, statistical EDA, exploratory dashboards, and SQL data modeling.',
                accent: 'border-[#8175FF]/20',
              },
              {
                icon: <Eye className="w-4 h-4 text-[#65E5FF]" />,
                title: 'Machine Learning & Computer Vision',
                desc: 'Predictive classifiers, image preprocessing, feature engineering, and evaluation.',
                accent: 'border-[#65E5FF]/20',
              },
              {
                icon: <ShieldCheck className="w-4 h-4 text-[#8175FF]" />,
                title: 'Secure Backend Systems',
                desc: 'Runtime policy evaluation, WebSocket telemetric pipelines, PostgreSQL, and Redis caching.',
                accent: 'border-[#8175FF]/20',
              },
              {
                icon: <Cpu className="w-4 h-4 text-[#65E5FF]" />,
                title: 'Interactive Web Experiences',
                desc: 'High-performance WebGL, real-time 3D canvases, and physics-driven micro-interactions.',
                accent: 'border-[#65E5FF]/20',
              },
            ].map((discipline, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border hover:border-[#65E5FF]/50 transition-all duration-300 flex items-start gap-3.5"
              >
                <div className="p-2 rounded-lg bg-[#101522] border border-[#1E2638] shrink-0">
                  {discipline.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#F4F6FC]">{discipline.title}</h4>
                  <p className="text-[11px] sm:text-xs text-[#A4ADBF] leading-relaxed mt-0.5">
                    {discipline.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Academic Foundation Section */}
        <div className="mb-20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#65E5FF]">
                ACADEMIC TRAJECTORY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6FC]">
                Formal Education & University Specialization
              </h3>
            </div>
          </div>

          <EducationCard />
        </div>

        {/* Chronological Personal Development Timeline */}
        <div className="mb-12">
          <div className="mb-6">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#8175FF]">
              CHRONOLOGICAL PROGRESSION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6FC]">
              Personal Development & Project Milestones
            </h3>
            <p className="text-xs sm:text-sm text-[#A4ADBF] mt-1 max-w-2xl">
              Key engineering horizons, research experimentation, and technical leadership milestones.
            </p>
          </div>

          <DevelopmentTimeline />
        </div>
      </div>
    </section>
  )
}
