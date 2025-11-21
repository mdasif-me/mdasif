import { notFound } from "next/navigation"

import { projects } from "@/features/projects/constants"
import ProjectDetails from "@/features/projects/project-details"

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return <ProjectDetails project={project} />
}
