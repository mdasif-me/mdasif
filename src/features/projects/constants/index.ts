import { IProject } from "../interface"

export const projects: IProject[] = [
  {
    id: "1",
    name: "Digital Librarium",
    description:
      "Digital Librarium is a modern software solutions platform built with Next.js and Tailwind CSS. It specializes in library automation, document management, access control, and visitor management systems. Designed for scalability and efficiency, the website showcases advanced technology-driven software to streamline operations and enhance security for businesses and institutions.",
    price: "$300",
    url: "https://www.digitallibrarium.com/",
    images: [
      "/images/projects/digital-library-website-hero.png",
      "/images/projects/digital-library-projects.png",
    ],
  },
  {
    id: "2",
    name: "DMS Frontend",
    description: `A scalable and performance-optimized Document Management System frontend designed to simplify secure document organization and access. It features easy folder navigation, personalized storage areas, workflow management, and permission controls, providing businesses with a reliable and efficient solution to manage documents seamlessly.`,
    price: "$800",
    url: "https://dms.intertechbd.com/",
    images: [
      "/images/projects/document-management-system-files.png",
      "/images/projects/document-management-system-repository.png",
    ],
  },
  {
    id: "3",
    name: "Let's Chat",
    description: `Let’s Chat is a real-time messaging application built for desktop and web, offering secure authentication and advanced chat features. Designed to enhance user interaction with easy message management, it supports seamless communication across platforms. Developed with Electron.js and Next.js, it ensures reliable, scalable performance for personal and professional use.`,
    price: "$500",
    url: "https://dms.intertechbd.com",
    images: [
      "/images/projects/lets-chat-dashboard.png",
      "/images/projects/lets-chat-gallery.png",
    ],
  },
]
