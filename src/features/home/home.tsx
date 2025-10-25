import { Header } from "@/components"

import { Experiences } from "../experiences"
import { Projects } from "../projects"
import Reviews from "../reviews/reviews"
import Hero from "./hero"

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="mt-28 border-wrapper md:p-5 p-1 space-y-10">
        <Header name="Projects" />
        <Projects />
      </div>
      <div className="mt-28 border-wrapper !border-[#1A1A1A] md:p-5 p-1 space-y-10">
        <Header name="WORK HISTORY" />
        <Experiences />
      </div>
      <div className="mt-28 border-wrapper !border-[#1A1A1A] md:p-5 p-1 space-y-10">
        <Header name="REVIEWS" isQuote />
        <Reviews />
      </div>
    </div>
  )
}

export default Home
