/**
 * FILM LAB PORTFOLIO — DATA MODEL (CENTRAL SOURCE OF TRUTH)
 * All website content lives here. No hardcoded personal content in components.
 * Owner: Aditya Prakash
 */

export const siteData = {
  site: {
    name: 'Aditya Prakash',
    logo: 'AP',
    roleLine: 'Full-Stack Developer · Data Analytics · Machine Learning',
    flashSentence: {
      base: 'Engineering resilient systems at the intersection of full-stack architecture, machine learning models, and data analytics.',
      highlight1: 'full-stack architecture',
      highlight2: 'machine learning models',
    },
    email: 'prakashaditya2806@gmail.com',
    socials: [
      { label: 'GitHub', url: 'https://github.com/aditya2806406' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-prakash-67302a347' },
      { label: 'Résumé', url: '/assets/resume/resume.pdf' },
    ],
    copyright: '© ' + new Date().getFullYear() + ' Aditya Prakash. All rights reserved.',
  },

  projects: [
    {
      id: 'agriscan',
      name: 'AgriScan',
      tagline: 'Crop Disease Detection & Treatment Advisor',
      year: '2024',
      gradient: 'linear-gradient(135deg, #0e2a22 0%, #174d3b 60%, #2fb5b0 100%)',
      tags: ['PyTorch', 'MobileNetV2', 'Grad-CAM', 'Computer Vision', 'Python'],
      description:
        'An AI-powered agricultural pathology diagnostic engine utilizing MobileNetV2 with Grad-CAM visual explainability heatmaps. Classifies plant diseases, generates chemical and organic remediation guidance, and maps nearby agricultural care centers within a spatial radius.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
    },
    {
      id: 'agentguard',
      name: 'AgentGuard',
      tagline: 'Runtime Security for Autonomous AI Agents',
      year: '2024',
      gradient: 'linear-gradient(135deg, #2a1b0e 0%, #4d2b17 60%, #ffb24a 100%)',
      tags: ['TypeScript', 'Node.js', 'Express', 'Redis', 'WebSockets'],
      description:
        'Low-latency runtime security gateway and firewall for autonomous LLM agents. Evaluates deterministic operational policies under 5ms, enforces zero-trust function boundaries, and logs tamper-evident cryptographic SHA-256 audit trails.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
    },
    {
      id: 'sarkarisetu',
      name: 'SarkariSetu',
      tagline: 'Government Scheme Discovery Platform',
      year: '2024',
      gradient: 'linear-gradient(135deg, #10212e 0%, #19374d 60%, #3884b0 100%)',
      tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'REST APIs'],
      description:
        'Smart India Hackathon leadership project delivering an accessible civic platform that demystifies welfare schemes across Indian central and state ministries with multilingual search and multi-factor eligibility evaluation.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
    },
    {
      id: 'supply-chain-analytics',
      name: 'Supply Chain Analytics',
      tagline: 'Logistics Delay & Predictive Intelligence',
      year: '2024',
      gradient: 'linear-gradient(135deg, #1f122e 0%, #3b1d52 60%, #8175ff 100%)',
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'EDA'],
      description:
        'End-to-end data analytics platform evaluating multi-tier enterprise shipping logistics. Identifies systemic carrier bottlenecks, performs multivariate exploratory analysis, and forecasts order delays using classification pipelines.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
    },
  ],

  stats: [
    { value: 4, suffix: '+', label: 'Flagship Systems Built' },
    { value: 28, suffix: '', label: 'Technologies Mastered' },
    { value: 2028, suffix: '', label: 'B.Tech CSE Class (VIT-AP)' },
  ],

  marquee: [
    'MACHINE LEARNING',
    'FULL-STACK ARCHITECTURE',
    'DATA ANALYTICS',
    'DISTRIBUTED SYSTEMS',
    'RUNTIME SECURITY',
    'SPATIAL INTERFACES',
  ],

  about: {
    introLarge:
      'Engineering software architectures and analytical systems with mathematical precision and cinematic care.',
    introNormal:
      'Aditya Prakash is a computer science undergraduate specializing in Data Analytics at VIT-AP University (2024–2028). His focus spans full-stack web applications, machine learning architectures, and low-latency security layers for autonomous agents.',
    contactSheet: [
      { title: 'Diagnostic Vision', subtitle: 'Pathology Detection', gradient: 'linear-gradient(145deg, #0e2a22, #174d3b)' },
      { title: 'Runtime Defense', subtitle: 'Agentic Guardrails', gradient: 'linear-gradient(145deg, #2a1b0e, #4d2b17)' },
      { title: 'Civic Systems', subtitle: 'Scheme Discovery Hub', gradient: 'linear-gradient(145deg, #10212e, #19374d)' },
      { title: 'Data Pipelines', subtitle: 'Predictive Analytics', gradient: 'linear-gradient(145deg, #1f122e, #3b1d52)' },
    ],
    kit: [
      {
        group: 'Core & Languages',
        chips: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML5 / CSS3', 'C++'],
      },
      {
        group: 'Frameworks & Backend',
        chips: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Streamlit', 'Tailwind CSS', 'RESTful APIs', 'WebSockets'],
      },
      {
        group: 'Data, ML & Cloud',
        chips: ['PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'PostgreSQL', 'MongoDB Atlas', 'Redis', 'Git', 'Docker'],
      },
    ],
    bars: [
      { label: 'Full-Stack Development', value: 92 },
      { label: 'Data Analytics & EDA', value: 88 },
      { label: 'Machine Learning & CV', value: 82 },
      { label: 'System Architecture', value: 85 },
    ],
    awards: [
      { year: '2024', title: 'Smart India Hackathon Team Leader', detail: 'Spearheaded SarkariSetu architecture & delivery' },
      { year: '2024', title: 'Hedera Certified Developer Associate', detail: 'Distributed ledger consensus & tokenization' },
      { year: '2024', title: 'Hedera Certified Foundation', detail: 'Hashgraph consensus mechanics & smart contracts' },
      { year: '2024', title: 'Academic Honors', detail: 'VIT-AP University, B.Tech CSE (Data Analytics)' },
    ],
  },

  journey: [
    {
      dateLabel: '2024 — 2028',
      title: 'VIT-AP University — B.Tech CSE (Data Analytics)',
      text: 'Building rigorous computer science foundations in data structures, algorithms, relational systems, probability, and distributed computing in Amaravati, India.',
    },
    {
      dateLabel: '2024',
      title: 'SarkariSetu & SIH Leadership',
      text: 'Led the development of SarkariSetu for the Smart India Hackathon, architecting an accessible multi-lingual platform for central and state citizen welfare schemes.',
    },
    {
      dateLabel: '2024',
      title: 'AgriScan & Deep Learning Research',
      text: 'Constructed deep convolutional transfer learning models using MobileNetV2 and Grad-CAM interpretability for automated plant disease diagnosis and remediation.',
    },
    {
      dateLabel: '2024',
      title: 'AgentGuard & Hedera Certifications',
      text: 'Engineered sub-5ms policy enforcement proxies for autonomous AI agents and attained Hedera Certified Developer Associate and Certified Foundation credentials.',
    },
  ],

  portrait: {
    src: '/assets/portrait/portrait.jpg',
    alt: 'Aditya Prakash — Portrait',
  },

  certificates: [
    {
      title: 'Hedera Certified Developer Associate (HCDA)',
      issuer: 'Hedera / Hashgraph',
      year: '2024',
      type: 'pdf',
      file: '/assets/certificates/Hedera_Certified_Developer_Associate.pdf',
    },
    {
      title: 'Hedera Certified Foundation (HCF)',
      issuer: 'Hedera / Hashgraph',
      year: '2024',
      type: 'pdf',
      file: '/assets/certificates/Hedera_Certified_Foundation.pdf',
    },
  ],

  resume: {
    file: '/assets/resume/resume.pdf',
    label: 'Aditya_Prakash_Resume.pdf',
  },
};
