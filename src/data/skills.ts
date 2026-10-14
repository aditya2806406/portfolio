import type { SkillCategory } from '@/types'

export const skillsData: SkillCategory[] = [
  {
    title: '3D & Creative Engineering',
    description: 'Immersive spatial computing, shaders, and real-time GPU rendering on the web.',
    skills: [
      { name: 'Three.js', category: '3D', level: 'Advanced' },
      { name: 'React Three Fiber (R3F)', category: '3D', level: 'Advanced' },
      { name: '@react-three/drei', category: '3D', level: 'Advanced' },
      { name: 'GLSL / Shaders', category: '3D', level: 'Proficient' },
      { name: 'WebGL & Postprocessing', category: '3D', level: 'Proficient' },
    ],
  },
  {
    title: 'Modern Frontend & Architecture',
    description: 'Engineering responsive, pixel-perfect, and ultra-fluid interactive web apps.',
    skills: [
      { name: 'React & React 19', category: 'Frontend', level: 'Expert' },
      { name: 'TypeScript', category: 'Frontend', level: 'Expert' },
      { name: 'Vite & Next.js', category: 'Frontend', level: 'Advanced' },
      { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert' },
      { name: 'GSAP & ScrollTrigger', category: 'Animation', level: 'Advanced' },
      { name: 'Framer Motion', category: 'Animation', level: 'Advanced' },
    ],
  },
  {
    title: 'Backend, Systems & AI',
    description: 'Scalable service micro-architectures, API design, and AI tooling.',
    skills: [
      { name: 'Node.js & Express', category: 'Backend', level: 'Advanced' },
      { name: 'REST & GraphQL APIs', category: 'Backend', level: 'Advanced' },
      { name: 'PostgreSQL & Redis', category: 'Data', level: 'Proficient' },
      { name: 'Git & CI/CD Pipelines', category: 'DevOps', level: 'Advanced' },
      { name: 'Docker & Cloud Services', category: 'DevOps', level: 'Proficient' },
    ],
  },
]
