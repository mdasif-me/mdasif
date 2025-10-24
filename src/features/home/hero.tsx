import Link from "next/link"

import {
  Quote,
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "../../components"
import AnimatedTitle from "./animated-title"
import { core_skills, description, SOCIALS } from "./constants"
import styles from "./styles/home.module.css"

const Hero = () => {
  return (
    <section className="flex lg:flex-nowrap flex-wrap items-center gap-5 w-full lg:mt-56 mt-40">
      <div className={`${styles.card} lg:flex-1 relative`}>
        <AnimatedTitle />
        <p className={styles.description}>{description}</p>
        <div className="relative bg-background flex w-full flex-col items-center justify-center overflow-hidden py-5 rounded-xl">
          <ScrollVelocityContainer>
            <ScrollVelocityRow baseVelocity={1} direction={1}>
              {core_skills.map((skill, i) => (
                <div key={i} className="flex items-center">
                  <p className="mx-4 text-[#6f6f6f] text-sm md:text-base uppercase">
                    {skill}
                  </p>
                  <div className="w-2 h-2 shrink-0 rounded-full bg-[#3e5d52]" />
                </div>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l"></div>
        </div>
        <Quote
          isWrapper
          className="absolute right-6 top-20 xl:w-full xl:!flex !hidden"
        />
      </div>
      <div className={`${styles.background_profile} relative`}>
        <Link href={SOCIALS[0].href} target="_blank">
          <button
            className={`${styles.profile_button} absolute right-[22px] top-[22px] cursor-pointer`}
          >
            <span className="sr-only">{SOCIALS[0].label}</span>
            {SOCIALS[0].name}
          </button>
        </Link>
        <Link href={SOCIALS[1].href} target="_blank">
          <Quote
            isBackground
            text="See more"
            className="absolute left-[22px] bottom-[22px]"
          />
        </Link>
      </div>
    </section>
  )
}

export default Hero
