import Link from "next/link"

import Skills from "@/components/skills"

import { Quote } from "../../components"
import AnimatedTitle from "./animated-title"
import { core_skills, description, SOCIALS } from "./constants"
import styles from "./styles/home.module.css"

const Hero = () => {
  return (
    <section className="flex lg:flex-nowrap flex-wrap items-center gap-5 w-full lg:mt-56 mt-40">
      <div className={`${styles.card} lg:flex-1 relative`}>
        <AnimatedTitle />
        <p className={styles.description}>{description}</p>
        <Skills
          duration={"[--duration:160s]"}
          content={core_skills}
          className="relative overflow-hidden bg-[#0F0F0F] rounded-lg py-2"
        />
        <Link
          href={SOCIALS[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="xl:w-full xl:!flex !hidden absolute right-6 top-20"
        >
          <Quote isWrapper className="absolute top-0 right-0" />
        </Link>
      </div>
      <div
        className={`${styles.background_profile} relative lg:max-h-full md:max-h-[520px] max-h-96`}
      >
        <Link href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer">
          <button
            className={`${styles.profile_button} absolute right-[22px] top-[22px] cursor-pointer`}
          >
            <span className="sr-only">{SOCIALS[0].label}</span>
            {SOCIALS[0].name}
          </button>
        </Link>
        <Link href={SOCIALS[1].href} target="_blank" rel="noopener noreferrer">
          <Quote
            text="See more"
            className="absolute left-[22px] bottom-[22px]"
          />
        </Link>
      </div>
    </section>
  )
}

export default Hero
