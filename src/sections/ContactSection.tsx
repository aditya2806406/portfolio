import React from 'react'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative py-28 border-t border-[#1E2638] bg-[#101522]/30"
    >
      <div className="portfolio-container max-w-4xl text-center flex flex-col items-center">
        <Badge variant="purple" className="flex items-center gap-1.5 mb-6">
          <MessageSquare className="w-3 h-3 text-[#8175FF]" />
          <span>05 // Initiate Contact</span>
        </Badge>

        <h2 id="contact-title" className="text-3xl sm:text-5xl font-extrabold text-[#F4F6FC] tracking-tight mb-6">
          Let's Build Something <br />
          <span className="text-[#65E5FF]">Extraordinary Together</span>
        </h2>

        <p className="text-[#A4ADBF] max-w-xl text-base leading-relaxed mb-10">
          Whether you have an ambitious 3D web concept, full-stack opportunity, or want to discuss
          cutting-edge creative development — my inbox is always open.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button
            asAnchor
            href="mailto:prakashaditya2806@gmail.com"
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Say Hello Directly</span>
            <Send className="w-4 h-4 ml-1" />
          </Button>

          <Button
            asAnchor
            href="https://github.com/aditya2806406"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            size="lg"
            className="flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Profile</span>
          </Button>

          <Button
            asAnchor
            href="https://linkedin.com/in/aditya-prakash-67302a347"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            size="lg"
            className="flex items-center gap-2"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </Button>
        </div>

        <div className="p-4 rounded-lg bg-[#151B2A] border border-[#2A364F] text-xs text-[#A4ADBF] font-mono">
          <span>Patna, Bihar, India • Vellore Institute of Technology (VIT-AP)</span>
        </div>
      </div>
    </section>
  )
}
