import type { Project } from '@/types'

export const projectsData: Project[] = [
  {
    id: 'cinematic-spatial-canvas',
    title: 'Cinematic Spatial Canvas',
    tagline: 'Interactive 3D WebGL Visualization & Generative Shader Art',
    description:
      'A high-performance immersive WebGL visualizer featuring physics-driven particle simulations, custom GLSL shaders, and reactive audio integration.',
    technologies: ['Three.js', 'React Three Fiber', 'GLSL', 'TypeScript', 'WebAudio API'],
    category: 'web3d',
    demoUrl: '#',
    githubUrl: 'https://github.com/adityaprakash',
    featured: true,
  },
  {
    id: 'ai-guard-sentinel',
    title: 'AgentGuard Security Protocol',
    tagline: 'Autonomous AI Policy Enforcement & Verification Gateway',
    description:
      'Enterprise-grade agentic mediation proxy designed to validate, sanitize, and rate-limit multi-modal LLM reasoning pipelines with real-time telemetric monitoring.',
    technologies: ['Node.js', 'TypeScript', 'Docker', 'Redis', 'Tailwind CSS'],
    category: 'ai-systems',
    demoUrl: '#',
    githubUrl: 'https://github.com/adityaprakash',
    featured: true,
  },
  {
    id: 'quantum-neural-dashboard',
    title: 'Neural Ops Orchestrator',
    tagline: 'Real-time Distributed Systems Telemetry Dashboard',
    description:
      'Full-stack observability platform streaming millions of real-time telemetry events per minute with sub-second WebSocket updates and interactive graphs.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'FastAPI'],
    category: 'fullstack',
    demoUrl: '#',
    githubUrl: 'https://github.com/adityaprakash',
    featured: false,
  },
]
