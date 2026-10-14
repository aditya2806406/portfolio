import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowDown, Code2, User, FileDown, Sparkles } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Badge } from '@/components/ui/Badge'
import { ResumeNoticeModal } from '@/components/ui/ResumeNoticeModal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const HeroSection: React.FC = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  // Animation variants conditional on reduced-motion preference
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.15,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="home"
      aria-labelledby="hero-name-heading"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden"
    >
      {/* Background radial atmosphere enhancement */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full radial-glow-cyan pointer-events-none opacity-30 blur-3xl -z-10"
      />

      {/* Top telemetry status bar */}
      <div className="portfolio-container w-full flex items-center justify-between text-[11px] font-mono text-[#6B778D] border-b border-[#1E2638]/50 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65E5FF] shadow-[0_0_8px_#65E5FF] animate-pulse" />
          <span className="text-[#A4ADBF]">SYSTEM // OPERATIONAL</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>LAT 28.6139° N · LON 77.2090° E</span>
          <span className="text-[#65E5FF]/70">DISCIPLINE // CREATIVE COMPUTING</span>
        </div>
      </div>

      {/* Main hero focal composition */}
      <div className="portfolio-container relative z-10 flex flex-col items-center text-center my-auto py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <Badge variant="cyan" className="flex items-center gap-2 px-3 py-1 bg-[#101522]/80 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#65E5FF]" />
              <span className="tracking-widest">CINEMATIC 3D UNIVERSE</span>
            </Badge>
          </motion.div>

          {/* Primary Editorial Name Heading */}
          <motion.h1
            id="hero-name-heading"
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#F4F6FC] leading-[0.95] mb-6 select-none"
          >
            ADITYA{' '}
            <span className="bg-gradient-to-r from-[#65E5FF] via-[#F4F6FC] to-[#8175FF] bg-clip-text text-transparent">
              PRAKASH
            </span>
          </motion.h1>

          {/* Technical Disciplines Subtitle */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-sm sm:text-lg md:text-xl font-mono text-[#65E5FF] tracking-wider uppercase">
              Full-Stack Developer <span className="text-[#8175FF]">·</span> Data Analytics{' '}
              <span className="text-[#8175FF]">·</span> Machine Learning
            </p>
          </motion.div>

          {/* Supporting Copy */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-[#A4ADBF] max-w-2xl mb-10 leading-relaxed font-normal"
          >
            "I build intelligent, interactive digital experiences at the intersection of software engineering, data, and AI."
          </motion.p>

          {/* Primary Actions with Magnetic Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <MagneticButton asAnchor href="#projects">
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#65E5FF] text-[#080A10] shadow-[0_0_25px_rgba(101,229,255,0.3)] hover:shadow-[0_0_35px_rgba(101,229,255,0.55)] hover:bg-[#8eecff] transition-all duration-300">
                <Code2 className="w-4 h-4" />
                <span>Explore Projects</span>
              </span>
            </MagneticButton>

            <MagneticButton asAnchor href="#about">
              <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#151B2A] text-[#F4F6FC] border border-[#2A364F] hover:border-[#65E5FF]/60 hover:bg-[#1C2337] transition-all duration-300 shadow-sm">
                <User className="w-4 h-4 text-[#8175FF]" />
                <span>About Me</span>
              </span>
            </MagneticButton>

            <MagneticButton onClick={() => setResumeModalOpen(true)}>
              <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-[#101522]/80 text-[#A4ADBF] border border-[#1E2638] hover:text-[#F4F6FC] hover:border-[#65E5FF]/40 transition-all duration-300">
                <FileDown className="w-4 h-4 text-[#65E5FF]" />
                <span>Download Resume</span>
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll & Environment Indicator */}
      <div className="portfolio-container w-full flex items-center justify-between text-xs text-[#6B778D] pt-4 border-t border-[#1E2638]/40">
        <div className="hidden sm:block font-mono text-[11px]">
          <span>SCENE // REAL-TIME 3D PERSISTENT CANVASES</span>
        </div>

        <a
          href="#about"
          aria-label="Scroll to about section"
          className="group mx-auto sm:mx-0 flex items-center gap-2 font-mono text-[11px] text-[#A4ADBF] hover:text-[#65E5FF] transition-colors"
        >
          <span>INITIATE DESCENT</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#65E5FF] animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </a>

        <div className="hidden sm:block font-mono text-[11px] text-right">
          <span>PORTFOLIO v2.0 // 2026</span>
        </div>
      </div>

      {/* Resume Document Status Modal */}
      <ResumeNoticeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </section>
  )
}
