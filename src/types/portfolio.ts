export type SkillCategoryType = "BACKEND" | "FRONTEND" | "AI / GENAI" | "DEVOPS / QA";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategoryType;
  level: string;
  description: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  label: SkillCategoryType;
  description: string;
  skills: Skill[];
}

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  highlights: ProjectHighlight[];
  links?: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  featured?: boolean;
}

export interface Experience {
  id: string;
  period: string;
  year: string;
  company: string;
  role: string;
  location?: string;
  description: string;
  technologies: string[];
  contributions: string[];
  isCurrent?: boolean;
}

export interface ProfileStat {
  label: string;
  value: string;
  sublabel?: string;
  detail: string;
}

export interface Profile {
  name: string;
  title: string;
  eyebrow: string;
  headline: string;
  supportingCopy: string;
  summary: string;
  philosophy: string;
  stats: ProfileStat[];
}

export interface PhilosophyPrinciple {
  number: string;
  title: string;
  description: string;
  keyRule: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  kind: "email" | "linkedin" | "github" | "doc";
  isPlaceholder?: boolean;
}

export interface WorldState {
  scrollProgress: number;
  sectionProgress: number;
  activeSection: string;
  checkpoint: number;
  isReducedMotion: boolean;
  quality: "low" | "medium" | "high";
}
