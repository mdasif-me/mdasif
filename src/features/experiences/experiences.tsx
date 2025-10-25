import React from "react"

import { experiences } from "./constants"
import Experience from "./experience"
import { IExperience } from "./interface"

const Experiences = () => {
  return (
    <div className="space-y-10">
      {experiences.map((experience: IExperience) => (
        <Experience key={experience.id} experience={experience} />
      ))}
    </div>
  )
}

export default Experiences
