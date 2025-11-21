"use client"

import { useRef } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import TabCard from "./components/tab-card"
import { IExperience } from "./interface"
import styles from "./styles/experience.module.css"

gsap.registerPlugin(ScrollTrigger)

const Experience = ({ experience }: { experience: IExperience }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )

      tl.fromTo(
        ".experience-content > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="flex lg:flex-row flex-col gap-10 items-stretch justify-center self-stretch opacity-0 translate-y-12"
    >
      <div
        className={`${styles.card} w-full lg:max-w-[600px] experience-content`}
      >
        <div className="flex flex-wrap items-center gap-3 w-full">
          <div className={`${styles.border} p-3`}>
            <Image
              src={experience.logo}
              alt={experience.title}
              width={48}
              height={48}
              className={`object-contain`}
            />
          </div>
          <article className="space-y-2 w-full">
            <p className="description">
              {experience.start} - {experience.end}{" "}
            </p>
            <p className="gradient-text md:text-2xl !text-xl">
              {experience.title}
            </p>
          </article>
        </div>
        <div className="md:space-y-3 space-y-1">
          <article className="w-fit">
            <p
              className={`${styles.chip} flex flex-wrap text-[#DCE5E1] md:text-lg text-sm items-center gap-1 font-medium`}
            >
              <span className="description">Company: </span>
              {experience.company}
            </p>
          </article>
          <article className="w-fit">
            <p
              className={`${styles.chip} flex flex-wrap text-[#DCE5E1] md:text-lg text-sm items-center gap-1 font-medium`}
            >
              <span className="description">Industry: </span>
              {experience.industry}
            </p>
          </article>
          <article className="w-fit">
            <p
              className={`${styles.chip} flex flex-wrap text-[#DCE5E1] md:text-lg text-sm items-center gap-1 font-medium`}
            >
              <span className="description">Skills: </span>
              {experience.skills.join(", ")}
            </p>
          </article>
        </div>
      </div>
      <div className="flex-1 flex flex-col experience-content">
        <Tabs defaultValue="context" className="flex flex-col flex-1">
          <TabsList>
            <TabsTrigger value="context">Context</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="outcome">Outcome</TabsTrigger>
          </TabsList>
          <TabsContent value="context" className="flex-1">
            <TabCard title="Context" content={experience.context} />
          </TabsContent>
          <TabsContent value="solution" className="flex-1">
            <TabCard title="Solution" content={experience.solution} />
          </TabsContent>
          <TabsContent value="outcome" className="flex-1">
            <TabCard title="Outcome" content={experience.outcome} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Experience
