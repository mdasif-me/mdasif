import Link from "next/link"
import { Quote } from "@/components"

import { SOCIALS } from "../constants/social"

const Banner = () => {
  return (
    <div className={`card p-6`}>
      <div className={`flex flex-wrap items-center justify-between w-full`}>
        <article className={`space-y-4`}>
          <h3
            className={`uppercase text-2xl font-semibold leading-normal`}
          >{`LET’S WORK`}</h3>
          <p className={`description text-base! max-w-2xl`}>
            {`Take the first step towards digital success with Asif. I am eager to craft tailored solutions that drive growth for your business.`}
          </p>
        </article>
        <Link
          href={SOCIALS[0].href}
          target="_blank"
          className={`lg:pr-20 xl:pr-36 -ml-3`}
        >
          <Quote isWrapper text="Get in Touch" />
        </Link>
      </div>
    </div>
  )
}
export default Banner
