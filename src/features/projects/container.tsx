import { Header, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components"

import { Mockup } from "./components/mockup"
import Projects from "./projects"
import styles from "./styles/project.module.css"

export default function Container() {
  return (
    <div className="w-full mt-[52px]">
      <Tabs
        defaultValue="gallery"
        className="flex flex-col justify-center items-center w-full"
      >
        <TabsList className={styles.tabs}>
          <TabsTrigger isBackground value="gallery">
            Gallery
          </TabsTrigger>
          <TabsTrigger isBackground value="snapshots">
            SNAPSHOTS
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gallery" className="flex-1">
          <div className="mt-9 border-wrapper md:p-5 p-1 md:space-y-10 space-y-3">
            <Header name="LATEST DEVELOPMENTS" />
            <Projects />
          </div>
        </TabsContent>
        <TabsContent value="snapshots" className="flex-1">
          <div className="mt-9 border-wrapper md:p-5 p-1 md:space-y-10 space-y-3">
            <Header name="LATEST DEVELOPMENTS" />
            <Mockup />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
