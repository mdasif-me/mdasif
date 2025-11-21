import styles from "@/features/projects/styles/project.module.css"

export default function Hero() {
  return (
    <div
      className={`${styles["project-hero-container"]} w-full border-2 h-full min-h-96 border-[#272727] rounded-xl`}
    >
      <div className={`text-center space-y-8 max-w-4xl p-3`}>
        <h1 className="lg:text-[44px] md:text-4xl sm:text-3xl text-2xl font-semibold leading-normal uppercase text-secondary font-roboto-flex">
          Research, Collaborate, Iterate
        </h1>
        <p className="description md:!text-xl !text-base">
          I bring ideas to life through a user-centered design process. Research
          and brainstorming spark innovative solutions, then user testing and
          refinement ensure they truly hit the mark for both users and
          businesses.
        </p>
      </div>
    </div>
  )
}
