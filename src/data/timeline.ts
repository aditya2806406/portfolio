export interface DevelopmentMilestone {
  id: string
  phase: string
  title: string
  category: 'foundation' | 'fullstack' | 'data-analytics' | 'machine-learning' | 'ai-security'
  categoryLabel: string
  description: string
  keyLearnings: string[]
  technologies: string[]
  accentColor: 'cyan' | 'violet'
}

export const developmentTimelineData: DevelopmentMilestone[] = [
  {
    id: 'academic-foundation',
    phase: 'Phase 01',
    title: 'Academic Foundation & Core Computing',
    category: 'foundation',
    categoryLabel: 'Academic Foundation',
    description:
      'Pursuing B.Tech Computer Science & Engineering with specialization in Data Analytics at VIT-AP University. Building rigorous foundations in Data Structures & Algorithms, Object-Oriented Programming, and advanced relational database modeling.',
    keyLearnings: [
      'Data Structures and algorithmic complexity analysis in Java & Python',
      'Relational database architecture, normalization, and SQL optimization',
      'Probability, statistical distributions, and quantitative problem solving',
    ],
    technologies: ['Java', 'Python', 'SQL', 'PostgreSQL', 'DSA'],
    accentColor: 'cyan',
  },
  {
    id: 'agriscan-cv',
    phase: 'Phase 02',
    title: 'Computer Vision & Practical AI (AgriScan)',
    category: 'machine-learning',
    categoryLabel: 'Machine Learning & CV',
    description:
      'Engineered an agricultural image classification pipeline featuring multi-class feature extraction, model evaluation, and an interactive spatial radius store locator mapping agricultural supply hubs.',
    keyLearnings: [
      'Image preprocessing, augmentation, and computer vision classification',
      'Hyperparameter tuning and confusion matrix performance evaluation',
      'Geographical radius calculation for location-aware spatial discovery',
    ],
    technologies: ['Python', 'Computer Vision', 'Scikit-learn', 'NumPy'],
    accentColor: 'violet',
  },
  {
    id: 'supply-chain-analytics',
    phase: 'Phase 03',
    title: 'Supply Chain Data Analytics & Predictive Modeling',
    category: 'data-analytics',
    categoryLabel: 'Data Analytics & Modeling',
    description:
      'Engineered an end-to-end data analytics and predictive intelligence platform covering raw data ETL, multivariate EDA, route and warehouse bottleneck identification, and logistics shipment-delay classification.',
    keyLearnings: [
      'Data cleaning, transformation, and automated feature engineering',
      'Logistic regression delay classification and precision-recall scoring',
      'Building interactive, real-time data exploration dashboards in Streamlit',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'SQL'],
    accentColor: 'cyan',
  },
  {
    id: 'agentguard-security',
    phase: 'Phase 04',
    title: 'AI Agent Runtime Security Gateway (AgentGuard)',
    category: 'ai-security',
    categoryLabel: 'AI Systems & Security',
    description:
      'Architected a runtime policy mediation proxy for autonomous AI agents. Evaluates external actions via real-time policy rules, risk scoring engines, and ALLOW / BLOCK / REVIEW workflows backed by audit logging and live WebSocket telemetry.',
    keyLearnings: [
      'Multi-tenant runtime policy evaluation and risk thresholding',
      'Idempotent executor pipelines with transactional Redis state caching',
      'Real-time telemetric event broadcasting via WebSockets and Prisma ORM',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.io'],
    accentColor: 'violet',
  },
  {
    id: 'sih-leadership',
    phase: 'Phase 05',
    title: 'Technical Leadership & Smart India Hackathon',
    category: 'fullstack',
    categoryLabel: 'Collaborative Engineering',
    description:
      'Selected as Team Leader for national-level Smart India Hackathon (SIH), steering cross-functional peer developers through problem statement decomposition, rapid prototyping, and qualifying the preliminary national stage.',
    keyLearnings: [
      'Translating high-level requirements into modular technical architectures',
      'High-velocity collaborative development and git release management under strict constraints',
      'Technical presentation, architectural defense, and project pitching',
    ],
    technologies: ['Full-Stack Prototyping', 'System Design', 'Git', 'Team Leadership'],
    accentColor: 'cyan',
  },
]
