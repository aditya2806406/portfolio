export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'journey' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  category: 'web3d' | 'fullstack' | 'ai-systems' | 'mobile'
  demoUrl?: string
  githubUrl?: string
  featured?: boolean
  imagePlaceholder?: string
}

export interface SkillItem {
  name: string
  category: string
  level?: 'Proficient' | 'Advanced' | 'Expert'
  icon?: string
}

export interface SkillCategory {
  title: string
  description: string
  skills: SkillItem[]
}

export interface JourneyItem {
  id: string
  period: string
  title: string
  organization: string
  location?: string
  description: string
  highlights?: string[]
  type: 'experience' | 'education' | 'milestone'
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialUrl?: string
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  grade?: string
  details?: string[]
}

export type { DevelopmentMilestone } from '@/data/timeline'

