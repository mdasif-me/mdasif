import React from "react"

import { projects } from "./constants"
import Project from "./project"

const Projects = () => {
  return (
    <div className="xl:space-y-10 space-y-3">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  )
}

export default Projects
