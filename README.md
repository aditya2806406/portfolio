# Aditya Prakash — Personal Portfolio

A personal portfolio showcasing my projects, technical skills, education, certifications, and journey in software development, data analytics, and artificial intelligence.

**Live website:** Add your deployed Vercel URL here  
**GitHub repository:** https://github.com/aditya2806406/portfolio

---

## Table of Contents

- [Overview](#overview)
- [Goals](#goals)
- [Features](#features)
- [Website Sections](#website-sections)
- [Featured Projects](#featured-projects)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Build and Deployment](#build-and-deployment)
- [Content and Asset Management](#content-and-asset-management)
- [Accessibility and Responsive Design](#accessibility-and-responsive-design)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Contact](#contact)
- [License](#license)

---

## Overview

This website is my personal portfolio and online professional profile. It brings my work, technical interests, education, certifications, and contact information together in one place.

The experience uses a film-inspired visual language: atmospheric backgrounds, layered visual effects, animated transitions, interactive project presentations, and a coordinated Colour/Noir appearance mode. These elements support the content rather than replace it—the main goal is to make my work easy to explore and understand.

The site is implemented as a lightweight, client-side single-page application using **HTML, CSS, and JavaScript ES modules**, powered by **Vite** for local development and production builds. It does not require a React runtime or a dedicated application backend for its current portfolio experience.

## Goals

- Present my projects and technical interests in a clear, professional format.
- Explain each project's problem, architecture, technologies, implementation, trade-offs, and possible next steps.
- Make skills, education, certifications, and career milestones easy to browse.
- Provide straightforward access to my résumé and professional contact links.
- Deliver a distinctive interactive experience while maintaining responsive layouts and usability.
- Keep portfolio content and project information organized so it can be updated as my experience grows.

## Features

### Interactive visual experience

- **Film-inspired visual direction:** A consistent visual system inspired by film, reels, frames, and production notes.
- **Atmospheric background:** Canvas-based bokeh effects and layered visual elements create depth.
- **Gyroscopic graphics:** Canvas-rendered rings and other visual elements respond to page context and user interaction.
- **Film grain:** A subtle texture adds to the visual style where supported.
- **Animated page transitions:** Iris-style transitions connect the main views.
- **Custom cursor effects:** Cursor styling and interaction feedback enhance supported desktop interactions.
- **Scroll reveals:** Content appears progressively as it enters the viewport.
- **Scroll-linked effects:** Selected elements respond to scroll position and movement.
- **Colour/Noir mode:** Switch between the primary colour palette and a monochrome-inspired appearance.

### Project exploration

- Browse featured projects through an interactive 3D-style reel.
- Filter projects by category.
- Open a dedicated case-study view for a project.
- Explore project problems, goals, architecture, component breakdowns, technologies, features, implementation details, data flow, challenges, limitations, and possible improvements.
- Navigate between the work overview and individual case studies.

### Skills and credentials

- Browse skills through interactive category filters.
- Explore skill groups covering programming, frontend, backend, databases and tools, analytics, and machine learning/vision.
- View education and career milestones.
- Browse available certificate assets through the credentials section and certificate viewer.

### Navigation and responsive behavior

- Four main views: **The Reel**, **Selected Scenes**, **Director's Notes**, and **The Long Take**.
- Hash-based navigation switches views without a full-page reload.
- Responsive layouts adapt to desktop, tablet, and mobile screen sizes.
- Keyboard interaction and reduced-motion preferences are considered in relevant interface components.

### Résumé and contact

- Access the résumé wherever the relevant résumé link is presented.
- Find professional contact details and profile links.
- View available certification and project information without navigating to a separate website.

> The exact availability of an individual interaction can depend on the browser, device capabilities, and the assets included in the repository.

## Website Sections

### 1. Home — “The Reel”

The landing view introduces me and establishes the visual identity of the site.

It includes:
- A prominent name and professional introduction.
- Animated typography and interactive visual effects.
- A flashlight-style text interaction.
- Scroll-responsive presentation elements.
- A filmstrip-inspired introduction to selected work.

The purpose of this view is to establish who I am and guide visitors toward my work and background.

### 2. Work — “Selected Scenes”

This section presents the featured projects as an interactive collection.

It includes:
- A 3D-style project reel.
- Project-category filters.
- Project cards and interactive previews.
- Dedicated case-study views for the featured projects.
- Navigation between the project collection and case studies.

The case studies communicate the problem being addressed, the solution, technical architecture, implementation approach, key decisions, known limitations, and potential future work.

### 3. About — “Director's Notes”

This section provides more detail about my background and technical capabilities.

It includes:
- An introduction and professional background.
- Grouped technical skills and interactive skill filters.
- Skill proficiency indicators where configured in the portfolio data.
- Education and certification information.
- A contact-oriented section and available profile links.
- Certificate viewing functionality for supported assets.

Any skill, proficiency, credential, or achievement displayed should reflect the information maintained in the project's data and assets.

### 4. Journey — “The Long Take”

This section presents my education and development journey in a timeline-oriented layout.

It is designed to help visitors understand key milestones, learning progress, and the direction of my technical interests. Content is maintained in the portfolio's central data and page markup.

---

## Featured Projects

The portfolio currently highlights the following projects. These are high-level summaries; individual case studies contain further detail.

### AgriScan — Crop Disease Detection and Treatment Advisor

AgriScan is a crop-disease assistance project focused on analyzing leaf images and presenting a predicted disease, confidence information, and treatment guidance.

**Technologies and methods:** Python, PyTorch, MobileNetV2, computer vision, and Grad-CAM visual explanations.

**Project focus:**
- Image-based crop disease prediction.
- Confidence-aware result presentation.
- Visual explanations using Grad-CAM.
- Treatment guidance.
- Exploration of nearby agricultural store locations.

Predictions from a machine-learning model should be treated as assistance rather than a substitute for expert agricultural advice.

### AgentGuard — Runtime Security for AI Agent Actions

AgentGuard is designed as a security layer between an AI agent and external services. It evaluates proposed actions against configured policies before allowing an action to proceed.

**Technologies and methods:** TypeScript, Node.js, Express, PostgreSQL/Prisma, Redis, and WebSocket-related components, as implemented in the project.

**Project focus:**
- Policy-based action decisions.
- Allow/block decisions with reasoning.
- Action execution and audit information.
- External-service integrations, including Gmail integration.
- A foundation for extending controls to additional services.

The implemented integrations and policy coverage may vary by project version. Do not assume every planned integration is complete.

### SarkariSetu — Government Scheme Discovery

SarkariSetu is a web project focused on helping users discover relevant government schemes and access related information.

**Technologies:** React/Next.js-related frontend components, Node.js, Express, MongoDB Atlas, and authentication/integration components used in the project.

**Project focus:**
- Government scheme information and discovery.
- Web-based user interaction.
- Database-backed scheme content.
- Search and assistance features, where configured.

### Supply Chain Delay Analytics

This project explores supply-chain data and delay patterns through a data analytics dashboard.

**Technologies:** Python, Pandas, Scikit-learn, and Streamlit.

**Project focus:**
- Data preparation and analysis.
- Exploration of factors associated with supply-chain delays.
- Visual summaries through a Streamlit dashboard.
- Data-driven interpretation of operational patterns.

Results and metrics should be taken from the actual analysis rather than inferred from the project title.

---

## Technology Stack

The portfolio website itself is distinct from the technologies used inside its showcased projects.

### Portfolio website

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Layout, responsive styling, animation, themes, and visual effects |
| JavaScript ES modules | Navigation, interactions, content rendering, and visual behavior |
| Vite | Local development server and production build |
| Canvas 2D | Atmospheric and gyroscopic visual effects |
| Intersection Observer API | Scroll-reveal behavior |
| Git and GitHub | Version control and source hosting |
| Vercel | Intended hosting and deployment platform |

The current portfolio implementation uses vanilla JavaScript modules. React, Three.js, React Three Fiber, GSAP, and Framer Motion are not required by the current implementation described here.

### Technologies used in featured projects

The featured projects have their own stacks. Depending on the project, these include Python, PyTorch, MobileNetV2, Pandas, Scikit-learn, Streamlit, TypeScript, Node.js, Express, PostgreSQL, Prisma, Redis, React/Next.js, and MongoDB Atlas.

These project-specific technologies are not necessarily dependencies of the portfolio website.

---

## Project Structure

The main source code is organized into page modules, shared effects, data, and styles. This is a guide to important files; assets and configuration may change as the project evolves.

```text
portfolio/
├── public/
│   ├── assets/
│   │   ├── certificates/
│   │   ├── portrait/
│   │   └── resume/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── about.js
│   ├── background.js
│   ├── cinematic-effects.js
│   ├── cursor.js
│   ├── data.js
│   ├── gyro.js
│   ├── home.js
│   ├── journey.js
│   ├── loader.js
│   ├── main.js
│   ├── mode.js
│   ├── reel.js
│   ├── reveal.js
│   ├── router.js
│   ├── scroll.js
│   └── styles/
│       └── main.css
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.js
└── README.md
```

### Important modules

- `index.html` — main HTML entry point and page markup.
- `src/main.js` — initializes the application and its modules.
- `src/router.js` — coordinates hash-based view navigation.
- `src/data.js` — central source for portfolio content, project information, skill categories, and related data.
- `src/home.js` — home-view interactions and presentation behavior.
- `src/reel.js` — work view, project reel, filters, and case-study rendering.
- `src/about.js` — about view, skills, credentials, and related interactions.
- `src/journey.js` — journey/timeline view.
- `src/reveal.js` — scroll-reveal initialization and observation of dynamic content.
- `src/background.js` — atmospheric canvas background.
- `src/gyro.js` — gyroscopic canvas effects.
- `src/cinematic-effects.js` — shared cinematic visual effects.
- `src/cursor.js` — cursor interaction effects.
- `src/loader.js` — loading experience and transition behavior.
- `src/mode.js` — Colour/Noir mode switching.
- `src/scroll.js` — scroll-related behavior.
- `src/styles/main.css` — main visual system, responsive rules, layouts, and animations.

The exact implementation should always be checked in the current source files; this section is an architectural guide.

---

## Getting Started

### Prerequisites

Install:
- Node.js (a version supported by the installed Vite version).
- npm, included with Node.js.
- Git, if cloning or contributing to the repository.

Check your installations:

```bash
node --version
npm --version
git --version
```

### 1. Clone the repository

```bash
git clone https://github.com/aditya2806406/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite prints a local URL in the terminal, usually similar to:

```text
http://localhost:5173/
```

Open that URL in your browser. If Vite prints a different port, use the URL shown in the terminal.

### 4. Preview the production build locally

```bash
npm run build
npm run preview
```

Open the preview URL printed by Vite to test the built website.

---

## Available Commands

The scripts in `package.json` are authoritative. These commands match the current project workflow.

| Command | Purpose |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Generate the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npx --no-install tsc -b` | Run the configured TypeScript project build checks |

The website is implemented in JavaScript, but TypeScript project configuration is also present. Run the commands above to verify the current configuration.

---

## Build and Deployment

The website can be deployed as a static frontend because its current portfolio experience does not require a separate application server.

### Production build

Run:

```bash
npm run build
```

Vite generates the deployable output in:

```text
dist/
```

Deploy the generated production output through the hosting platform's build process; do not use `src/` as the deployment output directory.

### Deploying with Vercel

1. Push the project to GitHub.
2. Sign in to Vercel using GitHub.
3. Import the `aditya2806406/portfolio` repository.
4. Set the framework preset to **Vite**.
5. Set the root directory to `./`.
6. Set the build command to `npm run build`.
7. Set the output directory to `dist`.
8. Deploy the project.

The install command can remain `npm install`.

After deployment, test the live site on desktop and mobile. Check navigation, project case studies, filters, visual effects, certificate viewing, and résumé links. Verify that the résumé file opens correctly before considering deployment complete.

### Updating the live website

After making changes locally:

```bash
npm run build
git add -A
git commit -m "Describe your change"
git push
```

Vercel can create a new deployment automatically when a connected Git branch receives a push. Confirm the production branch and deployment settings in Vercel before relying on automatic deployments.

---

## Content and Asset Management

### Updating portfolio content

Use `src/data.js` as the primary place to look for structured portfolio content, including:

- Name and professional introduction.
- Project metadata and case-study content.
- Project categories.
- Skill groups and skill information.
- Education and timeline milestones.
- Certification and related content.

Some presentation content also lives in `index.html` and the page modules. When editing content, search for the relevant text before changing it, and avoid maintaining conflicting copies of the same information.

### Adding or updating a project

1. Add or update the project's metadata and case-study content in `src/data.js`.
2. Ensure the project has the category and identifier expected by the work view.
3. Add project images or other assets under the appropriate directory in `public/assets/`.
4. Check that the project appears in the work reel and its category filter.
5. Open its case study and test the content, architecture presentation, and navigation.
6. Run `npm run build` and test the production preview.

Keep project descriptions factual. Include measured results only when verified, and distinguish implemented features from planned improvements.

### Updating skills and certifications

1. Update the relevant skill or credential data.
2. Add the corresponding asset under `public/assets/` if the interface expects a file.
3. Confirm that the item appears in the correct filter or viewer.
4. Test the certificate viewer and keyboard dismissal behavior where applicable.
5. Rebuild and test the site.

### Updating the résumé

The repository has résumé files at:

```text
public/assets/resume/resume.pdf
public/Aditya_Prakash_Resume.pdf
```

If both paths are used by the interface, replace both with the intended valid PDF so they remain consistent. Confirm that the resulting files open correctly and that the live download link points to the intended résumé.

### Portrait and certificate assets

Place assets in the directory expected by the relevant component and update the corresponding data or markup. Use appropriate file formats and sizes to avoid unnecessarily increasing the page's download size.

---

## Accessibility and Responsive Design

The project aims to support a usable experience across different screen sizes and input preferences.

When changing the interface:

- Preserve semantic HTML and meaningful link/button labels.
- Maintain visible keyboard focus indicators.
- Keep navigation and interactive controls usable without a mouse wherever supported.
- Respect the user's reduced-motion preference.
- Check layout behavior at mobile, tablet, and desktop widths.
- Ensure text remains readable against visual effects and background layers.
- Avoid relying only on colour to communicate an important state.
- Test keyboard behavior for overlays and certificate viewing.
- Keep effects from blocking access to the content.

Visual effects should be simplified where device performance or accessibility preferences require it.

## Troubleshooting

### The development server does not start

Check that Node.js and npm are installed, then run:

```bash
npm install
npm run dev
```

If a port is occupied, use the alternate URL printed by Vite or stop the other process using that port.

### The production build fails

Run:

```bash
npm run build
```

Read the first relevant error in the terminal and check the file and line it identifies. Confirm that imports use correct paths and filename casing.

### Changes do not appear in the browser

- Save your files.
- Check the browser console for JavaScript errors.
- Reload the page.
- If testing production, rebuild with `npm run build` and restart `npm run preview`.

### An asset or résumé link fails

- Confirm that the file exists under `public/`.
- Check the URL used by the component. Files inside `public/` are normally served from the site root, not from a `/public/` URL prefix.
- Check filename spelling and letter casing.
- Open the asset directly in the browser to confirm it is valid.

### A route or case study does not open

Check the hash route, project identifier, and router logic in `src/router.js` and `src/reel.js`. Test both navigation through the interface and a direct page refresh.

### Vercel deployment fails

- Confirm the repository and branch connected to Vercel.
- Confirm that the root directory is `./`.
- Confirm the build command is `npm run build`.
- Confirm the output directory is `dist`.
- Review the deployment build logs for the first actual error.

---

## Future Improvements

Possible future improvements include:

- Add more verified project case studies and demonstrations.
- Improve performance through profiling on lower-powered devices.
- Expand accessibility testing across keyboard navigation, screen readers, and reduced-motion settings.
- Add automated checks for important routes, links, and assets.
- Improve image optimization and loading behavior.
- Keep project outcomes, skills, and milestones updated as new work is completed.
- Add analytics only if useful and with appropriate privacy considerations.

These are possible improvements, not claims that they are already implemented.

## Contact

**Aditya Prakash**  
B.Tech Computer Science and Engineering — Data Analytics

- **Email:** [prakashaditya2806@gmail.com](mailto:prakashaditya2806@gmail.com)
- **GitHub:** [github.com/aditya2806406](https://github.com/aditya2806406)
- **LinkedIn:** [linkedin.com/in/aditya-prakash-67302a347](https://www.linkedin.com/in/aditya-prakash-67302a347)

For project questions, collaboration, or professional opportunities, use the contact details above.

## License

No license is currently specified in this README. Unless a license is added to the repository, do not assume that the source code is available for unrestricted reuse or redistribution.

---

*Built to document my work, learning, and growth in software development, data analytics, and AI.*
