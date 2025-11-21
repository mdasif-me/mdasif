import { JSX } from "react"
import Image from "next/image"

/**
 * Reusable ProcessArrow component for decorative arrows
 */
function ProcessArrow({
  rotation = "",
  justify = "center",
}: {
  rotation?: string
  justify?: string
}) {
  return (
    <div className={`flex ${justify} w-full p-3`}>
      <Image
        src="/images/about/arrow.svg"
        alt="Decorative line graphic"
        width={97}
        height={97}
        className={`object-contain object-center shrink-0 ${rotation}`}
        draggable={false}
      />
    </div>
  )
}

/**
 * The Process component displays the process of developing software, including understanding the project, conceptualizing and designing the software, developing and implementing the code, testing and fixing issues, deploying the software, and continuously monitoring performance and refining the product.
 *
 * @returns {JSX.Element} A JSX element containing the process of developing software.
 */
export default function Process(): JSX.Element {
  return (
    <div className="lg:mx-20 mx-8">
      <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-center">
        <div className="relative w-fit shrink-0 lg:mt-0 mt-20">
          <Image
            src="/images/about/line-freehand-first.svg"
            alt="Decorative line graphic"
            width={370}
            height={216}
            className="object-contain object-center md:rotate-[22.854deg] shrink-0"
            priority
            draggable={false}
          />
          <h4 className="absolute md:right-16 right-8 md:bottom-12 bottom-16 text-2xl font-semibold uppercase text-secondary">
            My process
          </h4>
        </div>
        <div className="lg:mt-80 mt-20">
          <h4 className="gradient-text !text-xl !normal-case max-w-3xl">
            {`First, I want to fully understand the project by determining what it needs, whether it's feasible, and what you hope to achieve.`}
          </h4>
          <ProcessArrow />
        </div>
      </div>
      <div className="flex items-center lg:justify-between justify-center">
        <div></div>
        <div>
          <h4 className="gradient-text !text-xl !normal-case max-w-3xl">
            {`Then, I conceptualize and design the software's architecture, user interface, and overall user experience.`}
          </h4>
          <ProcessArrow
            rotation="-rotate-80"
            justify="lg:justify-start justify-center"
          />
        </div>
      </div>
      <div className="flex items-center lg:justify-between justify-center">
        <div>
          <h4 className="gradient-text !text-xl !normal-case max-w-3xl">
            {`Next, I develop and implement the code, constructing the software according to the design specifications.`}
          </h4>
          <ProcessArrow />
        </div>
        <div></div>
      </div>
      <div className="flex items-center lg:justify-between justify-center">
        <div>
          <h4 className="gradient-text !text-xl !normal-case max-w-3xl">
            {`Then, I perform comprehensive testing, identify and fix any issues, and ensure it meets our high standards.`}
          </h4>
          <ProcessArrow
            rotation="-rotate-80"
            justify="lg:justify-end justify-center"
          />
        </div>
        <div></div>
      </div>
      <div className="flex items-center lg:justify-between justify-center">
        <div></div>
        <div>
          <h4 className="gradient-text !text-xl !normal-case max-w-3xl">
            {`Next, I deploy the software to its live environment and ensure everything runs smoothly across all systems.`}
          </h4>
          <ProcessArrow justify="lg:justify-start justify-center" />
        </div>
      </div>
      <div className="flex items-center lg:justify-between justify-center">
        <div>
          <h4 className="gradient-text !text-xl !normal-case max-w-3xl">
            {`And finally, I continuously monitor performance, gather user feedback, and refine the product to keep it efficient, reliable, and aligned with user needs.`}
          </h4>
        </div>
        <div></div>
      </div>
    </div>
  )
}
