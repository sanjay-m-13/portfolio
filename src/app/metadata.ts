import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "Sanjay M — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer specializing in Java, Spring Boot, React, and AI-powered systems with ~3 years of production engineering experience.",
  keywords: [
    "Full-Stack Software Engineer",
    "Java",
    "Spring Boot",
    "React.js",
    "Next.js",
    "AI Agents",
    "GenAI",
    "Test Automation",
    "Playwright",
    "Microservices",
    "PostgreSQL",
    "Docker",
  ],
  authors: [{ name: "Sanjay M" }],
  creator: "Sanjay M",
  metadataBase: new URL("https://sanjaym-portfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanjaym-portfolio.vercel.app",
    title: "Sanjay M — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer specializing in Java, Spring Boot, React, and AI-powered systems.",
    siteName: "Sanjay M Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjay M — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer specializing in Java, Spring Boot, React, and AI-powered systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
