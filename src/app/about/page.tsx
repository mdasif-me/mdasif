import { JSX } from "react"
import type { Metadata } from "next"

import Skills from "@/components/skills"
import { Hero, Process, TechStack } from "@/features/about"
import { core_skills } from "@/features/home/constants"

import { aboutMetadata } from "../../../config/about-metadata"

export const metadata: Metadata = aboutMetadata

/***
 * The About page component that displays the hero section, skills marquees, process, and tech stack.
 * @returns {JSX.Element} The rendered About page component.
 */
export default function About(): JSX.Element {
  return (
    <div className="relative mb-20">
      <Hero />
      <Skills
        is_vertical={true}
        duration={"[--duration:90s]"}
        content={core_skills}
        className="absolute top-40 md:left-0 -left-3.5 overflow-hidden h-full bg-[#0F0F0F] rounded-xl md:p-2 p-0"
      />
      <Skills
        is_reverse
        is_vertical={true}
        duration={"[--duration:90s]"}
        content={core_skills}
        className="absolute top-40 md:right-0 -right-3.5 overflow-hidden h-full bg-[#0F0F0F] rounded-xl md:p-2 p-0"
      />
      <Process />
      <TechStack />
    </div>
  )
}
