import { Experience } from "@/types/portfolio";

export const experienceData: Experience[] = [
  {
    id: "infosys-2025",
    year: "2025",
    period: "2025 — PRESENT",
    company: "Infosys",
    role: "Associate Consultant",
    location: "Bengaluru, India",
    description:
      "Driving architectural design, enterprise backend services in Java/Spring Boot, and integrating GenAI test automation pipelines into production workflows.",
    technologies: ["Java", "Spring Boot", "Microservices", "Spring AI", "Docker", "Playwright", "PostgreSQL"],
    contributions: [
      "Architected enterprise-grade Spring Boot microservices with reactive event handling and strict SLA adherence.",
      "Spearheaded multi-agent AI testing initiatives converting OpenAPI specs into executable validation suites.",
      "Collaborated with cross-functional global stakeholders to optimize backend response latencies and database queries.",
    ],
    isCurrent: true,
  },
  {
    id: "krushal-2024",
    year: "2024",
    period: "2024 — 2025",
    company: "Krushal Open Commerce",
    role: "Software Engineer",
    location: "Bengaluru, India",
    description:
      "Engineered high-concurrency commerce modules, RESTful APIs, and React web applications while enhancing automated QA pipelines.",
    technologies: ["Java", "Spring Boot", "React.js", "TypeScript", "PostgreSQL", "TestNG", "CI/CD"],
    contributions: [
      "Built resilient commerce checkout and inventory APIs handling spikes in concurrent transactional traffic.",
      "Implemented responsive frontend dashboards using React and TypeScript with accessible UI design patterns.",
      "Automated regression suites using TestNG and CI/CD gates, reducing deployment defect rates significantly.",
    ],
    isCurrent: false,
  },
  {
    id: "areteminds-2023",
    year: "2023",
    period: "2023 — 2024",
    company: "Aret(e)minds Technologies",
    role: "Software Engineer Trainee",
    location: "Bengaluru, India",
    description:
      "Developed foundational full-stack software development skills, Java backend engineering, test automation frameworks, and modern web application development.",
    technologies: ["Java", "Spring Boot", "React", "Python", "Git", "REST APIs"],
    contributions: [
      "Developed and documented secure REST endpoints following clean architecture and OOP principles.",
      "Authored unit and integration test suites covering critical service layers and edge cases.",
      "Assisted in crafting reusable frontend UI widgets and refactoring legacy script runners into automated workflows.",
    ],
    isCurrent: false,
  },
];
