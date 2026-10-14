import React, { useEffect } from 'react'
import { SkipToContent } from '@/components/accessibility/SkipToContent'
import { CustomCursor } from '@/components/cursor/CustomCursor'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ExperienceCanvas } from '@/scenes/ExperienceCanvas'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { JourneySection } from '@/sections/JourneySection'
import { ContactSection } from '@/sections/ContactSection'
import { initScrollStory } from '@/animations/scrollStory'

export const App: React.FC = () => {
  useEffect(() => {
    const cleanup = initScrollStory()
    return () => cleanup()
  }, [])

  return (
    <div className="relative min-h-screen bg-[#080A10] text-[#F4F6FC] selection:bg-[#65E5FF]/20 selection:text-[#65E5FF]">
      {/* Global Scroll Progress Indicator */}
      <div
        id="global-scroll-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#65E5FF] via-[#8175FF] to-[#65E5FF] z-50 origin-left scale-x-0 transition-transform duration-75"
      />

      {/* Accessibility Skip Link */}
      <SkipToContent />

      {/* Non-intrusive Custom Cursor on Fine Pointers */}
      <CustomCursor />

      {/* 3D Background Visual Canvas Layer */}
      <ExperienceCanvas />

      {/* Navigation Header */}
      <Navbar />

      {/* Semantic Main Content Shell */}
      <main id="main-content" className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
