import React, { useState, useEffect } from 'react'
import { Menu, X, Terminal, ChevronRight } from 'lucide-react'
import type { NavItem } from '@/types'

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'journey', label: 'Journey', href: '#journey' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Section intersection detection
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id))
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080A10]/85 backdrop-blur-md border-b border-[#1E2638] py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="portfolio-container flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-bold text-lg tracking-tight text-[#F4F6FC] transition-transform duration-200 hover:scale-105"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#151B2A] border border-[#2A364F] group-hover:border-[#65E5FF] transition-colors duration-300 shadow-[0_0_15px_rgba(101,229,255,0.1)]">
            <Terminal className="w-4 h-4 text-[#65E5FF]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-tight">Aditya Prakash</span>
            <span className="text-[10px] font-mono text-[#65E5FF] tracking-wider uppercase mt-0.5">
              3D & Full Stack
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#101522]/70 border border-[#1E2638] rounded-full px-4 py-1.5 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-[#080A10] font-semibold bg-[#65E5FF] shadow-[0_0_15px_rgba(101,229,255,0.35)]'
                    : 'text-[#A4ADBF] hover:text-[#F4F6FC] hover:bg-[#151B2A]'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#151B2A] border border-[#2A364F] text-[#F4F6FC] hover:border-[#65E5FF]/60 hover:shadow-[0_0_15px_rgba(101,229,255,0.2)] transition-all duration-200"
          >
            <span>Let's Talk</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#65E5FF]" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#151B2A] border border-[#2A364F] text-[#F4F6FC] hover:text-[#65E5FF] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080A10]/95 backdrop-blur-xl border-b border-[#1E2638] px-6 py-5 animate-in slide-in-from-top-3">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#65E5FF]/15 text-[#65E5FF] border border-[#65E5FF]/30'
                      : 'text-[#A4ADBF] hover:text-[#F4F6FC] hover:bg-[#151B2A]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
