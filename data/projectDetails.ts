/**
 * projectDetailsData — tam vaka çalışması verisi.
 *
 * Seed script bu diziyi kullanarak mevcut project dokümanlarını
 * (seed-project-0 / 1 / 2) showcase + case-study alanlarıyla birleştirerek
 * createOrReplace yapar.
 *
 * galleryImages: /img/works/project-details/ altındaki mevcut görsellerle
 * eşleştirildi (template'in kendi demo görselleri).
 * nextImage: /img/works/project-details/next01.webp.
 */
export const projectDetailsData = [
  {
    // Showcase alanları (seed-project-0 ile aynı ID)
    id: "0",
    titleLines: ["Editorial", "illustrations set"],
    bgImageSrc: "/img/works/1920x1280_pr01.webp",
    cardImageSrc: "/img/works/700x700_pr01.webp",
    cardImageAlt: "Editorial illustrations project preview",
    cursorText: "View Work",
    href: "/works/editorial-illustrations-set",
    tags: ["Design", "Illustrations", "Packaging", "Marketing"],

    // Case study alanları
    slug: "editorial-illustrations-set",
    order: 1,
    subtitle: "Digital agency & personal portfolio React Nextjs Template",
    tagsColA: ["Website", "UI/UX Design", "Development", "Promotions"],
    tagsColB: ["Branding", "Art Direction", "Marketing"],

    overviewLead:
      "Stand out and express your uniqueness with Azurio — a vibrant and minimal React Nextjs Template for creatives, studios and freelancers.",
    overviewSpan:
      "Impress your website visitors with a clean, stylish layout and stunning visuals.",
    liveUrl: "https://ibthemes.dev",
    clientName: "IB Themes",
    industries: "React Nextjs Template",
    projectDate: "October 2025 - January 2026",

    challengeLead:
      "The challenge was to create a template that feels bold and contemporary without overwhelming content or performance.",
    challengeSpan:
      "It needed to serve a wide range of creatives while remaining flexible and easy to customize for different project types and personal styles.",
    services: [
      {
        name: "Art direction",
        description:
          "Visual decisions were guided by a strong creative framework built around clarity and balance. Layout, typography, and motion work together to create a consistent and engaging experience.",
      },
      {
        name: "Branding",
        description:
          "The project relies on a minimal yet expressive identity that highlights Azurio's character. Carefully selected colors, type, and graphic accents reinforce recognition and visual cohesion.",
      },
      {
        name: "Web development",
        description:
          "Implementation focused on modern front-end standards and performance. Clear structure, smooth interactions and clean code provide flexibility and long-term maintainability.",
      },
    ],

    solutionLead:
      "Azurio was built using modern web technologies with a focus on flexibility.",
    solutionSpan:
      "Clean React Nextjs structure, scalable CSS architecture and GSAP-powered animations create smooth interactions without sacrificing speed.",
    techStack: [
      {
        name: "HTML5 & CSS3",
        description:
          "At the core of the project lies a semantic html structure paired with modern css techniques. Flexible layouts, responsive behavior and clean styles ensure consistency across devices.",
      },
      {
        name: "Node.js & NPM",
        description:
          "A simple build environment was used to manage dependencies and streamline development. Npm packages support tooling, workflow automation and easier project maintenance.",
      },
      {
        name: "GSAP",
        description:
          "Animations are powered by gsap to create smooth, precise motion throughout the interface. Scroll-based effects and micro-interactions enhance usability.",
      },
    ],

    galleryImages: [
      "/img/works/project-details/details01.webp",
      "/img/works/project-details/details02.webp",
      "/img/works/project-details/details03.webp",
      "/img/works/project-details/details04.webp",
      "/img/works/project-details/details05.webp",
      "/img/works/project-details/details06.webp",
    ],

    feedbackQuoteLead:
      "Working with Rayo team was an absolute pleasure! They took the time to understand our business needs and translated them into a beautifully designed, user-friendly website.",
    feedbackQuoteSpan:
      "The team's attention to detail, creativity, and technical expertise exceeded our expectations. We've received so much positive feedback from our customers already.",
    feedbackAuthorName: "John Lemon",
    feedbackAuthorRole: "SEO in",
    feedbackAuthorCompany: "IB Themes",
    feedbackAuthorCompanyUrl: "#",
    feedbackAuthorPhoto: "/img/avatars/300x300_ava-01.webp",
    nextImage: "/img/works/project-details/next01.webp",
  },

  {
    id: "1",
    titleLines: ["Interactive", "concept"],
    bgImageSrc: "/img/works/1920x1280_pr02.webp",
    cardImageSrc: "/img/works/700x700_pr02.webp",
    cardImageAlt: "Interactive concept project preview",
    cursorText: "Behance",
    href: "/works/interactive-concept",
    tags: ["UI/UX", "Development", "Brand", "Web App"],

    slug: "interactive-concept",
    order: 2,
    subtitle: "Immersive UI experiment for next-gen web interactions",
    tagsColA: ["Interaction Design", "UI/UX", "Prototyping", "Motion"],
    tagsColB: ["WebGL", "Creative Coding", "Research"],

    overviewLead:
      "An experimental interface concept exploring the boundaries of web interactivity and motion design.",
    overviewSpan:
      "Every micro-interaction was crafted to feel natural and responsive, turning navigation into an experience in itself.",
    liveUrl: "https://ibthemes.dev",
    clientName: "Self-initiated",
    industries: "UI/UX Experiment",
    projectDate: "March 2025 - June 2025",

    challengeLead:
      "The main challenge was pushing browser capabilities to create fluid, GPU-accelerated experiences without sacrificing accessibility.",
    challengeSpan:
      "Balancing visual fidelity with load performance required careful architecture decisions and progressive enhancement strategies.",
    services: [
      {
        name: "Concept design",
        description:
          "Exploration started with rough sketches and rapid prototypes to validate the interaction model before committing to full implementation.",
      },
      {
        name: "Creative coding",
        description:
          "Custom WebGL shaders and Canvas-based effects were developed from scratch to achieve the intended visual language.",
      },
      {
        name: "Motion design",
        description:
          "GSAP timelines and CSS transitions were orchestrated to produce seamless, layered animations that guide the user's attention.",
      },
    ],

    solutionLead:
      "The solution layered WebGL effects over a standard DOM structure, keeping semantics and accessibility intact.",
    solutionSpan:
      "A performance budget enforced progressive enhancement — core content remained fast while decorative layers loaded asynchronously.",
    techStack: [
      {
        name: "Three.js / WebGL",
        description:
          "3D effects and shader-based transitions gave the project its signature visual quality without blocking the main thread.",
      },
      {
        name: "GSAP ScrollTrigger",
        description:
          "Scroll-driven animations are synchronized to page sections with millisecond precision, creating a cinematic feel.",
      },
      {
        name: "React & Next.js",
        description:
          "The component architecture enabled fast iteration and clean code separation between data, logic, and presentation layers.",
      },
    ],

    galleryImages: [
      "/img/works/project-details/details01.webp",
      "/img/works/project-details/details02.webp",
      "/img/works/project-details/details03.webp",
      "/img/works/project-details/details04.webp",
      "/img/works/project-details/details05.webp",
      "/img/works/project-details/details06.webp",
    ],

    feedbackQuoteLead:
      "The team delivered something we couldn't have imagined on our own. Every detail felt intentional and the final result was beyond our expectations.",
    feedbackQuoteSpan:
      "Collaboration was smooth from kickoff to handoff. They listened, adapted, and delivered on time with zero compromise on quality.",
    feedbackAuthorName: "Sara Bloom",
    feedbackAuthorRole: "Creative Director at",
    feedbackAuthorCompany: "Studio Nord",
    feedbackAuthorCompanyUrl: "#",
    feedbackAuthorPhoto: "/img/avatars/300x300_ava-02.webp",
    nextImage: "/img/works/project-details/next01.webp",
  },

  {
    id: "2",
    titleLines: ["Creative", "studio template"],
    bgImageSrc: "/img/works/1920x1280_pr03.webp",
    cardImageSrc: "/img/works/700x700_pr03.webp",
    cardImageAlt: "Creative studio template project preview",
    cursorText: "View Work",
    href: "/works/creative-studio-template",
    tags: ["Design", "Illustrations", "Packaging", "Marketing"],

    slug: "creative-studio-template",
    order: 3,
    subtitle: "A versatile portfolio template built for creative studios",
    tagsColA: ["Brand Identity", "Web Design", "Typography", "Layout"],
    tagsColB: ["Animation", "Responsive", "CMS Ready"],

    overviewLead:
      "A multipurpose template system designed to empower creative studios with a bold, expressive online presence.",
    overviewSpan:
      "Modular sections and flexible typography allow each studio to make it truly their own without touching a single line of code.",
    liveUrl: "https://ibthemes.dev",
    clientName: "IB Themes",
    industries: "Portfolio Template",
    projectDate: "July 2025 - October 2025",

    challengeLead:
      "Designing for an unknown end user meant every component had to work in isolation as well as in complex, mixed-content layouts.",
    challengeSpan:
      "The template needed to look polished straight out of the box while remaining genuinely flexible for diverse studio personalities.",
    services: [
      {
        name: "System design",
        description:
          "A cohesive design token system was established early to ensure visual consistency across all template variants and color modes.",
      },
      {
        name: "Component architecture",
        description:
          "Reusable, well-documented components let customers swap content without breaking layouts or disrupting animation sequences.",
      },
      {
        name: "Documentation",
        description:
          "Detailed setup guides and inline comments reduce onboarding time and help non-technical users get to a live site quickly.",
      },
    ],

    solutionLead:
      "A token-driven design system unified the template's look and feel across all pages and breakpoints.",
    solutionSpan:
      "Tailored GSAP presets ensured every animation variant inherited the same timing curves, keeping motion coherent throughout.",
    techStack: [
      {
        name: "Next.js App Router",
        description:
          "File-based routing and server components keep the codebase clean, enabling fast initial loads and easy content management.",
      },
      {
        name: "Sanity CMS",
        description:
          "A structured content model lets non-developers edit copy, swap images, and reorder sections directly from the Studio dashboard.",
      },
      {
        name: "GSAP & CSS",
        description:
          "Animation presets are defined once and reused site-wide, ensuring smooth, consistent motion without repetitive code.",
      },
    ],

    galleryImages: [
      "/img/works/project-details/details01.webp",
      "/img/works/project-details/details02.webp",
      "/img/works/project-details/details03.webp",
      "/img/works/project-details/details04.webp",
      "/img/works/project-details/details05.webp",
      "/img/works/project-details/details06.webp",
    ],

    feedbackQuoteLead:
      "This template saved us weeks of work. The code quality is excellent and the design system made customization straightforward.",
    feedbackQuoteSpan:
      "Our clients love the end result. The animations and layout feel premium — exactly the level of polish we needed to attract bigger projects.",
    feedbackAuthorName: "Marco Reyes",
    feedbackAuthorRole: "Founder at",
    feedbackAuthorCompany: "Forma Studio",
    feedbackAuthorCompanyUrl: "#",
    feedbackAuthorPhoto: "/img/avatars/300x300_ava-03.webp",
    nextImage: "/img/works/project-details/next01.webp",
  },
];
