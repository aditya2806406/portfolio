import React from 'react'
import { SkipToContent } from '@/components/accessibility/SkipToContent'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ExperienceCanvas } from '@/scenes/ExperienceCanvas'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { JourneySection } from '@/sections/JourneySection'
import { ContactSection } from '@/sections/ContactSection'

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#080A10] text-[#F4F6FC] selection:bg-[#65E5FF]/20 selection:text-[#65E5FF]">
      {/* Accessibility Skip Link */}
      <SkipToContent />

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
