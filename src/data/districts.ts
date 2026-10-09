import {
  Experience,
  Profile,
  Project,
  SkillCategory,
  SocialLink,
} from "@/types/portfolio";
import { profileData } from "./profile";
import { skillCategories } from "./skills";
import { projectsData } from "./projects";
import { experienceData } from "./experience";
import { socialsData } from "./socials";

export interface DistrictProfileData {
  profile?: Profile;
  experienceSummary?: Experience[];
}

export interface DistrictSkillData {
  category?: SkillCategory;
  categories?: SkillCategory[];
  highlights?: string[];
}

export interface DistrictContactData {
  socials?: SocialLink[];
  email?: string;
}

export type DistrictContentData =
  | DistrictProfileData
  | DistrictSkillData
  | Project[]
  | DistrictContactData
  | undefined;

export interface DistrictConfig {
  id: string;
  name: string;
  codeName: string;
  subtitle: string;
  position: [number, number, number]; // [x, y, z] in 3D world space
  size: [number, number, number]; // [width, height, depth] for 3D building mesh
  color: string;
  secondaryColor: string;
  iconName: string;
  description: string;
  triggerRadius: number; // 3D sphere proximity trigger
  buildingType: "skyscraper" | "lab" | "headquarters" | "archive" | "terminal" | "hub";
  content: {
    type: "profile" | "skills" | "projects" | "experience" | "contact";
    title: string;
    data: DistrictContentData;
  };
}

export const DISTRICTS: DistrictConfig[] = [
  {
    id: "sanjay-hq",
    name: "SANJAY HQ",
    codeName: "DISTRICT 01 // CORE",
    subtitle: "Command Center & Bio",
    position: [0, 0, 0],
    size: [10, 12, 10],
    color: "#3b82f6",
    secondaryColor: "#60a5fa",
    iconName: "shield",
    description: "Central command tower. Full-stack software engineer with near 3 years of production engineering experience.",
    triggerRadius: 9,
    buildingType: "headquarters",
    content: {
      type: "profile",
      title: "SANJAY M — COMMAND CENTER",
      data: {
        profile: profileData,
        experienceSummary: experienceData,
      },
    },
  },
  {
    id: "backend-sector",
    name: "BACKEND SECTOR",
    codeName: "DISTRICT 02 // JAVA & SPRING",
    subtitle: "High-Throughput Systems",
    position: [0, 0, -28],
    size: [12, 14, 8],
    color: "#10b981",
    secondaryColor: "#34d399",
    iconName: "server",
    description: "Robust microservices architecture, Java, Spring Boot, PostgreSQL, Redis, REST APIs, and JPA persistence.",
    triggerRadius: 9,
    buildingType: "skyscraper",
    content: {
      type: "skills",
      title: "BACKEND & DISTRIBUTED SYSTEMS",
      data: {
        category: skillCategories.find((c) => c.id === "backend"),
        highlights: [
          "Java 17 / 21 & Spring Boot Production Microservices",
          "High-performance RESTful API & Async Messaging Architectures",
          "Database Optimization, PostgreSQL, Redis & JPA/Hibernate",
          "Distributed Caching, Event-Driven Patterns & System Resilience",
        ],
      },
    },
  },
  {
    id: "frontend-quarter",
    name: "FRONTEND QUARTER",
    codeName: "DISTRICT 03 // REACT & UI",
    subtitle: "Client Engineering & 3D",
    position: [28, 0, 0],
    size: [8, 10, 12],
    color: "#6366f1",
    secondaryColor: "#818cf8",
    iconName: "layout",
    description: "Modern React.js, Next.js, TypeScript, Tailwind CSS, Three.js, R3F, and interactive visual architecture.",
    triggerRadius: 9,
    buildingType: "hub",
    content: {
      type: "skills",
      title: "FRONTEND & GRAPHICS ENGINEERING",
      data: {
        category: skillCategories.find((c) => c.id === "frontend"),
        highlights: [
          "React 19 & Next.js App Router Architecture",
          "TypeScript strict type safety & custom state stores",
          "Three.js, WebGL & React Three Fiber 3D Graphics",
          "Tailwind CSS, GSAP micro-animations & responsive UI",
        ],
      },
    },
  },
  {
    id: "ai-lab",
    name: "AI & AUTOMATION LAB",
    codeName: "DISTRICT 04 // GENAI & QA",
    subtitle: "Agentic Workflows & Testing",
    position: [0, 0, 28],
    size: [10, 8, 10],
    color: "#ec4899",
    secondaryColor: "#f472b6",
    iconName: "cpu",
    description: "Autonomous LLM tools, RAG architectures, prompt engineering, automated test synthesis, and QA automation.",
    triggerRadius: 9,
    buildingType: "lab",
    content: {
      type: "skills",
      title: "AI ENGINEERING & TEST AUTOMATION",
      data: {
        categories: skillCategories.filter((c) => c.id === "ai" || c.id === "testing"),
        highlights: [
          "LLM Tool-Calling, Autonomous Agent Workflows & RAG Pipelines",
          "Automated Test Synthesis & End-to-End QA Engineering Frameworks",
          "Systematic prompt engineering & model orchestration",
          "CI/CD Integration, Docker containers, & automated validation",
        ],
      },
    },
  },
  {
    id: "mission-archive",
    name: "MISSION ARCHIVE",
    codeName: "DISTRICT 05 // PROJECTS",
    subtitle: "Production Systems Built",
    position: [-28, 0, 0],
    size: [12, 11, 10],
    color: "#f59e0b",
    secondaryColor: "#fbbf24",
    iconName: "folder-git",
    description: "Archive of featured engineering projects, production applications, full-stack microservices, and AI tools.",
    triggerRadius: 9,
    buildingType: "archive",
    content: {
      type: "projects",
      title: "PRODUCTION MISSIONS & FEATURED PROJECTS",
      data: projectsData,
    },
  },
  {
    id: "contact-zone",
    name: "CONTACT TERMINAL",
    codeName: "DISTRICT 06 // CONNECT",
    subtitle: "Communications & Socials",
    position: [20, 0, 20],
    size: [8, 9, 8],
    color: "#06b6d4",
    secondaryColor: "#22d3ee",
    iconName: "send",
    description: "Direct comms terminal for inquiries, collaboration opportunities, GitHub, LinkedIn, and email connection.",
    triggerRadius: 8,
    buildingType: "terminal",
    content: {
      type: "contact",
      title: "INITIATE DIRECT CONNECTION",
      data: {
        socials: socialsData,
        email: "sanjaym.dev@gmail.com",
      },
    },
  },
];
