"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import Banner from "@/features/contact/components/banner"
import QuickConnect from "@/features/contact/components/quick-connect"
import Social from "@/features/contact/components/social"

import Skills from "../../components/skills"
import { core_skills, SOCIALS } from "../home/constants"

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      })

      // Entry animation
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        ".contact-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      )
    },
    { scope: containerRef }
  )

  return (
    <div
      id="contact"
      ref={containerRef}
      className="min-h-screen flex flex-col space-y-6 opacity-0"
    >
      <div ref={contentRef} className="flex flex-col space-y-6">
        <div className="contact-item">
          <Banner />
        </div>

        <div className="contact-item">
          <Skills
            duration={"[--duration:160s]"}
            content={core_skills}
            className="relative overflow-hidden bg-[#0F0F0F] rounded-lg py-2 border border-[#27272766]"
          />
        </div>

        <div className="xl:flex-1 xl:flex items-stretch gap-6">
          <div className="flex-1">
            <div className="grid sm:grid-cols-2 gap-6 h-full">
              {SOCIALS.map((social, index) => {
                if (!social.icon) {
                  console.warn(`Missing icon for social: ${social.name}`)
                  return null
                }
                return (
                  <div key={social.name} className="h-full contact-item">
                    <Social
                      name={social.name}
                      href={social.href}
                      description={social.description || ""}
                      icon={social.icon}
                      className="h-full transition-transform duration-300 hover:-translate-y-1"
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex-1 contact-item">
            <QuickConnect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
