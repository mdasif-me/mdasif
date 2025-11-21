import { IProject } from "../interface"

export const projects: IProject[] = [
  {
    id: "1",
    name: "Digital Librarium",
    description:
      "Digital Librarium is a dynamic, modern software solutions platform I've developed, leveraging the power of Next.js and Tailwind CSS. This project showcases my expertise in creating robust, scalable applications focused on critical areas like library automation, comprehensive document management, precise access control, and efficient visitor management systems. The platform is meticulously designed for high performance and operational efficiency, demonstrating a commitment to using advanced, technology-driven software to streamline workflows and significantly enhance security for institutions and businesses.",
    price: "$120",
    url: "https://www.digitallibrarium.com/",
    images: [
      "/images/projects/digital-library-website-hero.png",
      "/images/projects/digital-library-projects.png",
    ],
    problem:
      "Libraries were struggling with manual cataloging and inefficient visitor tracking, leading to lost books and security gaps.",
    role: "Full Stack Developer",
    approach:
      "Conducted interviews with librarians to understand pain points. Built a prototype using Next.js for fast performance and iterated based on feedback.",
    solution:
      "Developed a comprehensive library automation system with barcode scanning, digital member management, and automated fine calculation.",
    results:
      "Reduced book checkout time by 40% and improved inventory accuracy by 95% within the first 3 months of deployment.",
    learning:
      "Learned the importance of offline-first capabilities for institutions with unstable internet connections.",
  },
  {
    id: "2",
    name: "DMS Frontend",
    description: `Revolutionized document management with a blazingly fast and user-centric frontend for our Document Management System (DMS). We focused on making secure document organization and access incredibly easy, featuring super-intuitive folder navigation, dedicated personal storage for every user, powerful workflow tools, and precise, role-based permission settings. This platform isn't just a solution; it's a seamless and reliable powerhouse that simplifies the entire document lifecycle for any business.`,
    price: "$800",
    url: "https://dms.intertechbd.com/",
    images: [
      "/images/projects/document-management-system-files.png",
      "/images/projects/document-management-system-repository.png",
    ],
    problem:
      "Corporate clients faced data silos and slow document retrieval times, hampering productivity.",
    role: "Frontend Software Engineer",
    approach:
      "Analyzed user workflows and identified bottlenecks. Focused on creating a high-performance UI with optimistic updates.",
    solution:
      "Built a blazing fast DMS frontend with advanced search, drag-and-drop organization, and granular permission controls.",
    results:
      "Document retrieval speed increased by 300%. User adoption rate hit 90% in the first week.",
    learning:
      "Optimizing large file lists requires careful virtualization and state management strategies.",
  },
  {
    id: "3",
    name: "Let's Chat",
    description: `Let's Chat constitutes a cross-platform, real-time messaging application designed for deployment across both desktop and web environments. It incorporates secure authentication protocols and a comprehensive suite of advanced chat functionalities. The application is meticulously engineered to enhance user engagement through highly efficient message management, thereby facilitating uninterrupted communication across diverse platforms. Leveraging the robust frameworks of Electron.js and Next.js, Let's Chat ensures reliable and scalable performance suitable for both private and professional deployment scenarios.`,
    price: "$500",
    url: "https://dms.intertechbd.com",
    images: [
      "/images/projects/lets-chat-dashboard.png",
      "/images/projects/lets-chat-gallery.png",
    ],
    problem:
      "Users needed a secure, cross-platform messaging app that didn't compromise on speed or privacy.",
    role: "Frontend Software Engineer",
    approach:
      "Prioritized end-to-end encryption and real-time performance. Used Electron for cross-platform desktop support.",
    solution:
      "Delivered a secure chat application with real-time socket connections, file sharing, and encrypted message storage.",
    results:
      "Achieved < 50ms message latency. Successfully deployed to Windows, macOS, and Web with a single codebase.",
    learning:
      "Balancing real-time features with battery life on portable devices is a critical challenge.",
  },
]
