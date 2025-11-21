"use client"

import Image from "next/image"
import { Download01Icon } from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * The Hero component displays a temporary link to download the resume PDF, clicks on it, and then removes it.
 * It also displays a brief description of Muhammad Asif, a Software Engineer.
 */
const Hero = () => {
  /**
   * Creates a temporary link to download the resume PDF, clicks on it, and then removes it.
   */
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/mdasif_frontend_resume.pdf"
    link.download = "muhammad-asif-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div className="relative w-full">
        <div className="w-full h-[290px] sm:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px] -z-50 flex flex-col items-center justify-center overflow-hidden">
          <Image
            src="/images/about/about-glow.svg"
            alt="About glow"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
        <div className="relative">
          <Image
            src="/images/photo-mdasif.webp"
            alt="About Muhammad Asif"
            width={320}
            height={320}
            className="object-contain object-center rounded-full z-10 border-4 border-primary/10 absolute sm:-bottom-[125px] -bottom-[150px] left-1/2 -translate-x-1/2"
            priority
          />
          <Image
            src="/images/about/active.svg"
            alt="Active status icon"
            width={52}
            height={52}
            className="object-contain object-center absolute sm:-bottom-[110px] -bottom-[135px] left-1/2 translate-x-20 z-20"
            priority
          />
        </div>
      </div>
      <article className="mt-40 text-center max-w-5xl mx-auto space-y-5">
        <h1 className="text-white text-4xl font-semibold leading-normal uppercase ">
          Muhammad Asif
        </h1>
        <div className="md:text-xl text-base font-thin leading-7 space-y-5 sm:p-0 px-8 sm:text-center text-justify">
          <p>
            {`Hello, I'm Muhammad Asif, a Software Engineer passionate about developing web solutions, from simple interfaces to complex applications. With several years of experience, I am motivated by the daily challenges that combine creativity and problem-solving.`}
          </p>
          <p>
            {`I primarily work with React and Angular for front-end development, and Node.js or Python for back-end tasks. I prioritize writing clean, readable code and continuously seek ways to improve performance and design.`}
          </p>
          <p>
            {`When I'm not coding, I'm usually exploring new frameworks, contributing to open-source projects, or catching up on tech talks. I love being a part of the ever-evolving software world; there's always something new to learn, and that's what keeps me going.`}
          </p>
        </div>
        <div className="flex justify-center w-full mt-10 sm:p-0 px-8">
          <button
            onClick={handleDownloadResume}
            className="flex items-center max-w-[410px] w-full py-[18px] px-6 justify-center gap-2.5 shrink-0 rounded-[12px]  border border-[#A7BEB4] hover:bg-primary/20 cursor-pointer transition-all duration-250 ease-in"
          >
            <HugeiconsIcon
              icon={Download01Icon}
              width={24}
              height={24}
              className="shrink-0"
            />
            <p className="text-lg font-medium leading-7 uppercase text-[#E1EAE5]">
              RESUME
            </p>
          </button>
        </div>
      </article>
    </div>
  )
}

export default Hero
