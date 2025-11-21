import Script from "next/script"

export function StructuredData() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Md. Asif",
    url: "https://muhammadasif.me",
    image: "https://muhammadasif.me/profile-image.jpg",
    description:
      "Expert Frontend & Full-Stack Software Engineer specializing in React.js, Next.js, and TypeScript. I deliver high-performance, responsive web applications.",
    jobTitle: "Senior Frontend Developer",
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Full-Stack Development",
      "REST APIs",
      "GraphQL",
      "AWS",
      "Docker",
      "UI/UX Design",
    ],
    sameAs: [
      "https://github.com/mdasif-me",
      "https://linkedin.com/in/mdasif-me",
      "https://twitter.com/mdasif-me",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
    },
  }

  const businessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Md. Asif - Web Development",
    url: "https://muhammadasif.me",
    description:
      "Professional web development services specializing in React.js and Next.js",
  }

  const jsonLd = [personLd, businessLd]

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  )
}
