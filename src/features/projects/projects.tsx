import React from "react"

import { projects } from "./constants"
import Project from "./project"

const Projects = () => {
  return (
    <div>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  )
}

export default Projects
