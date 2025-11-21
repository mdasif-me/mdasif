import type { Metadata } from "next"

export const rootMetadata: Metadata = {
  title: {
    default:
      "Md. Asif | Frontend & Full-Stack Developer | React.js & Next.js Expert",
    template: "%s | Md. Asif",
  },
  description:
    "Expert Frontend & Full-Stack Software Engineer specializing in React.js, Next.js, and TypeScript. I deliver high-performance, responsive web applications with 5+ years of experience. Skilled in REST/GraphQL APIs, Agile development, AWS, and UI/UX optimization. View my portfolio of successful projects.",
  keywords: [
    "frontend developer",
    "React developer",
    "Next.js developer",
    "JavaScript developer",
    "TypeScript developer",
    "full-stack developer",
    "web developer portfolio",
    "React.js expert",
    "Next.js specialist",
    "responsive web design",
    "REST API development",
    "GraphQL developer",
    "AWS developer",
    "Docker DevOps",
    "UI/UX development",
    "performance optimization",
    "web applications",
    "software engineer",
    "Md. Asif portfolio",
    "freelance developer",
    "web development services",
    "custom web solutions",
    "SPA development",
    "component development",
    "API integration",
    "Agile development",
    "Scrum methodologies",
    "CI/CD implementation",
    "JavaScript ES6+",
    "CSS-in-JS solutions",
    "Tailwind CSS",
    "responsive design",
    "mobile-first development",
    "web performance",
    "SEO optimization",
    "accessibility (a11y)",
    "user experience design",
    "interactive web design",
    "animation development",
    "GSAP animations",
    "state management",
    "data structures",
    "algorithm design",
    "technical leadership",
    "code quality",
    "debugging expertise",
    "problem solving",
    "innovative solutions",
    "tech community",
    "open source contributions",
  ],
  authors: [{ name: "Md. Asif" }],
  creator: "Md. Asif",
  publisher: "Md. Asif",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadasif.me",
    title:
      "Md. Asif | Frontend & Full-Stack Developer | React.js & Next.js Expert",
    description:
      "Expert Frontend & Full-Stack Software Engineer specializing in React.js, Next.js, and TypeScript. I deliver high-performance, responsive web applications with 5+ years of experience. Skilled in REST/GraphQL APIs, Agile development, AWS, and UI/UX optimization. View my portfolio of successful projects.",
    siteName: "Md. Asif - Portfolio",
    images: [
      {
        url: "https://muhammadasif.me/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Md. Asif - Frontend & Full-Stack Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Md. Asif | Frontend & Full-Stack Developer | React.js & Next.js Expert",
    description:
      "Expert Frontend & Full-Stack Software Engineer specializing in React.js, Next.js, and TypeScript. View my portfolio of successful projects.",
    creator: "@mdasif-me",
    images: ["https://muhammadasif.me/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://muhammadasif.me",
    languages: {
      "en-US": "https://muhammadasif.me",
    },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}
