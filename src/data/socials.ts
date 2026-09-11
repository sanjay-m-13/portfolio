import { SocialLink, PhilosophyPrinciple } from "@/types/portfolio";

export const socialsData: SocialLink[] = [
  {
    id: "email",
    label: "EMAIL ME",
    // TODO: Replace with user email address
    url: "mailto:sanjaym.dev@example.com",
    kind: "email",
    isPlaceholder: true,
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    // TODO: Replace with actual LinkedIn profile URL
    url: "https://linkedin.com/in/sanjaym",
    kind: "linkedin",
    isPlaceholder: true,
  },
  {
    id: "github",
    label: "GITHUB",
    // TODO: Replace with actual GitHub profile URL
    url: "https://github.com/sanjaym",
    kind: "github",
    isPlaceholder: true,
  },
];

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: "01",
    title: "DESIGN FOR CHANGE",
    description:
      "Build modular systems with strict boundaries that are straightforward to refactor, scale, and evolve as requirements shift.",
    keyRule: "Loose coupling, high cohesion, clear interface contracts.",
  },
  {
    number: "02",
    title: "AUTOMATE THE REPETITIVE",
    description:
      "Harness agentic workflows, deterministic CI/CD, and automated test generators to eliminate manual toil and catch regressions early.",
    keyRule: "If a task is executed three times, write code to automate it.",
  },
  {
    number: "03",
    title: "OBSERVE THE SYSTEM",
    description:
      "Software must be debuggable before it runs in production. Instrumentation, logs, tracing, and deterministic tests provide true confidence.",
    keyRule: "Observability is a first-class engineering deliverable.",
  },
  {
    number: "04",
    title: "KEEP THE UX SIMPLE",
    description:
      "Underneath great user experiences lies disciplined backend design. Complex engineering should result in predictable, transparent, and swift interfaces.",
    keyRule: "Hide distributed complexity behind minimal, delightful surfaces.",
  },
];
