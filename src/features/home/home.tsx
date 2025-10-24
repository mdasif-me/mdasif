import { Header } from "@/components"

import { Projects } from "../projects"
import Hero from "./hero"

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="mt-28 border-wrapper md:p-5 p-1 space-y-10">
        <Header />
        <Projects />
      </div>
    </div>
  )
}

export default Home
