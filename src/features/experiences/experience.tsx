import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components"
import TabCard from "./components/tab-card"
import { IExperience } from "./interface"
import styles from "./styles/experience.module.css"

const Experience = ({ experience }: { experience: IExperience }) => {
  return (
    <div className="flex lg:flex-row flex-col gap-10 items-stretch justify-center self-stretch">
      <div className={`${styles.card} w-full lg:max-w-[600px]`}>
        <div className="flex items-center gap-3">
          <div className={`${styles.border} p-3`}>
            <Image
              src={experience.logo}
              alt={experience.title}
              width={48}
              height={48}
              className={`object-contain`}
            />
          </div>
          <article className="space-y-2">
            <p className="description">
              {experience.start} - {experience.end}{" "}
            </p>
            <p className="gradient-text">{experience.title}</p>
          </article>
        </div>
        <div className="space-y-3">
          <article className="w-fit">
            <p className={`${styles.chip} text-[#DCE5E1] text-lg font-medium`}>
              <span className="description">Company: </span>
              {experience.company}
            </p>
          </article>
          <article className="w-fit">
            <p className={`${styles.chip} text-[#DCE5E1] text-lg font-medium`}>
              <span className="description">Industry: </span>
              {experience.industry}
            </p>
          </article>
          <article className="w-fit">
            <p className={`${styles.chip} text-[#DCE5E1] text-lg font-medium`}>
              <span className="description">Skills: </span>
              {experience.skills.join(", ")}
            </p>
          </article>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="context" className="flex flex-col flex-1">
          <TabsList>
            <TabsTrigger value="context">Context</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="outcome">Outcome</TabsTrigger>
          </TabsList>
          <TabsContent value="context" className="flex-1">
            <TabCard title="Context" content={experience.context} />
          </TabsContent>
          <TabsContent value="solution" className="flex-1">
            <TabCard title="Solution" content={experience.solution} />
          </TabsContent>
          <TabsContent value="outcome" className="flex-1">
            <TabCard title="Outcome" content={experience.outcome} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Experience
