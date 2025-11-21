"use client"

import { useEffect, useRef } from "react"
import {
  BarChartIcon,
  BrushIcon,
  CircleIcon,
  CodeIcon,
  Idea01Icon,
  Rocket02Icon,
  SettingsIcon,
} from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "../styles/services.module.css"
import ServiceCard from "./service-card"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const ServicesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: Idea01Icon,
      title: "Discovery & Planning",
      description:
        "Understand project requirements, assess feasibility, and establish objectives.",
    },
    {
      icon: BrushIcon,
      title: "Design & User Experience",
      description:
        "Conceptualize and design the software's architecture, user interface, and overall user experience.",
    },
    {
      icon: CodeIcon,
      title: "Development & Implementation",
      description:
        "Code and construct the software according to design specifications.",
    },
    {
      icon: SettingsIcon,
      title: "Testing & Quality Assurance",
      description:
        "Rigorously test the software to identify and rectify defects, ensuring adherence to quality standards.",
    },
    {
      icon: Rocket02Icon,
      title: "Deployment & Maintenance",
      description:
        "Release the software to users, followed by ongoing support and updates.",
    },
    {
      icon: BarChartIcon,
      title: "Monitoring & Feedback",
      description:
        "Continuously monitor software performance and collect user feedback for future enhancements.",
    },
  ]

  useEffect(() => {
    const title = titleRef.current
    const line = lineRef.current
    const desc = descRef.current
    const grid = gridRef.current

    if (!title || !line || !desc || !grid) return

    const triggers: ScrollTrigger[] = []

    // Smooth header animation timeline
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    })

    if (headerTl.scrollTrigger) {
      triggers.push(headerTl.scrollTrigger as ScrollTrigger)
    }

    headerTl
      .fromTo(
        title,
        {
          opacity: 0,
          y: -50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        line,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .fromTo(
        desc,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )

    // Grid fade in animation
    const gridAnim = gsap.fromTo(
      grid,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )

    if (gridAnim.scrollTrigger) {
      triggers.push(gridAnim.scrollTrigger as ScrollTrigger)
    }

    // Cleanup function - only kill component-owned triggers
    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="pt-20 relative overflow-hidden">
      <div className="relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <div className={`w-fit! mx-auto ${styles.chip}`}>
            <HugeiconsIcon
              className={styles["icon-glow"]}
              icon={CircleIcon}
              size={16}
              color="#008643"
            />
            <p className="text-base text-foreground">Why me</p>
          </div>
          <h2
            ref={titleRef}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-secondary uppercase mt-10 mb-2.5 tracking-tight"
          >
            Why Choose Me
          </h2>
          <div
            ref={lineRef}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-10 rounded-full shadow-lg shadow-primary/30"
          ></div>
          <p
            ref={descRef}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive software development services tailored to bring your
            vision to life
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesSection
