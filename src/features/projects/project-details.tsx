"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quote } from "@/components"
import { useGSAP } from "@gsap/react"
import { ArrowLeft01Icon } from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"
import gsap from "gsap"

import { IProject } from "./interface"
import styles from "./styles/project.module.css"

const ProjectDetails = ({ project }: { project: IProject }) => {
  const { name, description, price, url, images } = project
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      tl.fromTo(
        ".animate-in",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      )

      tl.fromTo(
        ".image-animate",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4"
      )
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="min-h-screen w-full md:py-10 mt-40">
      <Link
        href="/#projects"
        className="animate-in inline-flex items-center gap-2 text-muted-foreground hover:text-muted transition-colors mb-8"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
        Back to Projects
      </Link>

      <div className={`${styles["project-card"]} w-full animate-in mb-10`}>
        <header className="flex flex-wrap gap-5 items-center justify-between self-stretch">
          <h1 className="gradient-text text-3xl md:text-5xl font-bold">
            {name}
          </h1>
          <div className="flex gap-4">
            <Link href={url} target="_blank">
              <Quote isBordered text="Visit Live Site" />
            </Link>
          </div>
        </header>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 mt-4">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-xl md:text-5xl font-medium text-white mb-4">
                Overview
              </h3>
              <p className="description">{description}</p>
            </div>

            {project.problem && project.role && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-medium text-red-400 mb-4">
                    The Problem
                  </h3>
                  <p className="description text-start">{project.solution}</p>
                  <p className="description text-start">{project.problem}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <h3 className="text-xl font-medium text-blue-400 mb-4">
                    My Role
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.role}
                  </p>
                </div>
              </div>
            )}
            {project.approach && project.solution && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    Approach & Process
                  </h3>
                  <p className="description text-start">{project.approach}</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    The Solution
                  </h3>
                  <p className="description text-start!">{project.solution}</p>
                </div>
              </div>
            )}
            {project.results && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                <h3 className="text-xl font-medium text-green-400 mb-4">
                  Impact & Results
                </h3>
                <p className="description text-start">{project.results}</p>{" "}
              </div>
            )}

            {project.learning && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-purple-500">
                <h3 className="text-xl font-medium text-purple-400 mb-2">
                  Key Learnings
                </h3>
                <p className="description text-start italic!">
                  {`"${project.learning}"`}
                </p>
              </div>
            )}
          </div>
          <div className="lg:col-span-1 flex flex-col gap-10 p-4 rounded-xl bg-white/5 border border-white/10 h-fit sticky top-44">
            <div>
              <h4 className="description uppercase tracking-wider mb-2">
                Starting Price
              </h4>
              <p className="text-4xl font-semibold text-white">{price}</p>
            </div>
            <div>
              <h4 className="text-sm description uppercase tracking-wider mb-2">
                Status
              </h4>
              <p className="text-green-400 text-base font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="animate-in text-2xl font-medium text-white">
          Project Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image) => (
            <div
              key={image}
              className="image-animate relative rounded-2xl overflow-hidden group aspect-video"
            >
              <Image
                src={image}
                alt={`${name} screenshot`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
