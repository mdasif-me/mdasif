import type { Metadata } from "next"

import { Hero } from "@/features/projects"
import Container from "@/features/projects/container"

import { projectsMetadata } from "../../../config/projects-metadata"

export const metadata: Metadata = projectsMetadata

const Projects = () => {
  return (
    <div className="w-full lg:mt-56 mt-40">
      <Hero />
      <Container />
    </div>
  )
}

export default Projects
