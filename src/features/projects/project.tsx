import Image from "next/image"
import Link from "next/link"
import { Quote } from "@/components"

import { IProject } from "./interface"
import styles from "./styles/project.module.css"

const Project = ({ project }: { project: IProject }) => {
  const { name, description, price, url, images } = project

  return (
    <div className="w-full flex lg:flex-nowrap flex-wrap justify-between self-stretch gap-10">
      <article className={`${styles["project-card"]} w-full`}>
        <header className="flex flex-wrap gap-3 items-center justify-between self-stretch">
          <p className="gradient-text">{name}</p>
          <Link href={url} target="_blank">
            <Quote isBordered text="Get a quote" />
          </Link>
        </header>
        <p className="description">{description}</p>
        <h4 className="header flex w-full justify-end">Starts from {price}</h4>
      </article>
      <div className={`${styles["project-card"]} w-full`}>
        <header className="flex flex-wrap gap-3 items-center justify-between self-stretch">
          <p className="gradient-text uppercase">Gallery</p>
          <Quote isBordered text="View full case study" />
        </header>
        <div
          id={name}
          className="flex md:flex-nowrap flex-wrap items-start gap-5 self-stretch"
        >
          {images.map((image, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={name}
                width={1024}
                height={243}
                className="2xl:h-52 lg:h-72 h-60 object-cover object-center"
              />
              <div className="absolute inset-0 image-overlay" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Project
