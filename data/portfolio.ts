import type {
  PortfolioConfig,
  Skill,
  Project,
  ExperienceEntry,
} from "@/types/portfolio";

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA - Edit these arrays to customize your portfolio!
// ─────────────────────────────────────────────────────────────────────────────

const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "languages", proficiency: 85, icon: "IconBrandTypescript" },
  { name: "Java", category: "languages", proficiency: 80, icon: "IconCoffee" },
  { name: "Python", category: "languages", proficiency: 75, icon: "IconBrandPython" },
  { name: "Go", category: "languages", proficiency: 60, icon: "IconBrandGolang" },
  { name: "SQL", category: "languages", proficiency: 80, icon: "IconDatabase" },
  { name: "Rust", category: "languages", proficiency: 45, icon: "IconSettingsCode" },

  // Frameworks
  { name: "React", category: "frameworks", proficiency: 80, icon: "IconBrandReact" },
  { name: "Next.js", category: "frameworks", proficiency: 75, icon: "IconBrandNextjs" },
  { name: "Spring Boot", category: "frameworks", proficiency: 70, icon: "IconLeaf" },
  { name: "Node.js", category: "frameworks", proficiency: 75, icon: "IconBrandNodejs" },
  { name: "Express", category: "frameworks", proficiency: 70, icon: "IconServer" },
  { name: "NestJS", category: "frameworks", proficiency: 65, icon: "IconBrandNestjs" },

  // Tools
  { name: "Docker", category: "tools", proficiency: 80, icon: "IconBrandDocker" },
  { name: "Kubernetes", category: "tools", proficiency: 55, icon: "IconCloudComputing" },
  { name: "Git", category: "tools", proficiency: 90, icon: "IconBrandGit" },
  { name: "CI/CD", category: "tools", proficiency: 70, icon: "IconRefresh" },
  { name: "Linux", category: "tools", proficiency: 85, icon: "IconBrandUbuntu" },
  { name: "Terraform", category: "tools", proficiency: 50, icon: "IconCloud" },

  // Databases
  { name: "PostgreSQL", category: "databases", proficiency: 85, icon: "IconDatabase" },
  { name: "MongoDB", category: "databases", proficiency: 70, icon: "IconBrandMongodb" },
  { name: "Redis", category: "databases", proficiency: 65, icon: "IconDatabase" },
  { name: "Elasticsearch", category: "databases", proficiency: 50, icon: "IconSearch" },
];

const projects: Project[] = [
  {
    id: "project-1",
    title: "Cloud Microservices Platform",
    description: "A scalable microservices architecture with service mesh, API gateway, and distributed tracing.",
    longDescription: "Built a production-grade microservices platform featuring service discovery, load balancing, circuit breakers, and centralized logging. Implemented event-driven communication using message queues and designed RESTful APIs following OpenAPI specifications.",
    techStack: ["Java", "Spring Boot", "Docker", "Kubernetes", "PostgreSQL", "RabbitMQ"],
    status: "completed",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
  },
  {
    id: "project-2",
    title: "Real-time Analytics Dashboard",
    description: "A full-stack analytics platform with real-time data streaming and interactive visualizations.",
    longDescription: "Designed and implemented a real-time analytics dashboard that processes millions of events per day. Features include customizable widgets, real-time charts, alerting system, and data export capabilities. Built with a focus on performance and scalability.",
    techStack: ["TypeScript", "React", "Node.js", "Redis", "PostgreSQL", "WebSocket"],
    status: "completed",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com",
    featured: true,
  },
  {
    id: "project-3",
    title: "Infrastructure as Code Toolkit",
    description: "CLI tools and Terraform modules for automating cloud infrastructure provisioning.",
    longDescription: "Created a comprehensive IaC toolkit that simplifies cloud infrastructure management. Includes custom Terraform modules, a CLI tool for deployment orchestration, and automated testing for infrastructure changes.",
    techStack: ["Go", "Terraform", "AWS", "Docker", "GitHub Actions"],
    status: "completed",
    repoUrl: "https://github.com",
    featured: true,
  },
  {
    id: "project-4",
    title: "API Gateway Service",
    description: "A custom API gateway with rate limiting, auth, and request transformation.",
    techStack: ["Go", "Redis", "Docker", "gRPC"],
    status: "completed",
    repoUrl: "https://github.com",
    featured: false,
  },
  {
    id: "project-5",
    title: "Event Sourcing Library",
    description: "A lightweight event sourcing library for Java applications with CQRS support.",
    techStack: ["Java", "PostgreSQL", "Kafka"],
    status: "in-progress",
    repoUrl: "https://github.com",
    featured: false,
  },
  {
    id: "project-6",
    title: "Distributed Task Scheduler",
    description: "A fault-tolerant distributed task scheduler built with Rust.",
    techStack: ["Rust", "Redis", "gRPC", "Tokio"],
    status: "planned",
    featured: false,
  },
];

const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    company: "Tech Corp",
    role: "Backend Engineer",
    startDate: "2023-06",
    endDate: null,
    description: "Designing and building scalable backend systems for a cloud-native platform.",
    highlights: [
      "Architected microservices handling 10k+ requests/second",
      "Reduced API latency by 40% through caching strategies",
      "Led migration from monolith to microservices",
    ],
    type: "work",
  },
  {
    id: "exp-2",
    company: "StartupXYZ",
    role: "Full Stack Developer",
    startDate: "2022-01",
    endDate: "2023-05",
    description: "Built core features for a SaaS product from MVP to production.",
    highlights: [
      "Developed RESTful APIs serving 50k+ users",
      "Implemented CI/CD pipelines reducing deploy time by 60%",
      "Mentored 2 junior developers",
    ],
    type: "work",
  },
  {
    id: "exp-3",
    company: "University of Technology",
    role: "Computer Science BSc",
    startDate: "2019-10",
    endDate: "2023-06",
    description: "Focused on software engineering, distributed systems, and algorithms.",
    highlights: [
      "Dean's list for academic excellence",
      "Thesis: Optimizing distributed consensus algorithms",
      "Teaching assistant for Data Structures course",
    ],
    type: "education",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FULL CONFIG - Assembled from the arrays above
// ─────────────────────────────────────────────────────────────────────────────

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "John Doe",
    title: "Backend Engineer",
    subtitle: "Building robust, scalable systems that power modern applications",
    bio: "I'm a backend-focused software engineer passionate about distributed systems, clean architecture, and developer tooling. I enjoy solving complex problems and building infrastructure that scales. When I'm not coding, I'm exploring new technologies, contributing to open source, or writing about software engineering.",
    email: "hello@example.com",
    location: "Warsaw, Poland",
    resumeUrl: "/resume.pdf",
    socialLinks: [
      { label: "GitHub", url: "https://github.com", icon: "IconBrandGithub" },
      { label: "LinkedIn", url: "https://linkedin.com", icon: "IconBrandLinkedin" },
      { label: "Twitter", url: "https://twitter.com", icon: "IconBrandX" },
    ],
  },
  skills,
  projects,
  experience,
  navItems: [
    { label: "About", sectionId: "about" },
    { label: "Skills", sectionId: "skills" },
    { label: "Projects", sectionId: "projects" },
    { label: "Experience", sectionId: "experience" },
    { label: "Contact", sectionId: "contact" },
  ],
};
