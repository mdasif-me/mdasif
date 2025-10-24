import React from "react"

import ProjectCard from "./components/card"
import { IProject } from "./interface"

const Project = ({ project }: { project: IProject }) => {
  return (
    <div>
      <ProjectCard project={project} />
    </div>
  )
}

export default Project
