"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Quote } from "@/components"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { IProject } from "./interface"
import styles from "./styles/project.module.css"

gsap.registerPlugin(ScrollTrigger)

const Project = ({ project }: { project: IProject }) => {
  const { id, name, description, price, url, images } = project
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

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
        ".project-content > *",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      )

      // Attach hover animations with proper cleanup to avoid memory leaks
      const hoverCleanup: Array<{
        ref: Element
        onEnter: EventListener
        onLeave: EventListener
        tl: gsap.core.Animation
      }> = []
      imageRefs.current.forEach((ref) => {
        if (!ref) return
        const img = ref.querySelector("img")
        const overlay = ref.querySelector(".image-overlay")

        if (img && overlay) {
          const hoverTl = gsap.timeline({ paused: true })
          hoverTl.to(img, { scale: 1.1, duration: 0.4, ease: "power2.out" })
          hoverTl.to(overlay, { opacity: 0.3, duration: 0.4 }, 0)

          const onEnter = () => hoverTl.play()
          const onLeave = () => hoverTl.reverse()
          ref.addEventListener("mouseenter", onEnter)
          ref.addEventListener("mouseleave", onLeave)
          hoverCleanup.push({ ref, onEnter, onLeave, tl: hoverTl })
        }
      })
      // Cleanup function to remove listeners and kill timelines
      return () => {
        hoverCleanup.forEach(({ ref, onEnter, onLeave, tl }) => {
          ref.removeEventListener("mouseenter", onEnter)
          ref.removeEventListener("mouseleave", onLeave)
          tl.kill()
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="w-full flex lg:flex-nowrap flex-wrap justify-between self-stretch xl:gap-10 gap-6"
    >
      <article className={`${styles["project-card"]} w-full project-content`}>
        <header className="flex flex-wrap gap-3 items-center justify-between self-stretch">
          <p className="gradient-text text-xl font-semibold">{name}</p>
          <Link href={url} target="_blank">
            <Quote isBordered text="Get a quote" />
          </Link>
        </header>
        <p className="description text-gray-300 leading-relaxed">
          {description}
        </p>
        <h4 className="header flex w-full justify-end text-lg font-medium text-white/80">
          Starts from {price}
        </h4>
      </article>
      <div className={`${styles["project-card"]} w-full project-content`}>
        <header className="flex flex-wrap gap-3 items-center justify-between self-stretch">
          <p className="gradient-text uppercase text-sm tracking-wider">
            Gallery
          </p>
          <Link href={`/projects/${id}`}>
            <Quote isBordered text="View full case study" />
          </Link>
        </header>
        <div
          id={name}
          className="flex md:flex-nowrap flex-wrap items-start gap-5 self-stretch"
        >
          {images.map((image, i) => (
            <div
              key={i}
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group w-full"
            >
              <Image
                src={image}
                alt={name}
                width={1024}
                height={243}
                className="lg:h-72 h-60 w-full object-cover object-center transition-transform duration-500 will-change-transform"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 image-overlay" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Project
