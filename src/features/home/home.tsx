import { Header } from "@/components"

import { Experiences } from "@/features/experiences"
import { Projects } from "@/features/projects"

import Hero from "./hero"

const Home = () => {
  return (
    <div className="mt-7">
      <Hero />
      <div className="mt-28 border-wrapper md:p-5 p-1 md:space-y-10 space-y-3">
        <Header name="Projects" />
        <Projects />
      </div>
      <div className="mt-28 border-wrapper border-[#1A1A1A]! md:p-5 p-1 md:space-y-10 space-y-3">
        <Header name="WORK HISTORY" />
        <Experiences />
      </div>
    </div>
  )
}

export default Home
