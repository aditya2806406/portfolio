
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
      { label: 'Résumé', url: '/assets/resume/Aditya_Prakash_Resume.pdf' },
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
      tagline: 'Cross-System Runtime Security & Monitoring Platform for Autonomous AI Agents',
      category: 'AI RUNTIME SECURITY',
      filterCategory: 'ai-agents',
      year: '2024',
      gradient: 'linear-gradient(135deg, #2a1b0e 0%, #4d2b17 60%, #ffb24a 100%)',
      tags: ['TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ'],
      description:
        'A cross-system runtime security and monitoring platform designed to govern autonomous AI agent actions across external services, APIs, and multi-database systems through policy evaluation, contextual risk scoring, and verified execution.',
      demoUrl: '#',
      codeUrl: 'https://github.com/aditya2806406',
      caseStudy: {
        slug: 'agentguard',
        title: 'AgentGuard',
        tagline: 'Cross-System Runtime Security & Monitoring Platform for Autonomous AI Agents',
        category: 'AI RUNTIME SECURITY',
        year: '2024',
        tags: ['TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ'],
        codeUrl: 'https://github.com/aditya2806406',
        demoUrl: '#',
        overview:
          'AgentGuard is an evolving cross-system runtime security and monitoring platform designed to govern autonomous AI agent actions across external services, APIs, and database systems.\n\nIt operates as a security layer between AI agents and the systems they interact with, evaluating proposed actions, enforcing contextual permissions, monitoring sensitive operations, and maintaining traceable execution records.\n\nThe platform aims to provide centralized visibility and control over agent-driven operations through policy-based security decisions, event-driven monitoring, controlled integrations, and execution verification.',
        problemStatement:
          'Autonomous AI agents equipped with external tool and database access present severe operational and security challenges when operating without runtime governance:\n\n• Unauthorized actions executed without administrative awareness.\n• Excessive permissions and unrestricted resource access across connected infrastructure.\n• Sensitive data exposure across integrated third-party systems.\n• Unsafe API calls, malformed parameters, and unvetted database modifications.\n• Uncontrolled financial transactions and credit allocations.\n• Lack of centralized monitoring across disparate service providers.\n• Inability to attribute which specific agent initiated an action and its underlying task context.\n• Limited visibility into runtime agent activity and external execution outcomes.\n• Absence of reliable, tamper-evident audit trails and operational accountability.\n\nTraditional authentication mechanisms alone are fundamentally insufficient: authenticating an agent proves its identity, but does not guarantee that every individual action it proposes is safe, authorized, or appropriate for its current operational scope. AgentGuard addresses this structural gap by introducing runtime action governance, continuous parameter validation, and cross-system monitoring.',
        goals: [
          'Centralize monitoring of autonomous AI agent activities across external systems, APIs, and databases.',
          'Intercept proposed actions in-flight before they reach external target systems.',
          'Enforce contextual policies, deterministic permission boundaries, and schema parameter constraints.',
          'Monitor access and operations across multiple database providers via standardized adapters.',
          'Identify potentially unsafe operations, destructive queries, and sensitive data movement in real time.',
          'Control interactions with external APIs and services through authenticated, sandboxed execution adapters.',
          'Support human review workflows and approval queues for high-risk or ambiguous operations.',
          'Verify external execution outcomes independently of initial authorization decisions.',
          'Maintain traceable, structured security logs and execution audit records in PostgreSQL.',
          'Provide an extensible, provider-agnostic connector architecture for rapid integration onboarding.',
        ],
        architecture: {
          summary:
            'AgentGuard is designed with an extensible multi-layered runtime architecture. Inbound agent actions are intercepted, authenticated, and normalized before being subjected to declarative policy checks and contextual risk scoring. Authorized actions pass through controlled service and database adapters with idempotency enforcement, followed by cryptographic execution verification and structured audit persistence.',
          components: [
            {
              name: 'A. Agent Integration Layer',
              role: 'Action Ingestion & Normalization',
              details: 'Receives proposed actions from autonomous AI agents, normalizes incoming action requests, identifies the requesting agent, captures task context and execution metadata, and provides a standardized interface for agent runtimes.',
            },
            {
              name: 'B. Identity & Trust Management',
              role: 'Agent Authentication & Scoping',
              details: 'Validates agent identity and API keys, maintains agent trust levels and permission profiles, associates requests with originating tasks, and enforces context-aware authorization boundaries.',
            },
            {
              name: 'C. Runtime Interception Engine',
              role: 'Pre-Execution In-Flight Interception',
              details: 'Intercepts proposed agent actions before external dispatch, validates action parameters and target resources, prevents unauthorized direct execution paths, and routes requests into centralized security evaluation.',
            },
            {
              name: 'D. Policy & Risk Evaluation Engine',
              role: 'Multi-Tiered Decision Synthesis',
              details: 'Evaluates actions against configured security policies, agent permissions, resource sensitivity, and contextual risk scores to produce three principal decisions: ALLOW (satisfies requirements), BLOCK (violates policy or boundary), or REVIEW (requires human authorization).',
            },
            {
              name: 'E. Execution Contract & Permission Control',
              role: 'Cryptographic Scope Enforcement',
              details: 'Defines the permitted scope of an approved operation via cryptographic intent signing, validates execution parameters, and prevents an authorized action from being mutated into an unauthorized payload.',
            },
            {
              name: 'F. Cross-System Monitoring Engine',
              role: 'Unified System Telemetry',
              details: 'Maintains centralized runtime visibility across external APIs, connected applications, cloud services, database systems, agent-driven transactions, sensitive resource queries, and cross-system data movement.',
            },
            {
              name: 'G. Multi-Database Security & Monitoring',
              role: 'Provider-Agnostic Database Adapters',
              details: 'Designed with an extensible adapter architecture supporting PostgreSQL, MySQL, MongoDB, Firebase Firestore, Firebase Realtime Database, and Supabase. Enforces query auditing, table access tracking, destructive operation restrictions, and agent attribution.',
            },
            {
              name: 'H. Data Security & Egress Control',
              role: 'Exfiltration & PII Protection',
              details: 'Monitors sensitive data access, tracks outbound information flows, identifies unauthorized data disclosure, applies field-level access restrictions, and maintains visibility over data interactions across connected systems.',
            },
            {
              name: 'I. Controlled Integration Connectors',
              role: 'Sandboxed Provider Execution',
              details: 'Features verified OAuth 2.0 execution with idempotency for Gmail, active connector implementations for Stripe financial flows and GitHub repository operations, and standardized database adapters rather than allowing unrestricted agent access.',
            },
            {
              name: 'J. Event-Driven Processing Infrastructure',
              role: 'Asynchronous Queues & Coordination',
              details: 'Utilizes Redis for shared coordination and BullMQ for background queues (event ingestion, action execution, watch renewal) to deliver reliable, deduplicated, and asynchronous event processing with retry handling.',
            },
            {
              name: 'K. Execution Verification Engine',
              role: 'Outcome Reconciliation',
              details: 'Distinguishes authorization from actual execution. Validates provider responses, tracks execution status, compares expected vs actual outcomes, detects external failures, and flags scenarios such as [Decision: ALLOW | Execution: FAILED].',
            },
            {
              name: 'L. Audit, Observability & Incident Management',
              role: 'Relational Audit Persistence',
              details: 'Maintains structured security decision records, agent activity chronologies, execution audit trails, provider receipts, review histories, and failure diagnostics in PostgreSQL to ensure end-to-end traceability.',
            },
          ],
        },
        techStack: [
          {
            tech: 'TypeScript, Node.js & Express.js',
            role: 'Runtime Engine & Gateway API [IMPLEMENTED]',
            rationale: 'Powers high-throughput asynchronous request interception, strict schema validation, and REST API management with comprehensive type contracts.',
          },
          {
            tech: 'PostgreSQL & Prisma ORM',
            role: 'Relational Policy & Audit Persistence [IMPLEMENTED]',
            rationale: 'Stores declarative policy definitions, agent identity profiles, approval queues, and sequential execution audit trails.',
          },
          {
            tech: 'Gmail API & Google Cloud Pub/Sub',
            role: 'Verified External API Execution [IMPLEMENTED]',
            rationale: 'Fully implemented OAuth 2.0 email dispatch and draft execution pipeline featuring parameter gating and idempotency validation.',
          },
          {
            tech: 'Google Gemini 2.5 Flash',
            role: 'Contextual Risk Classification [IMPLEMENTED]',
            rationale: 'Performs automated multi-factor risk scoring (0-100) and structured rationale synthesis for proposed agent operations.',
          },
          {
            tech: 'Multi-Database Adapters (SQL & NoSQL)',
            role: 'Cross-Database Security Layer [IN DEVELOPMENT]',
            rationale: 'Extensible database adapters for PostgreSQL, MySQL, MongoDB, Supabase, and Firebase verifying query permissions and table-level access.',
          },
          {
            tech: 'Redis & BullMQ',
            role: 'Asynchronous Event Infrastructure [IN DEVELOPMENT]',
            rationale: 'Coordinates distributed worker queues, deduplication keys, background event ingestion, and execution retry policies.',
          },
          {
            tech: 'Stripe & GitHub APIs',
            role: 'External Service Connectors [TARGET ARCHITECTURE]',
            rationale: 'Controlled execution pipelines for financial transaction limits, repository actions, and issue management.',
          },
        ],
        keyFeatures: [
          {
            title: '1. Runtime Action Interception [IMPLEMENTED]',
            desc: 'Intercepts agent tool requests in-flight before external API or database invocation, verifying identity and parameter schemas.',
          },
          {
            title: '2. Centralized Agent Activity Monitoring [IMPLEMENTED]',
            desc: 'Aggregates real-time agent operation streams, session context, and execution status into a unified monitoring dashboard.',
          },
          {
            title: '3. Policy-Based Security Decisions [IMPLEMENTED]',
            desc: 'Deterministic multi-condition rule evaluator enforcing recipient whitelists, numerical boundaries, and string regex matches (ALLOW, BLOCK, REVIEW).',
          },
          {
            title: '4. Contextual Risk Evaluation [IMPLEMENTED]',
            desc: 'Automated 0-100 risk scoring powered by Gemini 2.5 Flash, evaluating intrinsic operational risk and data exposure potential.',
          },
          {
            title: '5. Cross-System Integration Architecture [IN DEVELOPMENT]',
            desc: 'Modular execution registry managing dispatch across communication APIs, financial payment gateways, and code repositories.',
          },
          {
            title: '6. Multi-Database Monitoring Architecture [IN DEVELOPMENT]',
            desc: 'Standardized adapters for PostgreSQL, MySQL, MongoDB, Firebase, and Supabase tracking queries, schema access, and destructive operations.',
          },
          {
            title: '7. Permission and Access Control [IMPLEMENTED]',
            desc: 'Role-based platform access (ADMIN, REVIEWER, VIEWER) combined with per-agent cryptographic API keys and token validation.',
          },
          {
            title: '8. Sensitive Data Access Monitoring [IN DEVELOPMENT]',
            desc: 'Continuous egress scanning and regex classification to detect PII leakage, unauthorized table exports, and data exfiltration.',
          },
          {
            title: '9. Event-Driven Background Processing [IN DEVELOPMENT]',
            desc: 'BullMQ and Redis worker queues providing reliable asynchronous event ingestion, deduplication, and automated retry management.',
          },
          {
            title: '10. Controlled External API Execution [IMPLEMENTED]',
            desc: 'Production-verified Gmail OAuth 2.0 integration enforcing recipient constraints, content rules, and idempotency guarantees.',
          },
          {
            title: '11. Execution Outcome Verification [IN DEVELOPMENT]',
            desc: 'Cryptographic execution contract service comparing signed action snapshots against downstream receipts to verify actual delivery.',
          },
          {
            title: '12. Centralized Audit and Event Tracking [IMPLEMENTED]',
            desc: 'Comprehensive relational audit logging in PostgreSQL recording timestamps, agent IDs, argument snapshots, and decision rationales.',
          },
          {
            title: '13. Human Review for Sensitive Actions [IMPLEMENTED]',
            desc: 'Interactive review queue enabling administrators to inspect, approve, or reject high-risk operations prior to execution.',
          },
          {
            title: '14. Extensible Provider Connectors [PLANNED]',
            desc: 'Universal third-party connector SDK and runtime protocol for integrating proprietary enterprise cloud tools and SaaS platforms.',
          },
        ],
        implementationDetails: [
          {
            title: 'Interception Gateway & Idempotency Pipeline [IMPLEMENTED]',
            desc: 'Every agent operation is intercepted at the HTTP gateway layer. To eliminate duplicate execution from agent LLM retry loops, the gateway checks cryptographic idempotency keys in PostgreSQL before dispatching any external call.',
          },
          {
            title: 'Deterministic Policy Evaluation & Hybrid Risk Fallback [IMPLEMENTED]',
            desc: 'Incoming payloads are evaluated against prioritized declarative rules. If no explicit policy matches, the action falls back to an AI risk scorer (Gemini 2.5 Flash) that assigns an objective risk score (0-100) and triggers human review if thresholds are exceeded.',
          },
          {
            title: 'Multi-Database Adapter Framework [IN DEVELOPMENT]',
            desc: 'Constructed an extensible BaseDatabaseAdapter supporting PostgreSQL, MySQL, MongoDB, Firestore, Realtime DB, and Supabase. Each adapter intercepts queries, scans for destructive operations (DROP, TRUNCATE, broad DELETE), and tracks table access.',
          },
          {
            title: 'Execution Contracts & Reconciliation [IN DEVELOPMENT]',
            desc: 'Generates HMAC-signed execution contracts prior to dispatch. Following external API execution, the system reconciles the provider receipt against the contract, cleanly distinguishing [Decision: ALLOW | Execution: FAILED].',
          },
        ],
        dataFlow: [
          { step: '01', title: 'Action Proposal', desc: 'An autonomous AI agent submits a proposed action payload with an idempotency key to AgentGuard.' },
          { step: '02', title: 'Normalization & Ingestion', desc: 'AgentGuard normalizes the request structure, validates the API key, and binds agent metadata.' },
          { step: '03', title: 'Context & Identity Verification', desc: 'Agent identity, active task scope, and session trust boundaries are verified against database profiles.' },
          { step: '04', title: 'Runtime Interception', desc: 'The in-flight action is halted in the gateway middleware pending multi-tiered security evaluation.' },
          { step: '05', title: 'Declarative Policy Evaluation', desc: 'The policy engine evaluates action arguments against configured rules (recipient whitelists, limits).' },
          { step: '06', title: 'Contextual Risk Scoring', desc: 'If no rule explicitly matches, the contextual risk classifier evaluates the operation for intrinsic hazards.' },
          { step: '07', title: 'Security Decision Synthesis', desc: 'AgentGuard issues a deterministic verdict: ALLOW (proceed), BLOCK (halt & report), or REVIEW (enqueue for human approval).' },
          { step: '08', title: 'Controlled Adapter Dispatch', desc: 'If authorized, the action proceeds through the designated controlled execution connector with signed parameters.' },
          { step: '09', title: 'External System Processing', desc: 'The external service (e.g. Gmail API) or target database executes the constrained operation.' },
          { step: '10', title: 'Execution Outcome Verification', desc: 'AgentGuard inspects the provider response and reconciles expected vs actual execution results independently of authorization.' },
          { step: '11', title: 'Structured Audit Persistence', desc: 'Security verdicts, parameter snapshots, risk scores, and execution evidence are committed to the PostgreSQL audit log.' },
          { step: '12', title: 'Event-Driven Queue Processing', desc: 'Execution receipts and audit notifications are queued via BullMQ/Redis for downstream processing and UI telemetry.' },
        ],
        challenges: [
          {
            challenge: 'Decoupling Authorization Decisions from Execution Outcomes',
            decision: 'Authorizing an action does not ensure that external execution succeeds. External APIs encounter network timeouts, revoked permissions, or rate limits. Implemented an independent execution verification engine that explicitly pairs security decisions with execution statuses (e.g., [Decision: ALLOW | Execution: FAILED]) to ensure accurate audit reporting.',
          },
          {
            challenge: 'Cross-Provider Integration & Database Idiosyncrasies',
            decision: 'Relational SQL, document NoSQL, and external REST APIs represent data and permissions differently. Architected an extensible BaseDatabaseAdapter and unified executor registry normalizing disparate operations into standardized, auditable action payloads.',
          },
          {
            challenge: 'Mitigating Duplicate Executions from LLM Retries',
            decision: 'Autonomous agents frequently retry unconfirmed calls during high-latency periods, risking double-sends or duplicate database inserts. Implemented cryptographic idempotency key verification at the gateway entry point to guarantee exactly-once execution.',
          },
          {
            challenge: 'Safe Failure Feedback for Autonomous Runtimes',
            decision: 'Crashing or returning generic 500 errors breaks agent planning loops. Implemented structured JSON error payloads explaining exact policy violations without exposing internal infrastructure credentials, allowing agents to adjust their plans safely.',
          },
        ],
        resultsAndLimitations: {
          results: [
            'Verified Implemented Features: Functional action interception gateway with deterministic multi-condition policy evaluation (ALLOW / BLOCK / REVIEW).',
            'Verified Implemented Features: Production-verified Gmail OAuth 2.0 execution workflow with token refresh and idempotency verification.',
            'Verified Implemented Features: Automated contextual risk evaluation powered by Gemini 2.5 Flash with structured reasoning output.',
            'Verified Implemented Features: PostgreSQL relational audit persistence via Prisma recording full action snapshots, verdicts, and reviewer actions.',
            'In Active Development: Extensible database adapters for PostgreSQL, MySQL, MongoDB, Firebase, and Supabase unit-tested and actively being integrated.',
            'In Active Development: Cryptographic execution contract service reconciling signed intent hashes against external provider receipts.',
            'In Active Development: Event-driven BullMQ and Redis infrastructure for asynchronous job queues and background retry handling.',
          ],
          limitations: [
            'Current verified production execution centers on Gmail OAuth; full production deployments of multi-database and financial adapters are undergoing active hardening.',
            'Contextual risk evaluation relies on cloud LLM inference latency; caching and pre-computed risk heuristics are being established to reduce gateway overhead.',
            'High-concurrency distributed policy synchronization across multi-region agent clusters remains an active engineering roadmap target.',
            'Advanced natural language prompt injection defense is evolving toward localized AST and semantic classification models.',
          ],
        },
        futureImprovements: [
          'Phase 1: Strengthen existing runtime action interception, token management, and Gmail integration hardening.',
          'Phase 2: Establish centralized policy evaluation, automated risk assessment, and independent execution verification.',
          'Phase 3: Finalize the cross-system monitoring engine and provider-agnostic connector framework.',
          'Phase 4: Complete end-to-end database monitoring across PostgreSQL, MySQL, MongoDB, Redis, and additional providers.',
          'Phase 5: Deploy production-grade execution adapters for Stripe payment authorization and GitHub repository governance.',
          'Phase 6: Strengthen persistent event-driven processing, tamper-evident audit chaining, and enterprise operational reliability.',
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
    'BUILDING WEB EXPERIENCES',
    'EXPLORING DATA',
    'EXPERIMENTING WITH AI',
    'CREATING USEFUL TOOLS',
    'EXPLORING HOW SYSTEMS WORK',
    'TURNING IDEAS INTO PROJECTS',
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
    {
      title: 'Technology Job Simulation',
      issuer: 'Deloitte Australia / Forage',
      year: '2026',
      type: 'pdf',
      file: '/assets/certificates/Deloitte_Technology_Job_Simulation.pdf',
    },
  ],

  resume: {
    file: '/assets/resume/Aditya_Prakash_Resume.pdf',
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
