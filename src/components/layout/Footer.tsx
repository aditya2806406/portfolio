import React from 'react'
import { Heart, Sparkles } from 'lucide-react'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[#1E2638] bg-[#080A10] py-12 text-sm text-[#A4ADBF]">
      <div className="portfolio-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-[#F4F6FC] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#65E5FF] shadow-[0_0_8px_#65E5FF]"></span>
            <span>Aditya Prakash</span>
          </div>
          <p className="text-xs text-[#6B778D]">
            Cinematic 3D Developer Portfolio & Creative Technologist
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#A4ADBF]">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#65E5FF] fill-[#65E5FF]/20" />
          <span>using Three.js, React & Tailwind</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B2A] border border-[#2A364F] text-[#65E5FF]">
            <Sparkles className="w-3 h-3" />
            <span>Phase 1 Architecture Verified</span>
          </span>
          <span className="text-[#6B778D]">© {currentYear}</span>
        </div>
      </div>
    </footer>
  )
}
