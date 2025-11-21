import { CircleIcon } from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"

import styles from "../styles/services.module.css"

function FullTimeProfile() {
  return (
    <div className="flex flex-col justify-center items-center w-full text-center space-y-8">
      <div className={styles.chip}>
        <HugeiconsIcon
          className={styles["icon-glow"]}
          icon={CircleIcon}
          size={16}
          color="#008643"
        />
        <p className="text-base text-[rgba(243,246,245,0.44)]">
          Full time Software Engineer
        </p>
      </div>
      <article>
        <p className="md:text-xl leading-8 text-[#E1EAE5]">
          <span className="text-[#FFF066]">Best</span> at helping startups,
          individual clients, and established companies gain the confidence that
          comes from dedicated,{" "}
          <span className="text-[#FFF066]">full-time</span> expertise in
          software development and modern frontend web solutions.
        </p>
      </article>
      <article className="space-y-2">
        <h3 className="text-[#A7BEB4] text-4xl font-semibold text-center md:mt-6">
          Monthly
        </h3>
        <h4 className="text-[#E1EAE5] text-3xl font-medium text-center">
          $6,800<span className="text-xl">/mo</span>
        </h4>
        <ul className="mt-10 grid md:grid-cols-2 gap-3">
          <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
            <HugeiconsIcon
              icon={CircleIcon}
              size={16}
              color="#6F6F6F"
              className="shrink-0 mt-[3.4px]"
            />
            <p>40 hours per week of dedicated development</p>
          </li>
          <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
            <HugeiconsIcon
              icon={CircleIcon}
              size={16}
              color="#6F6F6F"
              className="shrink-0 mt-[3.4px]"
            />
            <p>Flexible feature implementation</p>
          </li>
          <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
            <HugeiconsIcon
              icon={CircleIcon}
              size={16}
              color="#6F6F6F"
              className="shrink-0 mt-[3.4px]"
            />
            <p>Unlimited revisions for delivered work</p>
          </li>
          <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
            <HugeiconsIcon
              icon={CircleIcon}
              size={16}
              color="#6F6F6F"
              className="shrink-0 mt-[3.4px]"
            />
            <p>Design system management & UI consistency</p>
          </li>
          <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
            <HugeiconsIcon
              icon={CircleIcon}
              size={16}
              color="#6F6F6F"
              className="shrink-0 mt-[3.4px]"
            />
            <p>Seamless team collaboration & code integration</p>
          </li>
          <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
            <HugeiconsIcon
              icon={CircleIcon}
              size={16}
              color="#6F6F6F"
              className="shrink-0 mt-[3.4px]"
            />
            <p>End-to-end product lifecycle support</p>
          </li>
        </ul>
      </article>
    </div>
  )
}

export default FullTimeProfile
