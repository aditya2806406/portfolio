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
      category: 'COMPUTER VISION',
      filterCategory: 'cv',
      year: '2024',
      gradient: 'linear-gradient(135deg, #0e2a22 0%, #174d3b 60%, #2fb5b0 100%)',
      tags: ['PyTorch', 'MobileNetV2', 'Grad-CAM', 'Computer Vision', 'Python'],
      description:
        'An AI-powered agricultural pathology diagnostic engine utilizing MobileNetV2 with Grad-CAM visual explainability heatmaps. Classifies plant diseases, generates chemical and organic remediation guidance, and maps nearby agricultural care centers within a spatial radius.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'agriscan',
        title: 'AgriScan',
        tagline: 'Crop Disease Detection & Treatment Advisor',
        category: 'COMPUTER VISION',
        year: '2024',
        tags: ['PyTorch', 'MobileNetV2', 'Grad-CAM', 'Computer Vision', 'Python'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'AgriScan is an edge-optimized agricultural pathology diagnostic system designed to identify foliar crop infections and provide immediate remediation advice. By pairing a lightweight convolutional neural network with gradient-based class activation mapping (Grad-CAM), the application delivers explainable visual diagnostics directly to agriculturalists, distinguishing pathogen lesions from background noise and prescribing dual organic and chemical remediation paths.',
        problemStatement:
          'Foliar crop infections represent a primary cause of avoidable yield losses for smallholder farming communities. Conventional pathology diagnostics require physical laboratory inspection or agronomist visits, resulting in multi-day diagnostic latency. In the interim, misdiagnoses frequently lead farmers to apply broad-spectrum chemical fungicides unnecessarily, escalating input expenditures, degrading soil microbiology, and failing to mitigate fungal or bacterial spread.',
        goals: [
          'Deliver sub-second on-device or edge image inference with a lightweight convolutional neural network footprint under 20MB.',
          'Provide transparent visual explainability via Grad-CAM heatmaps so agriculturalists can independently verify the anatomical focus of diagnostic predictions.',
          'Formulate dual-track actionable remediation pathways detailing both bio-organic practices and targeted chemical actives.',
          'Facilitate offline-first geographic proximity lookup for accredited regional agricultural care centers and testing hubs.',
        ],
        architecture: {
          summary:
            'The AgriScan architecture operates through a staged computer vision pipeline: high-resolution leaf capture, input tensor standardization (224×224), deep feature extraction via depthwise separable convolutions (MobileNetV2), saliency gradient backpropagation (Grad-CAM), and heuristic diagnostic resolution linking predicted pathologies to localized treatment knowledge bases.',
          components: [
            {
              name: 'Specimen Capture & Preprocessing',
              role: 'Foliar Image Normalization',
              details: 'Resizes raw RGB photographic specimens to 224×224 tensors, normalizes channel distributions using ImageNet statistical constants, and applies spatial noise filtering.',
            },
            {
              name: 'MobileNetV2 Feature Backbone',
              role: 'Deep Convolutional Classifier',
              details: 'Utilizes inverted residual blocks with linear bottlenecks to extract multiscale spatial feature representations while minimizing parameter overhead and memory consumption.',
            },
            {
              name: 'Grad-CAM Saliency Engine',
              role: 'Visual Model Explainability',
              details: 'Computes gradients of target pathology logits with respect to final convolutional activation maps, generating localized heatmaps overlaid on the original foliage image.',
            },
            {
              name: 'Pathology & Remediation Resolver',
              role: 'Dual Guidance Knowledge Base',
              details: 'Maps identified fungal, bacterial, or viral pathogens to validated agronomic protocols, contrasting organic bio-treatments with targeted chemical interventions.',
            },
            {
              name: 'Geospatial Extension Locator',
              role: 'Proximity Support Hub Mapping',
              details: 'Resolves farmer geographic coordinates against indexed regional extension centers to supply immediate contact channels and specialized physical support.',
            },
          ],
        },
        techStack: [
          {
            tech: 'PyTorch',
            role: 'Deep Learning & Gradient Computation',
            rationale: 'Provided dynamic computational graphs essential for computing exact backwards gradients through convolutional feature maps for real-time Grad-CAM saliency generation.',
          },
          {
            tech: 'MobileNetV2',
            role: 'Lightweight Convolutional Backbone',
            rationale: 'Inverted residual bottlenecks and depthwise separable convolutions dramatically reduced parameter count, enabling rapid edge inference without requiring heavy GPU infrastructure.',
          },
          {
            tech: 'Grad-CAM',
            role: 'Explainable AI (XAI) Visualization',
            rationale: 'Produces coarse 2D saliency maps highlighting the discriminative leaf regions influencing classification, mitigating black-box distrust among agronomy practitioners.',
          },
          {
            tech: 'Computer Vision (OpenCV / PIL)',
            role: 'Image Preprocessing & Thermal Blending',
            rationale: 'Handled tensor color-space conversions, alpha-composited Jet thermal heatmaps over RGB leaves, and managed variable photographic orientations.',
          },
          {
            tech: 'Python',
            role: 'Core Runtime & Pipeline Orchestration',
            rationale: 'Unified scientific computing libraries, neural network runtimes, and algorithmic remediation lookups into a cohesive, maintainable execution pipeline.',
          },
        ],
        keyFeatures: [
          {
            title: 'Multiclass Foliar Lesion Classification',
            desc: 'Detects and categorizes prevalent fungal, bacterial, and viral crop pathologies across agricultural staple crops.',
          },
          {
            title: 'Grad-CAM Visual Attention Saliency',
            desc: 'Generates real-time thermal gradient overlays to prove whether the model evaluated actual leaf lesions rather than background debris.',
          },
          {
            title: 'Dual-Track Remediation Protocols',
            desc: 'Structures remedies into organic bio-controls (preventing soil toxicity) and chemical formulations (for acute commercial rescue).',
          },
          {
            title: 'Spatial Agricultural Center Mapping',
            desc: 'Calculates distance vectors to certified regional agricultural testing laboratories and university extension centers.',
          },
        ],
        implementationDetails: [
          {
            title: 'Convolutional Feature Extraction & Inverted Residuals',
            desc: 'The model architecture adapts MobileNetV2 pretrained on ImageNet, fine-tuned on curated foliar pathology datasets. Intermediate expansions expand low-dimensional channel representations to higher dimensions before depthwise filtering, retaining representational richness without volumetric parameter growth.',
          },
          {
            title: 'Mathematical Grad-CAM Heatmap Computation',
            desc: 'To calculate visual importance weights, the gradient of the predicted class score yc is computed with respect to activation feature maps Ak of the final convolutional layer: alpha_k = (1/Z) * sum(sum(dyc / dAk)). The final localization map is obtained through a rectified linear combination: L_GradCAM = ReLU(sum(alpha_k * Ak)).',
          },
          {
            title: 'Structured Remediation Catalog',
            desc: 'Remediation protocols are codified in a relational structure pairing identified disease classes with validated botanical remedies (e.g., neem extract sprays, Trichoderma bio-agents) alongside approved chemical actives, dosage guidelines, and preventive cultural practices.',
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
            challenge: 'Background Clutter & Soil Spurious Correlations',
            decision: 'Early training runs revealed the model learned to associate background soil color with specific diseases. Grad-CAM visual heatmaps made this spurious correlation visible. The issue was resolved by introducing intensive data augmentation including random background masking, perspective jitter, and color perturbations.',
          },
          {
            challenge: 'Inference Latency in Rural Edge Environments',
            decision: 'Opted for MobileNetV2 with depthwise separable layers rather than ResNet-50 or DenseNet, lowering computational arithmetic operations (FLOPs) by over 70% while preserving discriminative accuracy.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Demonstrated reliable classification of plant pathologies with real-time explainability overlays on commodity hardware.',
            'Grad-CAM thermal overlays confirmed model focus on necrotic lesion edges and fungal spore clusters.',
            'Successfully decoupled remediation into organic and chemical tracks, promoting sustainable pest management.',
          ],
          limitations: [
            'Requires clear, reasonably focused single-leaf specimens; crowded canopies with extreme lens flare can reduce classification confidence.',
            'Currently trained on targeted staple crop pathologies; rare mutations or secondary opportunistic infections require human laboratory confirmation.',
          ],
        },
        futureImprovements: [
          'Quantized INT8 ONNX export for zero-latency in-browser WebAssembly execution completely offline on low-end mobile devices.',
          'Multi-leaf multi-label segmentation to detect concurrent viral and fungal blights within a single panoramic foliage frame.',
          'Crowdsourced disease outbreak telemetry feeds to alert regional agricultural clusters of localized blight vector spread.',
        ],
      },
    },
    {
      id: 'agentguard',
      name: 'AgentGuard',
      tagline: 'Runtime Security for Autonomous AI Agents',
      category: 'AI AGENTS & SECURITY',
      filterCategory: 'ai-agents',
      year: '2024',
      gradient: 'linear-gradient(135deg, #2a1b0e 0%, #4d2b17 60%, #ffb24a 100%)',
      tags: ['TypeScript', 'Node.js', 'Express', 'Redis', 'WebSockets'],
      description:
        'Low-latency runtime security gateway and firewall for autonomous LLM agents. Evaluates deterministic operational policies under 5ms, enforces zero-trust function boundaries, and logs tamper-evident cryptographic SHA-256 audit trails.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'agentguard',
        title: 'AgentGuard',
        tagline: 'Runtime Security for Autonomous AI Agents',
        category: 'AI AGENTS & SECURITY',
        year: '2024',
        tags: ['TypeScript', 'Node.js', 'Express', 'Redis', 'WebSockets'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'AgentGuard is a specialized runtime security proxy and deterministic firewall engineered for autonomous LLM agents. Positioned directly between agent reasoning engines and external execution environments (APIs, filesystem tools, shell runners, and database connectors), AgentGuard intercepts proposed function calls, validates arguments against declarative zero-trust policies in sub-5ms latency, neutralizes prompt injection payloads, and records tamper-evident SHA-256 cryptographic audit ledgers.',
        problemStatement:
          'Autonomous LLM agents possessing tool-calling capabilities introduce critical security vulnerabilities. Indirect prompt injections, goal hijacking, and hallucinations can compel an agent to execute unauthorized file deletions, drop database schemas, invoke unvetted shell scripts, or leak proprietary operational secrets. Relying on the LLM itself to self-police behavior is fundamentally insecure because prompt boundaries can be manipulated. A deterministic, out-of-band proxy is required to enforce strict operational boundaries.',
        goals: [
          'Intercept agent tool invocations with sub-5ms evaluation latency to prevent degradation of multi-step agent reasoning loops.',
          'Enforce strict zero-trust principle of least privilege through granular declarative capability whitelists.',
          'Neutralize shell injection, path traversal, and malicious SQL commands embedded in dynamic tool parameters.',
          'Produce an immutable, tamper-evident cryptographic SHA-256 audit log documenting every proposed action and security decision.',
          'Provide full-duplex real-time security telemetry and kill-switch controls via WebSockets.',
        ],
        architecture: {
          summary:
            'AgentGuard operates as an inline reverse proxy. Agent tool-call requests pass through authentication, schema verification, Redis-cached policy resolution, regex and parameter sanitization, and deterministic verdict synthesis. Approved requests dispatch to target downstream APIs; blocked requests return structured policy violation errors back to the agent without terminating the host process.',
          components: [
            {
              name: 'Reverse Proxy Gateway',
              role: 'Inline Tool Request Interception',
              details: 'Listens for tool execution payloads emitted by LLM agent runtimes, parses JSON schema arguments, and halts downstream dispatch until policy clearance.',
            },
            {
              name: 'Deterministic Policy Engine',
              role: 'Sub-5ms Rule Resolution',
              details: 'Evaluates action parameters against declarative permission rules, role scopes, and argument boundary thresholds cached in in-memory Redis stores.',
            },
            {
              name: 'Parameter Sanitizer & Boundary Guard',
              role: 'Injection Defense',
              details: 'Enforces strict regex constraints preventing shell metacharacter expansion (&&, |, ;), directory traversal (../), and SQL truncation attacks.',
            },
            {
              name: 'Cryptographic Audit Logger',
              role: 'Tamper-Evident SHA-256 Chaining',
              details: 'Computes cryptographic digests linking timestamp, agent session ID, proposed tool, payload hash, verdict, and the previous block hash.',
            },
            {
              name: 'WebSocket Telemetry Stream',
              role: 'Real-Time Incident Monitoring',
              details: 'Broadcasts policy violations, latency metrics, and connection heartbeats to administrative security operations consoles with immediate kill-switch capability.',
            },
          ],
        },
        techStack: [
          {
            tech: 'TypeScript',
            role: 'Strict Type Contracts & Safety',
            rationale: 'Enforced compile-time type verification across complex agent tool definitions, security rule ASTs, and cryptographic ledger payloads.',
          },
          {
            tech: 'Node.js & Express',
            role: 'Asynchronous Proxy Runtime',
            rationale: 'Non-blocking I/O architecture enabled ultra-high concurrent connection handling with minimal CPU context switching under sustained agent query loads.',
          },
          {
            tech: 'Redis',
            role: 'In-Memory Policy & Session Cache',
            rationale: 'Provided sub-millisecond key-value lookups for active agent capability sets, rate-limiting tokens, and dynamic session states.',
          },
          {
            tech: 'WebSockets',
            role: 'Full-Duplex Security Streaming',
            rationale: 'Facilitated immediate push delivery of security anomaly alerts to monitoring dashboards without expensive HTTP polling overhead.',
          },
          {
            tech: 'Cryptographic SHA-256',
            role: 'Audit Log Integrity Assurance',
            rationale: 'Guaranteed non-repudiation and tamper detection across all intercepted agent actions through sequential block-hash chaining.',
          },
        ],
        keyFeatures: [
          {
            title: 'Sub-5ms Policy Evaluation',
            desc: 'In-memory deterministic rule parsing ensures agent tool chaining remains responsive and uninhibited.',
          },
          {
            title: 'Zero-Trust Capability Whitelisting',
            desc: 'Restricts agent operations strictly to explicitly authorized endpoints, methods, and validated parameter bounds.',
          },
          {
            title: 'Tamper-Evident Cryptographic Ledger',
            desc: 'Chained SHA-256 block hashing guarantees that audit records cannot be retroactively altered or deleted.',
          },
          {
            title: 'Active Kill-Switch & Anomaly Streaming',
            desc: 'Enables administrators to instantly sever compromised agent sessions through persistent WebSocket sockets.',
          },
        ],
        implementationDetails: [
          {
            title: 'Declarative Security Rulesets',
            desc: 'Policies are authored in declarative JSON schemas specifying allowed tool namespaces, mandatory parameter types, numerical ranges, regex patterns, and maximum execution budgets. Rulesets are indexed in Redis by agent identity.',
          },
          {
            title: 'Cryptographic Hash Chaining',
            desc: 'Each audit record r_i computes: Hash_i = SHA256(Hash_{i-1} + Timestamp + AgentID + ToolName + PayloadDigest + Verdict). Any retroactive modification to an earlier log entry invalidates the entire subsequent cryptographic chain.',
          },
          {
            title: 'Safe Failure Feedback Loop',
            desc: 'When an action is blocked, AgentGuard returns a structured, sanitized error payload explaining the exact policy boundary breached, enabling the agent to re-plan safely without exposing internal security infrastructure details.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Action Emission', desc: 'LLM agent generates tool call payload directed toward the AgentGuard proxy endpoint.' },
          { step: '02', title: 'Token & Schema Verification', desc: 'Proxy validates agent bearer credentials and verifies structural schema conformity.' },
          { step: '03', title: 'In-Memory Policy Check', desc: 'Rule evaluator retrieves agent capability whitelist from Redis in sub-millisecond execution.' },
          { step: '04', title: 'Parameter Sanitization', desc: 'Regex engines screen string inputs for shell metacharacters, traversal paths, and suspicious tokens.' },
          { step: '05', title: 'Verdict & Dispatch', desc: 'Approved requests are proxied to downstream API; rejected calls are intercepted with policy alerts.' },
          { step: '06', title: 'Chained Audit Commit', desc: 'SHA-256 block digest is calculated, appended to the immutable log, and pushed via WebSockets.' },
        ],
        challenges: [
          {
            challenge: 'Strict Latency Budget Under Multi-Step Agent Chains',
            decision: 'Autonomous agents frequently execute dozens of tool steps sequentially. Adding 50ms per step would cripple system usability. Built an in-memory rule compiler in Redis utilizing pre-compiled regular expression trees to achieve sub-5ms total evaluation overhead.',
          },
          {
            challenge: 'Handling Varied Dynamic JSON Tool Schemas',
            decision: 'Constructed recursive schema validation supporting arbitrary nested parameter trees, preventing attackers from concealing malicious payloads within deeply nested dictionary structures.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Successfully intercepts simulated shell injections, unauthorized database alterations, and directory traversal attempts.',
            'Preserved sub-5ms mean policy evaluation latency across high-concurrency synthetic testing.',
            'Verified cryptographic ledger chain consistency under automated integrity verification tests.',
          ],
          limitations: [
            'Evaluates structural, syntactic, and parameter rules; does not perform semantic natural language interpretation of arbitrary raw text returned from external APIs.',
            'Requires proactive definition of tool permission schemas by system administrators prior to agent deployment.',
          ],
        },
        futureImprovements: [
          'Lightweight local embedding classification to evaluate natural language tool outputs for confidential data leakage.',
          'Consensus-based multi-approver validation for high-risk financial or database modification operations.',
          'Cryptographic audit log anchoring to distributed ledger primitives for tamper-evident compliance verification.',
        ],
      },
    },
    {
      id: 'sarkarisetu',
      name: 'SarkariSetu',
      tagline: 'Government Scheme Discovery Platform',
      category: 'FULL-STACK WEB',
      filterCategory: 'fullstack',
      year: '2024',
      gradient: 'linear-gradient(135deg, #10212e 0%, #19374d 60%, #3884b0 100%)',
      tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'REST APIs'],
      description:
        'Smart India Hackathon leadership project delivering an accessible civic platform that demystifies welfare schemes across Indian central and state ministries with multilingual search and multi-factor eligibility evaluation.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'sarkarisetu',
        title: 'SarkariSetu',
        tagline: 'Government Scheme Discovery Platform',
        category: 'FULL-STACK WEB',
        year: '2024',
        tags: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'REST APIs'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'SarkariSetu is a civic technology discovery platform developed as a team leadership project for the Smart India Hackathon (SIH). The platform unifies hundreds of central and state welfare programs across India into an intuitive, multilingual interface. Featuring an automated multi-factor eligibility evaluation questionnaire, plain-language benefit breakdowns, and step-by-step application documentation roadmaps, SarkariSetu eliminates bureaucratic friction for citizens seeking welfare entitlements.',
        problemStatement:
          'The government of India and individual state administrations operate thousands of welfare and subsidy schemes spanning agriculture, education, healthcare, and micro-entrepreneurship. However, information is dispersed across hundreds of separate ministerial websites filled with dense bureaucratic terminology, complex eligibility rubrics, and English-only documentation. Consequently, eligible citizens—particularly in rural and low-income demographics—remain unaware of critical financial and developmental support.',
        goals: [
          'Consolidate fragmented welfare schemes into a normalized, searchable database covering both central and state ministries.',
          'Build an accessible multi-factor eligibility engine evaluating age, gender, occupation, income tier, caste category, and state residency.',
          'Deliver an intuitive, high-contrast, mobile-responsive user experience accommodating users with diverse digital literacy.',
          'Provide clear, actionable checklists of required physical documentation and straightforward application procedural steps.',
        ],
        architecture: {
          summary:
            'SarkariSetu follows a decoupled full-stack architecture: a responsive React client interface, an Express REST API tier handling query parsing and eligibility calculation, and a MongoDB Atlas document store containing normalized scheme criteria schemas, localized translations, and indexed administrative tags.',
          components: [
            {
              name: 'Citizen Frontend Interface',
              role: 'Accessible React Client',
              details: 'Renders dynamic questionnaire wizards, category exploration filters, search autocompletion, and personalized scheme eligibility summaries.',
            },
            {
              name: 'REST API & Gateway',
              role: 'Node.js & Express Routing',
              details: 'Handles scheme querying, parameter sanitization, state-based aggregation pipelines, and citizen demographic payload validation.',
            },
            {
              name: 'Multi-Factor Eligibility Engine',
              role: 'Rule-Based Evaluation Service',
              details: 'Cross-evaluates citizen demographic parameters against nested conditional criteria trees to compute definitive eligibility classifications.',
            },
            {
              name: 'Scheme Catalog & Document Store',
              role: 'MongoDB Atlas Distributed Database',
              details: 'Stores normalized scheme definitions, ministerial classifications, documentation checklists, and multilingual text assets.',
            },
            {
              name: 'Documentation Roadmap Generator',
              role: 'Procedural Application Guidance',
              details: 'Synthesizes prerequisites, required certificates (income, caste, residency), and official portal links into step-by-step citizen guides.',
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
            role: 'Scalable RESTful Backend',
            rationale: 'Provided an asynchronous API architecture capable of processing complex scheme aggregation queries and filtering logic with low latency.',
          },
          {
            tech: 'MongoDB Atlas',
            role: 'Flexible Document Database',
            rationale: 'Accommodated heterogeneous eligibility criteria across differing ministries without requiring brittle, heavily normalized relational schemas.',
          },
          {
            tech: 'REST APIs',
            role: 'Decoupled Client-Server Communication',
            rationale: 'Ensured clean separation of concerns, standardized HTTP response structures, and facilitated future mobile application integrations.',
          },
        ],
        keyFeatures: [
          {
            title: 'Automated Eligibility Assessment',
            desc: 'Citizens answer a concise, guided demographic questionnaire to instantly discover which central and state schemes they qualify for.',
          },
          {
            title: 'Sectoral Categorization',
            desc: 'Organizes programs into intuitive domains: Agriculture & Farming, Education & Scholarships, Healthcare, and Small Business Subsidies.',
          },
          {
            title: 'Document Checklist Synthesizer',
            desc: 'Displays the precise list of identity, income, and educational certificates needed prior to submitting an official application.',
          },
          {
            title: 'State & Central Unified Search',
            desc: 'Enables filtered discovery by geographical jurisdiction, ensuring citizens view both national entitlements and regional state benefits.',
          },
        ],
        implementationDetails: [
          {
            title: 'Flexible Scheme Criteria Modeling',
            desc: 'In MongoDB, each scheme document embeds an eligibility object: { minAge, maxAge, allowedGenders, maxAnnualIncome, eligibleOccupations, eligibleCategories, applicableStates }. This schema accommodates both highly specific niche scholarships and broad universal agricultural support schemes.',
          },
          {
            title: 'Constant-Time Ineligibility Pruning',
            desc: 'The eligibility algorithm executes rapid short-circuit checks (e.g., state matching, age boundaries, income caps) before evaluating complex nested occupational or educational criteria, maximizing query throughput.',
          },
          {
            title: 'User Experience for Digital Inclusion',
            desc: 'Implemented high-contrast visual hierarchies, large tap targets (minimum 48px), minimal typographical clutter, and clear iconography to ensure ease of navigation on mobile devices.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Citizen Input', desc: 'User completes demographic parameters (state, age, income range, occupation) in the questionnaire.' },
          { step: '02', title: 'API Request Dispatch', desc: 'React client dispatches sanitized JSON payload to Express REST endpoint /api/schemes/evaluate.' },
          { step: '03', title: 'Database Filtering', desc: 'MongoDB aggregation pipeline extracts schemes matching user state jurisdiction and central programs.' },
          { step: '04', title: 'Eligibility Rule Processing', desc: 'Eligibility service evaluates user attributes against scheme threshold criteria.' },
          { step: '05', title: 'Ranking & Checklist Assembly', desc: 'Eligible schemes are tagged, ranked by relevance, and matched with documentation requirements.' },
          { step: '06', title: 'Response Rendering', desc: 'Client displays personalized scheme cards with immediate application steps and verified portal links.' },
        ],
        challenges: [
          {
            challenge: 'Heterogeneous Ministerial Eligibility Criteria',
            decision: 'Different government departments define eligibility using divergent paradigms (e.g., land parcel acreage vs poverty line cards). Designed an extensible JSON rule evaluation schema with optional attribute matching to unify divergent criteria under one query interface.',
          },
          {
            challenge: 'SIH Hackathon Leadership & Architectural Prioritization',
            decision: 'Under intense 36-hour hackathon constraints, spearheaded team engineering, defined API interfaces upfront, and focused delivery on robust core eligibility calculation rather than superficial feature bloat.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Delivered a functional, searchable platform prototype during Smart India Hackathon evaluated by jury panels.',
            'Successfully proved multi-criteria scheme filtering across diverse simulated citizen demographic profiles.',
            'Unified documentation checklists across central and state welfare initiatives into single-view citizen summaries.',
          ],
          limitations: [
            'Scheme data currently relies on curated database indexing; live bidirectional integration with official government portals requires formal API agreements.',
            'Citizens must currently finalize official form submissions on the respective external ministry web portals.',
          ],
        },
        futureImprovements: [
          'Automated web crawling pipeline to monitor official gazettes and ministerial portals for scheme updates.',
          'Voice-driven conversational search in regional Indian vernacular languages (Hindi, Telugu, Tamil, Bengali).',
          'Progressive Web App (PWA) offline caching for rural citizens accessing welfare discovery in intermittent connectivity zones.',
        ],
      },
    },
    {
      id: 'supply-chain-analytics',
      name: 'Supply Chain Analytics',
      tagline: 'Logistics Delay & Predictive Intelligence',
      category: 'DATA ANALYTICS',
      filterCategory: 'analytics',
      year: '2024',
      gradient: 'linear-gradient(135deg, #1f122e 0%, #3b1d52 60%, #8175ff 100%)',
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'EDA'],
      description:
        'End-to-end data analytics platform evaluating multi-tier enterprise shipping logistics. Identifies systemic carrier bottlenecks, performs multivariate exploratory analysis, and forecasts order delays using classification pipelines.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'supply-chain-analytics',
        title: 'Supply Chain Analytics',
        tagline: 'Logistics Delay & Predictive Intelligence',
        category: 'DATA ANALYTICS',
        year: '2024',
        tags: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'EDA'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'Supply Chain Analytics is an end-to-end data engineering, exploratory data analysis (EDA), and predictive intelligence platform designed to diagnose and anticipate shipping delays across global multi-tier supply networks. By analyzing historical shipping manifests, transit corridors, shipping modes, and customer segments, the platform isolates systemic distribution bottlenecks and deploys supervised machine learning classification pipelines to estimate delivery risk before dispatch.',
        problemStatement:
          'Modern supply chains face complex vulnerabilities: transit congestion, variable carrier reliability, customs hold-ups, and regional logistics disruptions. Unanticipated shipping delays degrade customer satisfaction, incur contractual SLA penalties, and trigger expensive reactionary expedited freight. Logistics managers typically rely on lagging operational reports after deliveries fail. Proactive predictive analytics is necessary to identify delay risks prior to order hand-off.',
        goals: [
          'Ingest, audit, and clean complex real-world logistics datasets, addressing missing timestamps, corrupted values, and categorical anomalies.',
          'Execute multivariate exploratory data analysis to uncover statistical correlations between shipping mode, carrier performance, route corridors, and delivery latency.',
          'Train and evaluate supervised classification pipelines in Scikit-Learn to forecast delay probabilities on pending shipments.',
          'Deploy an interactive operational intelligence dashboard in Streamlit allowing logistics coordinators to filter transit corridors and simulate risk scenarios.',
        ],
        architecture: {
          summary:
            'The platform features a modular analytical pipeline: tabular logistics data ingestion, automated data cleaning and imputation via Pandas and NumPy, temporal feature engineering (lead times, transit margins), Scikit-Learn classification modeling, and an interactive analytical dashboard built with Streamlit.',
          components: [
            {
              name: 'Logistics Ingestion & Cleaning Pipeline',
              role: 'Data Wrangling & Audit',
              details: 'Parses multi-column shipping records, handles missing delivery dates, strips geographical encoding anomalies, and filters invalid order records.',
            },
            {
              name: 'Exploratory Data Analysis (EDA) Module',
              role: 'Statistical Discovery & Correlation',
              details: 'Calculates distribution metrics, identifies high-risk shipping routes, quantifies carrier variance, and evaluates seasonal delay patterns.',
            },
            {
              name: 'Feature Engineering Engine',
              role: 'Predictive Feature Construction',
              details: 'Computes order-to-shipment intervals, scheduled transit margins, customer segment hazard ratios, and regional route density indices.',
            },
            {
              name: 'Predictive Classification Pipeline',
              role: 'Scikit-Learn Risk Classifier',
              details: 'Applies categorical one-hot encoding, numerical feature scaling, and trains supervised decision classifiers to predict late delivery risk.',
            },
            {
              name: 'Streamlit Intelligence Dashboard',
              role: 'Interactive Operations UI',
              details: 'Renders dynamic KPI overview scorecards, interactive corridor scatter plots, correlation matrices, and real-time order risk simulation tools.',
            },
          ],
        },
        techStack: [
          {
            tech: 'Python',
            role: 'Data Engineering & Modeling Language',
            rationale: 'Provided a comprehensive ecosystem connecting high-performance tabular manipulation, statistical analysis, machine learning algorithms, and visualization tools.',
          },
          {
            tech: 'Pandas',
            role: 'Tabular Data Manipulation',
            rationale: 'Supplied high-performance data structures for indexing, aggregating, temporal datetime parsing, and merging multi-million row logistics records.',
          },
          {
            tech: 'Scikit-Learn',
            role: 'Machine Learning Classification',
            rationale: 'Offered robust, modular pipeline architectures combining StandardScaler, OneHotEncoder, cross-validation, and classification models.',
          },
          {
            tech: 'Streamlit',
            role: 'Interactive Web Dashboard',
            rationale: 'Allowed rapid conversion of Python analytical workflows into responsive, reactive operational dashboards without complex frontend boilerplate.',
          },
          {
            tech: 'Exploratory Data Analysis (EDA)',
            role: 'Statistical Hypothesis Generation',
            rationale: 'Identified non-obvious operational correlations between specific shipping modes, carrier routes, and high-frequency delivery delays.',
          },
        ],
        keyFeatures: [
          {
            title: 'Interactive Corridor & Shipping Mode Filtering',
            desc: 'Drill down into delivery reliability across First Class, Same Day, Second Class, and Standard Class transport tiers.',
          },
          {
            title: 'Predictive Delivery Delay Scoring',
            desc: 'Machine learning model estimates probability of late delivery based on route characteristics and order attributes.',
          },
          {
            title: 'Multivariate Risk Correlation Matrices',
            desc: 'Exposes statistical dependencies between shipment scheduling margins, transit corridors, and delay occurrences.',
          },
          {
            title: 'Operational KPI Performance Scorecards',
            desc: 'Surfaces macro indicators including average transit duration, on-time percentage, and high-risk carrier flags.',
          },
        ],
        implementationDetails: [
          {
            title: 'Temporal Feature Engineering',
            desc: 'Derived critical predictive attributes: Scheduled_Transit_Days, Actual_Shipping_Days, and Transit_Margin (Scheduled minus Actual). Encoded categorical origin-destination pairs to measure route-specific delay propensities.',
          },
          {
            title: 'Handling Class Imbalance & Metric Prioritization',
            desc: 'Because false negatives (failing to predict a delayed critical shipment) carry higher commercial consequences than false positives, evaluation prioritized Recall and ROC-AUC over basic classification accuracy.',
          },
          {
            title: 'Streamlit Interactive Reactive Controls',
            desc: 'Structured the application layout into executive overview KPIs, diagnostic route drill-downs, and an interactive prediction playground where logistics planners can test different shipping modes on pending orders.',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Raw Ingestion', desc: 'Enterprise shipping and logistics records loaded into Pandas DataFrame.' },
          { step: '02', title: 'Data Cleaning & Imputation', desc: 'Null values handled, datetime columns parsed, and corrupted shipment records filtered.' },
          { step: '03', title: 'Feature Transformation', desc: 'Transit margins computed, categorical variables encoded, numerical distributions scaled.' },
          { step: '04', title: 'Model Inference', desc: 'Scikit-Learn pipeline computes delay probability score for each target shipment.' },
          { step: '05', title: 'Operational Dashboard Rendering', desc: 'Streamlit dynamically visualizes route charts, risk distributions, and simulation widgets.' },
        ],
        challenges: [
          {
            challenge: 'High Categorical Cardinality in Global Routes',
            decision: 'Hundreds of global origin-destination zip code pairs caused excessive dimensionality with naive one-hot encoding. Grouped lower-volume regional destinations into regional corridors to preserve statistical signal without overfitting.',
          },
          {
            challenge: 'Actionable Interpretability for Operations Teams',
            decision: 'Rather than presenting opaque model probabilities, paired delay risk scores with dominant feature importance factors (e.g., standard shipping mode + high congestion corridor) so operators understand why risk was elevated.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Built an end-to-end reproducible analytical and predictive pipeline on multi-tier logistics records.',
            'Identified key structural delay drivers across specific regional shipping modes and carrier classes.',
            'Deployed an intuitive, self-service Streamlit application for dynamic operational data exploration.',
          ],
          limitations: [
            'Trained on historical batch operational records; does not currently ingest real-time weather alerts or dynamic GPS telemetry feeds.',
            'Predictive models reflect historical operating conditions and require periodic retraining to adapt to newly emerging carrier route changes.',
          ],
        },
        futureImprovements: [
          'Integration of external real-time maritime port congestion and weather API data streams.',
          'Automated optimal carrier and shipping mode recommendation engine based on cost-delay trade-off curves.',
          'Time-series forecasting integration to model seasonal demand spikes and holiday carrier volume saturation.',
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
    {
      dateLabel: '2024',
      title: 'Supply Chain Analytics & Intelligence',
      text: 'Engineered predictive logistics delay platforms and classification pipelines evaluating enterprise multi-tier shipping networks.',
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
  // Languages
  'Java': ['languages'],
  'Python': ['languages', 'analytics-ml-vision'],
  'TypeScript': ['languages', 'frontend', 'backend'],
  'JavaScript': ['languages', 'frontend', 'backend'],
  'SQL': ['languages', 'databases-tools'],
  'HTML5 / CSS3': ['languages', 'frontend'],
  'C++': ['languages'],
  // Frontend
  'React': ['frontend'],
  'Tailwind CSS': ['frontend'],
  'Streamlit': ['frontend', 'analytics-ml-vision'],
  // Backend
  'Node.js': ['backend'],
  'Express.js': ['backend'],
  'FastAPI': ['backend'],
  'RESTful APIs': ['backend'],
  'WebSockets': ['backend'],
  // Databases & Tools
  'PostgreSQL': ['databases-tools'],
  'MongoDB Atlas': ['databases-tools'],
  'Redis': ['databases-tools', 'backend'],
  'Git': ['databases-tools'],
  'Docker': ['databases-tools', 'backend'],
  // Analytics, ML & Vision
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

