import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "ai-testcase-gen",
    number: "01",
    title: "AI Agent-Based Testcase Generation System",
    tagline: "Autonomous OpenAPI-to-Test Multi-Agent Pipeline",
    description:
      "Multi-agent system that transforms OpenAPI specifications into executable Playwright and TestNG test suites.",
    technologies: [
      "Python",
      "FastAPI",
      "MongoDB",
      "AI Agents",
      "Playwright",
      "TestNG",
      "Docker",
    ],
    highlights: [
      {
        label: "ARCHITECTURE",
        value:
          "Multi-agent loop featuring spec ingestion, AST schema extraction, prompt synthesis, and sandboxed test validation.",
      },
      {
        label: "KEY CHALLENGE",
        value:
          "Eliminating LLM endpoint hallucinations and ensuring synthesized assertion code compiles and executes idempotently.",
      },
      {
        label: "OUTCOME",
        value:
          "Accelerated test coverage ramp-up by [TBD METRIC]% while generating production-grade test suites.",
      },
    ],
    links: {
      // TODO: Replace with live demo URL if available
      live: "#",
      // TODO: Replace with actual repository link when public
      github: "#",
      // TODO: Replace with case study article link
      caseStudy: "#",
    },
    featured: true,
  },
  {
    id: "ai-mobile-test-platform",
    number: "02",
    title: "AI Mobile Test Automation Platform",
    tagline: "Natural-Language Android & Wear OS Test Orchestrator",
    description:
      "AI-assisted Android and Wear OS automation workflow for generating and executing natural-language test scenarios.",
    technologies: [
      "Python",
      "Kotlin",
      "Android",
      "Mobly",
      "AI",
      "Accessibility Testing",
    ],
    highlights: [
      {
        label: "ARCHITECTURE",
        value:
          "Python device orchestrator driving Google's Mobly framework, ADB instrumentation, and UI accessibility node trees.",
      },
      {
        label: "KEY CHALLENGE",
        value:
          "Handling device UI state fluctuations, varying display aspect ratios, and asynchronous screen transitions without flakiness.",
      },
      {
        label: "OUTCOME",
        value:
          "Streamlined end-to-end device testing workflows across dual-device testbeds with automated trace recordings.",
      },
    ],
    links: {
      // TODO: Replace with live demo URL if available
      live: "#",
      // TODO: Replace with actual repository link when public
      github: "#",
      // TODO: Replace with case study article link
      caseStudy: "#",
    },
    featured: true,
  },
  {
    id: "enterprise-microservices",
    number: "03",
    title: "Enterprise Cloud Microservices Platform",
    tagline: "High-Throughput Distributed Architecture",
    description:
      "Scalable Java and Spring Boot cloud microservices platform engineered for high-throughput transactional messaging and resilient data pipelines.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
    ],
    highlights: [
      {
        label: "ARCHITECTURE",
        value:
          "Domain-driven microservices architecture with API Gateway routing, OAuth2/JWT security filters, and Kafka message brokers.",
      },
      {
        label: "KEY CHALLENGE",
        value:
          "Guaranteeing transactional consistency across distributed services with circuit-breaker patterns and zero data loss.",
      },
      {
        label: "OUTCOME",
        value:
          "Delivered sub-100ms API response SLAs with resilient fallback strategies and [TBD METRIC]% uptime.",
      },
    ],
    links: {
      // TODO: Replace with live demo URL if available
      live: "#",
      // TODO: Replace with actual repository link when public
      github: "#",
      // TODO: Replace with case study article link
      caseStudy: "#",
    },
    featured: true,
  },
];
