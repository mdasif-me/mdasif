import Image from "next/image"

import { projects } from "../constants"

export const Mockup = () => {
  return (
    <div className="lg:space-y-16 space-y-8">
      {projects.map((project, idx) => (
        <div key={idx}>
          <p className="gradient-text">{project.name}</p>
          <div className="grid md:grid-cols-2 lg:gap-14 gap-7 lg:mt-9 mt-3.5">
            {project.images &&
              project.images.length > 0 &&
              project.images.map((imgSrc, imgIdx) => (
                <Image
                  key={imgIdx}
                  src={imgSrc}
                  alt={`${project.name} screenshot ${imgIdx + 1}`}
                  width={1024}
                  height={576}
                  className="rounded-2xl w-fit h-auto object-cover object-center"
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
