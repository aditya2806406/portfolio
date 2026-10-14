import React from 'react'
import { User, Compass, Cpu, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-28 border-t border-[#1E2638] bg-[#101522]/30"
    >
      <div className="portfolio-container max-w-5xl">
        <div className="flex flex-col items-start gap-4 mb-12">
          <Badge variant="purple" className="flex items-center gap-1.5">
            <User className="w-3 h-3 text-[#8175FF]" />
            <span>01 // About Me</span>
          </Badge>
          <h2 id="about-title" className="text-3xl sm:text-4xl font-extrabold text-[#F4F6FC] tracking-tight">
            Bridging Creative Vision & Engineering Precision
          </h2>
          <p className="text-[#A4ADBF] max-w-2xl text-base leading-relaxed">
            I specialize in the intersection of real-time computer graphics, responsive user interfaces,
            and robust server architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl hover:border-[#65E5FF]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#65E5FF]/10 border border-[#65E5FF]/20 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-[#65E5FF]" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F6FC] mb-2">Spatial Thinking</h3>
            <p className="text-sm text-[#A4ADBF] leading-relaxed">
              Designing immersive 3D interactive canvases with Three.js, shaders, and WebGL that capture attention without sacrificing usability.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover:border-[#8175FF]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#8175FF]/10 border border-[#8175FF]/20 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-[#8175FF]" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F6FC] mb-2">Modern Frontend</h3>
            <p className="text-sm text-[#A4ADBF] leading-relaxed">
              Crafting fast, accessible, and reactive web applications utilizing React 19, TypeScript, Tailwind CSS, and fluid motion choreography.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover:border-[#65E5FF]/50 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#65E5FF]/10 border border-[#65E5FF]/20 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5 text-[#65E5FF]" />
            </div>
            <h3 className="text-lg font-bold text-[#F4F6FC] mb-2">Systems Engineering</h3>
            <p className="text-sm text-[#A4ADBF] leading-relaxed">
              Architecting secure backends, AI middleware, real-time WebSockets, and distributed microservices with reliability at core.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
