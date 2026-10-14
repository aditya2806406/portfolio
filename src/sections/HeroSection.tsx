import React from 'react'
import { ArrowDown, Code2, Sparkles, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16"
    >
      <div className="portfolio-container relative z-10 flex flex-col items-center text-center max-w-4xl">
        <div className="mb-6 flex items-center gap-2">
          <Badge variant="cyan" className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#65E5FF]" />
            <span>Interactive 3D Portfolio • Phase 1 Foundation</span>
          </Badge>
        </div>

        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F4F6FC] leading-[1.1] mb-6"
        >
          Architecting <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#65E5FF] via-[#8175FF] to-[#65E5FF] bg-clip-text text-transparent">
            Cinematic Web Realities
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#A4ADBF] max-w-2xl mb-10 leading-relaxed font-normal">
          Hi, I'm <strong className="text-[#F4F6FC] font-semibold">Aditya Prakash</strong>.
          A creative technologist and full-stack software engineer crafting high-performance
          3D digital experiences, scalable backends, and cutting-edge web applications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button asAnchor href="#projects" variant="primary" size="lg">
            <span>Explore Projects</span>
            <Code2 className="w-4 h-4 ml-1" />
          </Button>

          <Button asAnchor href="#contact" variant="secondary" size="lg">
            <span>Get in Touch</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-2 text-xs font-mono text-[#6B778D] mt-8">
          <span>Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-[#65E5FF] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
