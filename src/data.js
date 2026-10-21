
export const siteData = {
  site: {
    name: 'Aditya Prakash',
    logo: 'AP',
    roleLine: 'Full-Stack Developer · Data Analytics · AI & Software Development',
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
      tagline: 'Crop Disease Classification & Treatment Guidance',
      category: 'COMPUTER VISION',
      filterCategory: 'cv',
      year: '2024',
      gradient: 'linear-gradient(135deg, #0e2a22 0%, #174d3b 60%, #2fb5b0 100%)',
      tags: ['PyTorch', 'MobileNetV2', 'Grad-CAM', 'Computer Vision', 'Python'],
      description:
        'An agricultural foliar pathology classification prototype utilizing MobileNetV2 with Grad-CAM visual explainability heatmaps. Classifies plant leaf condition categories, provides informational treatment guidance, and maps nearby agricultural supply retailers.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'agriscan',
        title: 'AgriScan',
        tagline: 'Crop Disease Classification & Treatment Guidance',
        category: 'COMPUTER VISION',
        year: '2024',
        tags: ['PyTorch', 'MobileNetV2', 'Grad-CAM', 'Computer Vision', 'Python'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'AgriScan is an agricultural foliar pathology classification prototype designed to identify plant leaf conditions and provide informational treatment guidance. By fine-tuning a lightweight MobileNetV2 convolutional neural network on plant disease imagery and integrating gradient-based class activation mapping (Grad-CAM), the application delivers qualitative visual saliency heatmaps alongside classification confidence scores. The system couples model predictions with informational organic and chemical management notes and an OpenStreetMap-based store locator.',
        problemStatement:
          'Foliar crop infections represent a primary cause of avoidable yield losses for farming communities. Conventional pathology diagnostics require physical laboratory inspection or agronomist visits, often resulting in diagnostic delays. In the interim, misdiagnoses can lead to improper chemical application, escalating input costs and failing to mitigate disease spread. An accessible computer vision workflow offers an initial screening tool to aid early detection.',
        goals: [
          'Implement a lightweight convolutional neural network using MobileNetV2 for efficient foliar disease classification.',
          'Provide visual interpretability via Grad-CAM saliency heatmaps to show which image regions influenced model class scores.',
          'Provide structured dual-track treatment guidance detailing bio-organic cultural practices and common chemical active ingredients.',
          'Integrate an OpenStreetMap-based store locator to assist users in finding nearby agricultural supply stores within 5 km, 10 km, or 25 km radii.',
        ],
        architecture: {
          summary:
            'The AgriScan architecture executes a computer vision and guidance pipeline: foliage image ingestion, tensor standardization (224×224) with ImageNet normalization, convolutional feature extraction via MobileNetV2, Grad-CAM saliency backpropagation, and lookup of associated treatment guidance and nearby retail locations.',
          components: [
            {
              name: 'Specimen Capture & Preprocessing',
              role: 'Foliar Image Normalization',
              details: 'Resizes raw RGB photographic specimens to 224×224 tensors, normalizes channel distributions using ImageNet statistical constants, and formats tensors for PyTorch inference pass.',
            },
            {
              name: 'MobileNetV2 Feature Backbone',
              role: 'Deep Convolutional Classifier',
              details: 'Employs inverted residual blocks with linear bottlenecks to extract spatial feature representations with comparatively low parameter overhead.',
            },
            {
              name: 'Grad-CAM Saliency Engine',
              role: 'Visual Model Explainability',
              details: 'Computes gradients of the target class score with respect to final convolutional layer feature maps, producing 2D activation heatmaps composited onto the leaf image.',
            },
            {
              name: 'Pathology & Treatment Catalog',
              role: 'Dual Guidance Knowledge Base',
              details: 'Maps predicted disease categories to informational treatment recommendations, contrasting bio-organic management techniques with standard chemical controls.',
            },
            {
              name: 'Geospatial Store Locator',
              role: 'Proximity Retail Mapping',
              details: 'Queries OpenStreetMap data to locate nearby agricultural supply stores and input retailers based on user coordinates.',
            },
          ],
        },
        techStack: [
          {
            tech: 'PyTorch',
            role: 'Deep Learning & Gradient Computation',
            rationale: 'Provided dynamic computational graphs essential for computing backwards gradients through convolutional feature maps for Grad-CAM saliency generation.',
          },
          {
            tech: 'MobileNetV2',
            role: 'Lightweight Convolutional Backbone',
            rationale: 'Inverted residual bottlenecks and depthwise separable convolutions reduced parameter count and theoretical computational complexity compared to deeper convolutional architectures like ResNet-50.',
          },
          {
            tech: 'Grad-CAM',
            role: 'Explainable AI (XAI) Visualization',
            rationale: 'Produces coarse 2D saliency maps highlighting the discriminative leaf regions influencing classification, aiding qualitative inspection of model attention.',
          },
          {
            tech: 'Computer Vision (OpenCV / PIL)',
            role: 'Image Preprocessing & Thermal Blending',
            rationale: 'Handled tensor conversions, alpha-compositing of Jet thermal heatmaps over RGB leaves, and managed image orientations.',
          },
          {
            tech: 'Python',
            role: 'Core Runtime & Pipeline Orchestration',
            rationale: 'Unified scientific computing libraries, neural network runtimes, and algorithmic remediation lookups into a cohesive execution pipeline.',
          },
        ],
        keyFeatures: [
          {
            title: 'Foliar Pathology Classification',
            desc: 'Predicts disease categories across crop foliage classes using a fine-tuned MobileNetV2 model.',
          },
          {
            title: 'Grad-CAM Attention Heatmaps',
            desc: 'Generates thermal gradient overlays to visually inspect which leaf regions influenced the model classification.',
          },
          {
            title: 'Dual-Track Treatment Guidance',
            desc: 'Outlines informational bio-organic management practices and chemical options for identified conditions.',
          },
          {
            title: 'Nearby Supply Store Locator',
            desc: 'Identifies agricultural supply retailers within configurable distance radii (5 km, 10 km, 25 km) via map data.',
          },
        ],
        implementationDetails: [
          {
            title: 'Convolutional Feature Extraction & Inverted Residuals',
            desc: 'The model architecture adapts MobileNetV2 pretrained on ImageNet, fine-tuned on the PlantVillage dataset across 38 crop disease and healthy foliage classes. Uses depthwise separable convolutions to reduce model parameters while retaining spatial representations.',
          },
          {
            title: 'Grad-CAM Heatmap Calculation',
            desc: 'To calculate visual importance weights, the gradient of the predicted class score yc is computed with respect to activation feature maps Ak of the final convolutional layer: alpha_k = (1/Z) * sum(sum(dyc / dAk)). The visual localization map is obtained via rectified linear combination: L_GradCAM = ReLU(sum(alpha_k * Ak)).',
          },
          {
            title: 'Structured Treatment Knowledge Base',
            desc: 'Remediation guidance is cataloged in a structured format pairing identified disease classes with informational botanical remedies (e.g., neem oil sprays, Trichoderma bio-agents) alongside common chemical active ingredients, general dosage cautions, and cultural sanitation practices.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Image Ingestion', desc: 'User photographs or uploads symptomatic foliage specimen via the web interface.' },
          { step: '02', title: 'Tensor Preprocessing', desc: 'Image is scaled to 224×224 pixels, converted to PyTorch tensor, and normalized via channel-wise statistics.' },
          { step: '03', title: 'Forward Inference Pass', desc: 'MobileNetV2 processes the input through depthwise convolutions, outputting class probability distributions.' },
          { step: '04', title: 'Backwards Gradient Extraction', desc: 'Gradients flow back to the final convolutional feature layer to compute spatial neuron importance.' },
          { step: '05', title: 'Heatmap Composition', desc: 'Grad-CAM map is interpolated, colormapped with Jet spectrum, and alpha-blended with the original photograph.' },
          { step: '06', title: 'Diagnostic Delivery', desc: 'Classification label, confidence score, visual explainability overlay, and treatment guidance render to the user.' },
        ],
        challenges: [
          {
            challenge: 'Background Artifacts in Laboratory Datasets',
            decision: 'In initial experimentation, model attention heatmaps occasionally highlighted background cards or surface edges rather than foliar lesions. Addressed this by incorporating data augmentation (random cropping, rotations, color jitter, and lighting variations) to encourage the network to focus on foliar patterns.',
          },
          {
            challenge: 'Balancing Model Complexity for Local Deployment',
            decision: 'Selected MobileNetV2 with depthwise separable convolutions rather than heavier architectures like ResNet-50 to reduce parameter count and theoretical computational complexity.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Demonstrated multi-class foliar pathology classification across 38 PlantVillage condition classes using a fine-tuned MobileNetV2 model.',
            'Integrated Grad-CAM thermal overlays providing visual inspection of image regions influencing predicted class scores.',
            'Structured dual-track informational treatment guidance into bio-organic management notes and common chemical active options.',
            'Implemented interactive OpenStreetMap store locator supporting 5 km, 10 km, and 25 km search radii.',
          ],
          limitations: [
            'Predictions and treatment notes are for informational exploration only and do not replace professional agronomist diagnosis or localized laboratory testing.',
            'Model is trained on single-leaf laboratory images (PlantVillage); performance on crowded in-field canopies, multiple overlapping leaves, or complex outdoor lighting has not been independently benchmarked.',
            'Store locator identifies general agricultural supply retailers from open map data, not certified extension officers or accredited testing centers.',
            'Map lookup requires active internet connectivity for tile and Nominatim API queries.',
          ],
        },
        futureImprovements: [
          'Evaluation and fine-tuning on diverse, in-field photographic datasets captured under direct sunlight and variable weather.',
          'Quantized INT8 ONNX export for client-side, fully offline mobile browser inference.',
          'Integration of expert-verified regional treatment databases calibrated to local pesticide regulations and crop varieties.',
        ],
      },
    },
    {
      id: 'agentguard',
      name: 'AgentGuard',
      tagline: 'Policy-Based Runtime Gateway for AI Agent Tool Calls',
      category: 'AI AGENTS & SECURITY',
      filterCategory: 'ai-agents',
      year: '2024',
      gradient: 'linear-gradient(135deg, #2a1b0e 0%, #4d2b17 60%, #ffb24a 100%)',
      tags: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
      description:
        'Policy evaluation gateway and parameter validation service for autonomous AI agent tool execution. Intercepts structured action payloads (demonstrated on Gmail integration), enforces declarative parameter boundary rules, and records structured audit logs in PostgreSQL.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'agentguard',
        title: 'AgentGuard',
        tagline: 'Policy-Based Runtime Gateway for AI Agent Tool Calls',
        category: 'AI AGENTS & SECURITY',
        year: '2024',
        tags: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'AgentGuard is a policy evaluation gateway and parameter validation prototype for autonomous AI agents. Positioned between agent planning runtimes and external execution adapters, AgentGuard intercepts proposed action payloads, evaluates arguments against declarative policy rules, and records structured audit logs in PostgreSQL. The current working implementation centers on Gmail execution workflows, enforcing configurable recipient, subject, and body boundaries with idempotency controls prior to message dispatch.',
        problemStatement:
          'Autonomous LLM agents with tool execution access introduce operational and security risks: unintended actions, unauthorized external communications, hallucinated tool calls, and goal divergence. When agents can execute external tools without out-of-band policy checks, a misaligned prompt or malformed reasoning loop can trigger irreversible operations. AgentGuard introduces a deterministic policy validation layer to evaluate proposed tool calls against explicit administrative rules before external execution.',
        goals: [
          'Intercept agent tool execution requests through a centralized policy gateway prior to downstream API invocation.',
          'Enforce declarative policy rules checking tool permissions, recipient domain whitelists, and argument parameters.',
          'Implement verified external tool execution with OAuth authentication, validated on Gmail email dispatch with idempotency keys.',
          'Record persistent, structured audit logs of every proposed tool call, parameters, and policy verdict for post-execution review.',
          'Provide safe error feedback to the agent runtime upon policy denial without crashing the host process.',
        ],
        architecture: {
          summary:
            'The AgentGuard architecture operates as an intercepting gateway: the agent runtime submits proposed tool calls, the policy engine validates bearer tokens and checks arguments against declarative rules stored in PostgreSQL via Prisma, approved calls execute through tool adapters (such as the verified Gmail OAuth integration), and verdicts are committed to structured audit logs.',
          components: [
            {
              name: 'Gateway Interception Middleware',
              role: 'Pre-Execution Tool Interception',
              details: 'Receives tool execution payloads from agent runtimes, verifies authorization tokens, and halts execution pending policy evaluation.',
            },
            {
              name: 'Declarative Policy Evaluator',
              role: 'Deterministic Rule Engine',
              details: 'Evaluates action parameters against configured rule sets (such as allowed recipient domains, banned keywords, and argument types).',
            },
            {
              name: 'Tool Adapter & Execution Dispatch',
              role: 'Downstream Service Integration',
              details: 'Connects approved actions to downstream services, with verified end-to-end OAuth execution and idempotency tracking implemented for Gmail.',
            },
            {
              name: 'Structured Audit Logger',
              role: 'Relational Event Persistence',
              details: 'Commits persistent audit entries to PostgreSQL via Prisma, recording timestamp, agent ID, tool name, argument summary, and policy verdict.',
            },
            {
              name: 'Policy Error Handler',
              role: 'Safe Failure Feedback',
              details: 'Constructs structured JSON error responses explaining policy breaches, allowing agent planning loops to handle denials cleanly without server crashes.',
            },
          ],
        },
        techStack: [
          {
            tech: 'TypeScript',
            role: 'Strict Type Contracts & Safety',
            rationale: 'Enforced compile-time type verification across agent tool definitions, policy rule schemas, and structured database payloads.',
          },
          {
            tech: 'Node.js & Express',
            role: 'Asynchronous API Runtime',
            rationale: 'Provided an event-driven HTTP server architecture hosting gateway endpoints and policy evaluation middleware.',
          },
          {
            tech: 'PostgreSQL & Prisma',
            role: 'Relational Database & ORM',
            rationale: 'Managed persistent declarative policy definitions, agent registration profiles, and sequential audit trail records.',
          },
          {
            tech: 'OAuth 2.0 (Google APIs)',
            role: 'Secure Tool Credential Handling',
            rationale: 'Handled user authorization, token refreshing, and authenticated API access for verified Gmail tool execution.',
          },
        ],
        keyFeatures: [
          {
            title: 'Pre-Execution Tool Interception',
            desc: 'Validates agent action arguments before any external API request is dispatched.',
          },
          {
            title: 'Declarative Policy Enforcement',
            desc: 'Evaluates tool requests against configurable rules including recipient whitelists, parameter boundaries, and disallowed patterns.',
          },
          {
            title: 'Verified Gmail Integration',
            desc: 'Fully implemented action execution supporting email dispatch and drafting with OAuth 2.0 authentication and idempotency keys.',
          },
          {
            title: 'Structured Audit Logging',
            desc: 'Stores timestamped logs of all evaluated actions, payload summaries, and ALLOW/DENY verdicts.',
          },
          {
            title: 'Structured Rejection Feedback',
            desc: 'Returns standard error codes and policy rationale to allow the agent to re-plan safely without leaking system secrets.',
          },
        ],
        implementationDetails: [
          {
            title: 'Policy Schema & Evaluation Engine',
            desc: 'Declarative policies define allowed tools, parameter boundaries, and string regex constraints. When an agent requests a tool call, the evaluator checks if the tool is permitted for that agent role and verifies all arguments against parameter rules before returning an ALLOW or BLOCK decision.',
          },
          {
            title: 'Gmail Tool Execution with Idempotency',
            desc: 'Implemented tool adapter for the Gmail API using OAuth 2.0. To prevent duplicate sends from agent retries, the execution workflow requires and checks an idempotency key before dispatching the message.',
          },
          {
            title: 'Structured Audit Trail',
            desc: 'Every evaluation generates a database record via Prisma containing timestamp, agent session ID, requested tool, argument snapshot, decision verdict, and denial reason if blocked.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Action Submission', desc: 'Agent runtime submits proposed tool-call payload (e.g., sendEmail) to the AgentGuard endpoint.' },
          { step: '02', title: 'Authentication & Schema Validation', desc: 'Gateway checks bearer token and verifies request structure against expected parameter schemas.' },
          { step: '03', title: 'Policy Evaluation', desc: 'Evaluator queries active policies for the agent and checks arguments against permission rules and boundaries.' },
          { step: '04', title: 'Decision Synthesis', desc: 'If any rule is violated, an HTTP 403 response with structured policy denial details is returned to the agent.' },
          { step: '05', title: 'Downstream Execution', desc: 'For approved actions, the adapter dispatches the request to the external API (e.g., Gmail API) using stored credentials.' },
          { step: '06', title: 'Audit Logging', desc: 'Action metadata, parameters, execution outcome, and verdict are recorded in the PostgreSQL audit log.' },
        ],
        challenges: [
          {
            challenge: 'Safe Handling of Agent Denials',
            decision: 'Hard exceptions or HTTP crashes cause agent reasoning loops to fail unpredictably. Implemented structured JSON error payloads that clearly describe the policy violation without revealing internal server credentials, allowing the LLM to understand why the action was disallowed and adjust its plan.',
          },
          {
            challenge: 'Preventing Duplicate Actions in Agent Loops',
            decision: 'LLM retries during slow network responses can trigger repeated external actions. Implemented idempotency key checks in the execution workflow to guarantee that retransmitted requests do not result in duplicate emails.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Functional policy evaluation gateway intercepting and validating agent tool calls.',
            'Implemented and verified Gmail OAuth tool execution workflow with idempotency protection and policy gating.',
            'Configurable declarative policy rules enforcing recipient whitelisting and parameter constraints.',
            'Persistent audit logging in PostgreSQL recording all evaluated requests and verdicts.',
          ],
          limitations: [
            'Current verified integration focuses on Gmail action execution; universal interception for arbitrary shell runners, arbitrary database queries, and generic filesystem operations is not implemented.',
            'Evaluates syntactic rules, schema types, and regex pattern constraints; does not provide a semantic natural language defense against sophisticated indirect prompt injection.',
            'Latency depends on database connection and network overhead; has not been benchmarked under high-concurrency production workloads.',
            'Requires manual upfront authoring of policy definitions by administrators.',
          ],
        },
        futureImprovements: [
          'Expansion of tool adapters to support additional external APIs (Slack, GitHub, issue trackers) and sandbox execution environments.',
          'Integration of semantic text classification models to evaluate natural language arguments for prompt injection patterns.',
          'Caching layer (e.g., Redis) for high-throughput policy lookups in high-frequency multi-agent environments.',
          'Cryptographically verifiable tamper-evident log chaining and automated audit export routines.',
        ],
      },
    },
    {
      id: 'sarkarisetu',
      name: 'SarkariSetu',
      tagline: 'Government Scheme Discovery & Eligibility Platform',
      category: 'FULL-STACK WEB',
      filterCategory: 'fullstack',
      year: '2024',
      gradient: 'linear-gradient(135deg, #10212e 0%, #19374d 60%, #3884b0 100%)',
      tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'REST APIs'],
      description:
        'Civic technology prototype developed for the Smart India Hackathon to simplify welfare scheme discovery across Indian central and state initiatives, featuring demographic eligibility estimation and documentation roadmaps.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'sarkarisetu',
        title: 'SarkariSetu',
        tagline: 'Government Scheme Discovery & Eligibility Platform',
        category: 'FULL-STACK WEB',
        year: '2024',
        tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'REST APIs'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'SarkariSetu is an accessible civic technology prototype developed for the Smart India Hackathon (SIH) to help citizens discover relevant Indian government welfare initiatives. Featuring a guided demographic questionnaire, the platform evaluates user attributes (such as age, gender, occupation, income tier, and state) against a curated database of central and state schemes to estimate potential eligibility and provide informational documentation roadmaps.',
        problemStatement:
          'Government welfare and subsidy programs span agriculture, education, healthcare, and small enterprise support, yet information is frequently fragmented across diverse ministerial portals filled with dense bureaucratic terminology. As a result, eligible citizens often remain unaware of available assistance or struggle to identify required documentation. SarkariSetu addresses this discovery gap with an intuitive, centralized exploration tool.',
        goals: [
          'Consolidate welfare scheme records across key sectors into a structured, searchable MongoDB database.',
          'Build an interactive demographic questionnaire to estimate scheme eligibility based on user-entered criteria (age, income, category, state).',
          'Deliver an accessible, high-contrast, mobile-friendly interface tailored for users with varying levels of digital literacy.',
          'Provide informational documentation checklists and direct links to official departmental application portals.',
        ],
        architecture: {
          summary:
            'SarkariSetu uses a full-stack architecture: a React client application featuring a step-by-step questionnaire wizard, an Express REST API backend handling filtering and evaluation logic, and a MongoDB Atlas document store containing structured scheme criteria and informational metadata.',
          components: [
            {
              name: 'Citizen Web Client',
              role: 'Accessible Interface Wizard',
              details: 'Renders dynamic questionnaire wizards, category exploration filters, search input, and personalized scheme summary cards.',
            },
            {
              name: 'REST API & Gateway',
              role: 'Node.js & Express Routing',
              details: 'Handles scheme querying, parameter sanitization, state-based aggregation pipelines, and citizen demographic payload validation.',
            },
            {
              name: 'Eligibility Evaluation Service',
              role: 'Rule-Matching Logic',
              details: 'Compares submitted demographic parameters against threshold criteria (age brackets, income ceilings, target categories, state applicability) to estimate potential matches.',
            },
            {
              name: 'Scheme Catalog Store',
              role: 'MongoDB Document Database',
              details: 'Stores normalized scheme definitions, ministerial classifications, documentation checklists, and application reference links.',
            },
            {
              name: 'Documentation Guidance Module',
              role: 'Informational Application Roadmaps',
              details: 'Assembles prerequisites, required certificates (income, category, residency), and official portal links into step-by-step citizen guides.',
            },
          ],
        },
        techStack: [
          {
            tech: 'React',
            role: 'Modular Component Frontend',
            rationale: 'Enabled responsive, multi-step interactive eligibility questionnaires with stateful client-side form validation and fluid navigation.',
          },
          {
            tech: 'Node.js & Express',
            role: 'RESTful Backend Service',
            rationale: 'Provided an asynchronous API architecture coordinating request handling, database queries, and demographic filtering logic.',
          },
          {
            tech: 'MongoDB Atlas',
            role: 'Document Database',
            rationale: 'Accommodated heterogeneous eligibility criteria across differing ministries without requiring brittle, heavily normalized relational schemas.',
          },
          {
            tech: 'REST APIs',
            role: 'Decoupled Client-Server Communication',
            rationale: 'Ensured clean separation of concerns, standardized HTTP response structures, and facilitated client-server data flow.',
          },
        ],
        keyFeatures: [
          {
            title: 'Demographic Eligibility Estimation',
            desc: 'Citizens answer a concise, guided demographic questionnaire to discover which central and state schemes they may potentially qualify for.',
          },
          {
            title: 'Sectoral Categorization',
            desc: 'Organizes programs into intuitive domains: Agriculture & Farming, Education & Scholarships, Healthcare, and Social Welfare.',
          },
          {
            title: 'Informational Document Checklists',
            desc: 'Displays the standard identity, income, and educational certificates typically needed prior to submitting an official application.',
          },
          {
            title: 'State & Central Unified Search',
            desc: 'Enables filtered discovery by geographical jurisdiction, allowing citizens to explore national central programs alongside regional state initiatives.',
          },
        ],
        implementationDetails: [
          {
            title: 'Flexible Scheme Criteria Modeling',
            desc: 'In MongoDB, scheme documents embed structured eligibility objects: { minAge, maxAge, allowedGenders, maxAnnualIncome, eligibleOccupations, eligibleCategories, applicableStates }. This schema accommodates diverse eligibility conditions across welfare initiatives.',
          },
          {
            title: 'Rule-Based Evaluation Flow',
            desc: 'The server evaluates submitted demographic parameters through sequential boundary checks, filtering out schemes where user attributes fall outside defined age limits, income ceilings, or state jurisdictions, returning matching records.',
          },
          {
            title: 'Accessible Mobile Interface',
            desc: 'Designed with high-contrast text, clear typography, large touch targets, and step-by-step navigation to accommodate mobile browsing.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Demographic Input', desc: 'Citizen selects state, age group, income range, category, and occupation in the guided form.' },
          { step: '02', title: 'API Dispatch', desc: 'React client sends user demographic payload to the Express REST endpoint.' },
          { step: '03', title: 'Database Query', desc: 'MongoDB query fetches scheme records matching the user state jurisdiction and central programs.' },
          { step: '04', title: 'Criteria Evaluation', desc: 'Evaluation service checks user attributes against scheme threshold criteria to identify potential matches.' },
          { step: '05', title: 'Result Formatting', desc: 'Matching schemes are assembled with benefit descriptions and informational document lists.' },
          { step: '06', title: 'Client Presentation', desc: 'Interface displays matched scheme cards with eligibility rationale and links to official government portals.' },
        ],
        challenges: [
          {
            challenge: 'Standardizing Non-Uniform Eligibility Criteria',
            decision: 'Government departments describe requirements using different terminology and formats. Designed a normalized criteria schema to represent common conditions (age, income, residency, social category) consistently for algorithmic matching.',
          },
          {
            challenge: 'Hackathon Prototyping Constraints',
            decision: 'Prioritized core eligibility matching and responsive form usability under hackathon development timelines, focusing on an intuitive user flow rather than incomplete complex features.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Developed a functional scheme discovery platform prototype created for the Smart India Hackathon.',
            'Implemented demographic filtering evaluating age, income, category, and jurisdiction criteria.',
            'Curated initial seed database of central and state welfare initiatives across key welfare sectors.',
            'Structured informational checklists of required documentation alongside links to official portals.',
          ],
          limitations: [
            'SarkariSetu is an independent student prototype and is not officially affiliated with or endorsed by any government ministry or agency.',
            'Evaluates estimated eligibility based on available criteria; does not guarantee benefit sanctioning, which remains subject to official departmental verification.',
            'The database contains a curated seed collection of schemes and is not an exhaustive or live repository of all active government programs.',
            'External links and scheme guidelines are informational; citizens must complete formal applications directly on official government portals.',
          ],
        },
        futureImprovements: [
          'Automated administrative data pipelines to monitor official government notifications and update scheme records dynamically.',
          'Multilingual localization supporting regional Indian languages and audio-guided conversational interfaces.',
          'Progressive Web App (PWA) offline caching for rural areas with intermittent internet access.',
        ],
      },
    },
    {
      id: 'supply-chain-analytics',
      name: 'Supply Chain Analytics',
      tagline: 'Logistics Delay & Exploratory Data Intelligence',
      category: 'DATA ANALYTICS',
      filterCategory: 'analytics',
      year: '2024',
      gradient: 'linear-gradient(135deg, #1f122e 0%, #3b1d52 60%, #8175ff 100%)',
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'EDA'],
      description:
        'End-to-end data analytics and exploratory dashboard built with Python, Pandas, and Streamlit. Evaluates historical logistics shipment data to isolate carrier delay patterns, correlate transit attributes, and model delivery risk.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'supply-chain-analytics',
        title: 'Supply Chain Analytics',
        tagline: 'Logistics Delay & Exploratory Data Intelligence',
        category: 'DATA ANALYTICS',
        year: '2024',
        tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'EDA'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'Supply Chain Analytics is an exploratory data analysis (EDA) and predictive modeling project examining historical logistics shipment records to identify factors associated with delivery delays. Built with Python, Pandas, and Streamlit, the application analyzes historical shipping manifests across transportation modes, geographic routes, and customer segments. It combines interactive visualizations with Scikit-Learn classification pipelines to evaluate shipment delay propensity based on scheduling and order attributes.',
        problemStatement:
          'Shipping delays in logistics operations disrupt fulfillment timelines, increase operational costs, and impact customer satisfaction. Logistics teams frequently review delayed shipments retrospectively rather than understanding underlying patterns. By analyzing historical delivery data, organizations can identify corridor congestion, evaluate shipping mode reliability, and explore predictive modeling to estimate late delivery risk.',
        goals: [
          'Ingest, clean, and standardize historical logistics shipping records, resolving missing values and formatting inconsistencies.',
          'Conduct multivariate exploratory data analysis to examine relationships between shipping modes, geographic corridors, and delivery latency.',
          'Develop and evaluate Scikit-Learn classification pipelines to model late delivery risk using order attributes available at scheduling.',
          'Build an interactive Streamlit dashboard allowing users to filter routes, inspect delay distributions, and simulate order risk scenarios.',
        ],
        architecture: {
          summary:
            'The platform consists of a modular analytical workflow: historical logistics data ingestion and cleaning via Pandas and NumPy, feature engineering of scheduled transit and corridor variables, supervised classification modeling in Scikit-Learn, and an interactive exploration dashboard built in Streamlit.',
          components: [
            {
              name: 'Data Cleaning & Preparation Pipeline',
              role: 'Data Wrangling & Audit',
              details: 'Loads historical shipping records, audits null values, standardizes datetime columns, and filters inconsistent records.',
            },
            {
              name: 'Exploratory Data Analysis (EDA) Module',
              role: 'Statistical Discovery & Correlation',
              details: 'Calculates summary statistics, transit duration distributions, and cross-tabulates delay frequency across shipping modes and regions.',
            },
            {
              name: 'Feature Engineering Module',
              role: 'Predictive Feature Construction',
              details: 'Derives scheduled transit day features, customer segment attributes, and encodes categorical origin-destination geographic corridors.',
            },
            {
              name: 'Predictive Classification Pipeline',
              role: 'Scikit-Learn Risk Classifier',
              details: 'Constructs Scikit-Learn pipelines combining preprocessing (StandardScaler, OneHotEncoder) with classification algorithms to model delay probability.',
            },
            {
              name: 'Interactive Streamlit Dashboard',
              role: 'Operations UI & Simulation',
              details: 'Provides interactive filter widgets, distribution plots, correlation views, and scenario exploration tools.',
            },
          ],
        },
        techStack: [
          {
            tech: 'Python',
            role: 'Data Engineering & Modeling Language',
            rationale: 'Provided a comprehensive ecosystem connecting tabular manipulation, statistical analysis, machine learning algorithms, and dashboard tools.',
          },
          {
            tech: 'Pandas & NumPy',
            role: 'Tabular Data Manipulation',
            rationale: 'Supplied high-performance data structures for indexing, aggregating, datetime parsing, and cleaning shipment records.',
          },
          {
            tech: 'Scikit-Learn',
            role: 'Machine Learning Classification',
            rationale: 'Offered modular pipeline architectures combining StandardScaler, OneHotEncoder, and classification models.',
          },
          {
            tech: 'Streamlit',
            role: 'Interactive Web Dashboard',
            rationale: 'Allowed rapid conversion of Python analytical workflows into responsive, reactive operational dashboards without complex frontend boilerplate.',
          },
          {
            tech: 'Exploratory Data Analysis (EDA)',
            role: 'Statistical Hypothesis Generation',
            rationale: 'Identified operational correlations between specific shipping modes, carrier routes, and delivery delay occurrences.',
          },
        ],
        keyFeatures: [
          {
            title: 'Shipping Mode & Corridor Exploration',
            desc: 'Interactive filtering of delivery performance across First Class, Same Day, Second Class, and Standard Class transport tiers.',
          },
          {
            title: 'Predictive Delay Modeling',
            desc: 'Scikit-Learn classification model estimating the likelihood of a shipment being delayed based on route and order parameters.',
          },
          {
            title: 'Transit Duration & Risk Visualizations',
            desc: 'Displays distribution of transit times, on-time rates, and comparative delay frequencies across geographic regions.',
          },
          {
            title: 'Interactive Scenario Exploration',
            desc: 'Streamlit controls allowing users to select shipping parameters to observe modeled delay risk outputs.',
          },
        ],
        implementationDetails: [
          {
            title: 'Data Preparation & Audit',
            desc: 'Audited historical logistics shipment records, parsing order and scheduled shipment dates, handling missing values, and validating data integrity across order items and destinations.',
          },
          {
            title: 'Feature Selection & Pre-Dispatch Framing',
            desc: 'Selected features available at the time of order scheduling—such as shipping mode, scheduled transit days, customer segment, and geographic destination—avoiding post-delivery metrics (such as actual transit duration) to prevent target leakage in pre-dispatch predictive modeling.',
          },
          {
            title: 'Classification Modeling Workflow',
            desc: 'Implemented Scikit-Learn pipelines using OneHotEncoder for categorical features and StandardScaler for numeric variables, training classifiers to distinguish delayed vs on-time shipments, with evaluation focusing on recall to identify delayed shipments.',
          },
          {
            title: 'Interactive Streamlit Interface',
            desc: 'Built a multi-panel dashboard incorporating overview metrics, interactive route filters, delay rate comparisons, and an input playground to evaluate simulated order attributes.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Dataset Loading', desc: 'Historical logistics shipment records loaded into a Pandas DataFrame.' },
          { step: '02', title: 'Data Cleaning', desc: 'Datetime fields parsed, null values handled, and categorical labels standardized.' },
          { step: '03', title: 'Feature Engineering', desc: 'Scheduled transit intervals calculated and categorical route variables encoded.' },
          { step: '04', title: 'Model Training & Evaluation', desc: 'Scikit-Learn pipeline fits classification models on training split and evaluates delay predictions.' },
          { step: '05', title: 'Interactive Dashboard', desc: 'Streamlit renders interactive charts, correlation summaries, and scenario prediction widgets.' },
        ],
        challenges: [
          {
            challenge: 'Preventing Information Leakage',
            decision: 'Post-delivery fields (such as actual shipping duration or delivery confirmation timestamps) are inherently correlated with delay status. Carefully audited feature sets to restrict predictive inputs strictly to information known at order dispatch time.',
          },
          {
            challenge: 'Handling High-Cardinality Categorical Features',
            decision: 'Destination regions and zip codes contained hundreds of distinct values. Aggregated sparse geographical categories into regional corridors to maintain signal without creating excessively sparse feature matrices.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Constructed an end-to-end analytical and modeling pipeline on historical enterprise logistics shipping records.',
            'Identified significant variations in delay rates across transport tiers and regional destination corridors.',
            'Trained Scikit-Learn classification models to estimate delay risk from pre-dispatch order attributes.',
            'Deployed an interactive Streamlit dashboard enabling self-service operational data exploration and scenario simulation.',
          ],
          limitations: [
            'Analysis is based on historical batch logistics data; the dashboard does not integrate live GPS vehicle tracking or real-time carrier telemetry.',
            'Predictive models reflect historical operating conditions and cannot account for unmodeled real-time disruptions such as extreme weather events or customs strikes.',
            'Simulations provide probabilistic estimates based on historical patterns, not guaranteed carrier delivery times.',
          ],
        },
        futureImprovements: [
          'Integration of external weather and port congestion data feeds to enhance model predictive features.',
          'Exploration of ensemble gradient boosting algorithms (XGBoost, LightGBM) to evaluate potential classification gains.',
          'Development of automated carrier recommendation heuristics balancing freight cost against predicted delay risk.',
        ],
      },
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
    'POLICY GATEWAYS',
    'SPATIAL INTERFACES',
  ],

  about: {
    introLarge:
      "I'm drawn to the space between an idea and what it can become.",
    introNormal:
      "I'm Aditya Prakash, a computer science student exploring the intersection of software development, data analytics, and AI. What began with building projects has grown into a curiosity about how different disciplines can come together to solve problems.",
    introBio2:
      "I enjoy the process of turning concepts into working systems, asking questions of data, and exploring what intelligent technologies can make possible. I'm still discovering where these interests will lead me—and that's part of what makes the journey exciting.",
    introClosing:
      "Not defined by one discipline. Driven by the possibilities between them.",
    contactSheet: [
      { title: 'Diagnostic Vision', subtitle: 'Pathology Detection', gradient: 'linear-gradient(145deg, #0e2a22, #174d3b)' },
      { title: 'Policy Gateways', subtitle: 'Agentic Guardrails', gradient: 'linear-gradient(145deg, #2a1b0e, #4d2b17)' },
      { title: 'Civic Systems', subtitle: 'Scheme Discovery Hub', gradient: 'linear-gradient(145deg, #10212e, #19374d)' },
      { title: 'Data Pipelines', subtitle: 'Predictive Analytics', gradient: 'linear-gradient(145deg, #1f122e, #3b1d52)' },
    ],
    kit: [
      {
        group: 'Core & Languages',
        chips: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML5 / CSS3', 'R'],
      },
      {
        group: 'Frameworks & Backend',
        chips: ['React', 'Node.js', 'Express.js', 'FastAPI', 'Tailwind CSS', 'RESTful APIs'],
      },
      {
        group: 'Data, ML & Cloud',
        chips: ['PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'MongoDB Atlas', 'NoSQL', 'Redis', 'GitHub', 'Docker'],
      },
    ],
    bars: [
      { label: 'Full-Stack Development', value: 92 },
      { label: 'Data Analytics & EDA', value: 88 },
      { label: 'Machine Learning & CV', value: 82 },
      { label: 'System Architecture', value: 85 },
    ],
    reflections: [
      {
        num: '01',
        label: 'THE CURIOSITY',
        heading: 'I like understanding what happens beneath the surface.',
        body: "I'm drawn to the logic behind an interface, the patterns hidden in data, and the decisions that make a system work. Getting something to run is satisfying; understanding why it works is what keeps me exploring.",
      },
      {
        num: '02',
        label: 'THE CONNECTIONS',
        heading: "I don't want to think in just one direction.",
        body: "Full-stack development, data analytics, and AI each offer a different way to approach a problem. I'm interested in where they meet—and how combining their perspectives can lead to more thoughtful solutions.",
      },
      {
        num: '03',
        label: 'THE UNFINISHED PART',
        heading: "I'm still figuring out where my curiosity leads.",
        body: "I haven't settled on a single lane, and I don't see that as a weakness. I'm exploring, learning what I enjoy most, and building a clearer sense of direction through the things I choose to understand.",
      },
    ],

    get highlights() {
      return this.reflections;
    },
    get awards() {
      return this.reflections;
    },
  },

  journey: [
    {
      dateLabel: 'CHAPTER 01 — WHERE IT BEGAN',
      title: 'It started with building.',
      paragraphs: [
        'I began finding my direction when I started building projects. Concepts that once existed as things to learn became things I could put together, test, and improve. Building introduced me to a different side of computer science: not just understanding how things work, but figuring out how to make them work.',
        'The process became a way to explore what I was capable of creating—and what I still needed to learn.',
      ],
      text: 'I began finding my direction when I started building projects. Concepts that once existed as things to learn became things I could put together, test, and improve. Building introduced me to a different side of computer science: not just understanding how things work, but figuring out how to make them work.\n\nThe process became a way to explore what I was capable of creating—and what I still needed to learn.',
    },
    {
      dateLabel: 'CHAPTER 02 — BEYOND ONE DISCIPLINE',
      title: 'Curiosity took different forms.',
      paragraphs: [
        'Full-stack development, data analytics, and artificial intelligence began to shape the areas I wanted to explore. Each offered a different way to approach a problem: building the system, understanding the data, or exploring what intelligent models could contribute.',
        'Rather than choosing one direction too early, I became interested in understanding how these disciplines could complement one another.',
      ],
      text: 'Full-stack development, data analytics, and artificial intelligence began to shape the areas I wanted to explore. Each offered a different way to approach a problem: building the system, understanding the data, or exploring what intelligent models could contribute.\n\nRather than choosing one direction too early, I became interested in understanding how these disciplines could complement one another.',
    },
    {
      dateLabel: 'CHAPTER 03 — CONNECTING THE PIECES',
      title: 'Different tools. A shared purpose.',
      paragraphs: [
        'My interests now span software development, analytical thinking, and machine learning. I\'m continuing to explore how these areas meet in practical applications—and how to move beyond making something work toward making it useful, understandable, and reliable.',
        'I\'m still learning where each discipline fits, and that exploration is part of the journey itself.',
      ],
      text: 'My interests now span software development, analytical thinking, and machine learning. I\'m continuing to explore how these areas meet in practical applications—and how to move beyond making something work toward making it useful, understandable, and reliable.\n\nI\'m still learning where each discipline fits, and that exploration is part of the journey itself.',
    },
    {
      dateLabel: 'CHAPTER 04 — WHAT COMES NEXT',
      title: 'Still becoming.',
      paragraphs: [
        'I don\'t have every part of my direction figured out yet, and I don\'t think I need to pretend otherwise. I\'m continuing to strengthen my foundations, experiment with ideas, and discover which problems I want to spend more time solving.',
        'For now, my direction is the intersection of software engineering, data, and AI. The next step is to keep learning, keep building, and let experience make that direction clearer.',
      ],
      text: 'I don\'t have every part of my direction figured out yet, and I don\'t think I need to pretend otherwise. I\'m continuing to strengthen my foundations, experiment with ideas, and discover which problems I want to spend more time solving.\n\nFor now, my direction is the intersection of software engineering, data, and AI. The next step is to keep learning, keep building, and let experience make that direction clearer.',
    },
  ],

  portrait: {
    src: '/assets/portrait/portrait.jpg',
    alt: 'Aditya Prakash — Portrait',
  },

  certificates: [
    {
      title: 'Hedera Certified Developer Associate (HCDA)',
      issuer: 'Hedera / IDS / Bharat Blockchain',
      year: '2024',
      type: 'image',
      file: '/assets/certificates/Hedera_Certified_Developer_Associate.png',
    },
    {
      title: 'Hedera Certified Foundation (HCF)',
      issuer: 'Hedera / IDS / Bharat Blockchain',
      year: '2024',
      type: 'image',
      file: '/assets/certificates/Hedera_Certified_Foundation.png',
    },
    {
      title: 'Networking Basics',
      issuer: 'Cisco Networking Academy',
      year: '2026',
      type: 'pdf',
      file: '/assets/certificates/Cisco_Networking_Basics.pdf',
      thumbnail: '/assets/certificates/Cisco_Networking_Basics.png',
      certId: '931ecb0d-9e14-4b37-88be-eaa8e64b5abe',
    },
    {
      title: 'Alpha (DSA with Java)',
      issuer: 'Apna College',
      year: '2024',
      type: 'pdf',
      file: '/assets/certificates/Apna_College_Alpha_DSA_Java.pdf',
    },
  ],

  resume: {
    file: '/assets/resume/resume.pdf',
    label: 'Aditya_Prakash_Resume.pdf',
  },
};

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'ALL' },
  { id: 'languages', label: 'LANGUAGES' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'databases-tools', label: 'DATABASES & TOOLS' },
  { id: 'analytics-ml-vision', label: 'ANALYTICS, ML & VISION' },
];

export const SKILL_CATEGORY_MAP = {

  'Java': ['languages'],
  'Python': ['languages', 'analytics-ml-vision'],
  'TypeScript': ['languages', 'frontend', 'backend'],
  'JavaScript': ['languages', 'frontend', 'backend'],
  'SQL': ['languages', 'databases-tools'],
  'HTML5 / CSS3': ['languages', 'frontend'],
  'R': ['languages'],

  'React': ['frontend'],
  'Tailwind CSS': ['frontend'],

  'Node.js': ['backend'],
  'Express.js': ['backend'],
  'FastAPI': ['backend'],
  'RESTful APIs': ['backend'],

  'MongoDB Atlas': ['databases-tools'],
  'NoSQL': ['databases-tools'],
  'Redis': ['databases-tools', 'backend'],
  'GitHub': ['databases-tools'],
  'Docker': ['databases-tools', 'backend'],

  'PyTorch': ['analytics-ml-vision'],
  'Scikit-Learn': ['analytics-ml-vision'],
  'Pandas': ['analytics-ml-vision'],
  'NumPy': ['analytics-ml-vision'],
  'MobileNetV2': ['analytics-ml-vision'],
  'Grad-CAM': ['analytics-ml-vision'],
  'Computer Vision': ['analytics-ml-vision'],
};

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'ALL SYSTEMS' },
  { id: 'cv', label: 'COMPUTER VISION' },
  { id: 'ai-agents', label: 'AI AGENTS & SECURITY' },
  { id: 'fullstack', label: 'FULL-STACK WEB' },
  { id: 'analytics', label: 'DATA ANALYTICS' },
];
