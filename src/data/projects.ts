import type { Project } from '@/types'

export const projectsData: Project[] = [
  {
    id: 'agentguard-security',
    title: 'AgentGuard Security Protocol',
    tagline: 'Autonomous AI Agent Runtime Security & Policy Enforcement',
    description:
      'Enterprise-grade runtime security and policy mediation gateway that evaluates autonomous AI agent tool executions using dynamic risk scoring, ALLOW/BLOCK/REVIEW workflows, audit logging, and live WebSocket telemetry.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.io'],
    category: 'ai-systems',
    demoUrl: '#',
    githubUrl: 'https://github.com/aditya2806406',
    featured: true,
  },
  {
    id: 'supply-chain-analytics',
    title: 'Supply Chain Predictive Analytics',
    tagline: 'End-to-End Operational Intelligence & Shipment Delay Modeling',
    description:
      'Comprehensive data platform encompassing automated ETL, multivariate EDA, route and warehouse bottleneck assessment, and machine learning delay classification delivered via an interactive Streamlit dashboard.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'SQL'],
    category: 'fullstack',
    demoUrl: '#',
    githubUrl: 'https://github.com/aditya2806406',
    featured: true,
  },
  {
    id: 'agriscan-ai',
    title: 'AgriScan Vision Classifier',
    tagline: 'AI-Powered Agricultural Image Classification & Radial Store Locator',
    description:
      'Computer vision classification model with automated image augmentation and evaluation matrices, combined with an interactive map-based radius locator discovering agricultural suppliers.',
    technologies: ['Python', 'Computer Vision', 'PyTorch', 'Scikit-learn', 'NumPy'],
    category: 'ai-systems',
    demoUrl: '#',
    githubUrl: 'https://github.com/aditya2806406',
    featured: true,
  },
  {
    id: 'cinematic-spatial-canvas',
    title: 'Cinematic Spatial Canvas',
    tagline: 'Real-Time 3D WebGL Visualization & Generative Shader Art',
    description:
      'High-performance immersive spatial computing interface featuring procedural metallic geometries, particle atmospheres, custom GLSL lighting, and responsive camera parallax.',
    technologies: ['Three.js', 'React Three Fiber', 'GSAP', 'TypeScript', 'Tailwind CSS'],
    category: 'web3d',
    demoUrl: '#',
    githubUrl: 'https://github.com/aditya2806406',
    featured: false,
  },
]
