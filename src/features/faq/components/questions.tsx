"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { questions } from "../constants"
import Question from "./question"

const Questions = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto w-full card pt-8 px-5">
      <Carousel
        orientation="vertical"
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
        }}
      >
        <div className="flex justify-around items-center shrink-0 mb-10">
          <CarouselPrevious className="static h-12 w-12 translate-y-0" />

          <div className="flex w-[160px] h-[56px] px-[20px] py-[10px] justify-between items-center flex-shrink-0 rounded-[16px] bg-[#0F0F0F] border-b border-[#0F0F0F]">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-6 w-1 rounded-full border-2 transition-all duration-300",
                  current === index + 1
                    ? "border-primary bg-primary scale-110"
                    : "border-muted-foreground/30 hover:border-muted-foreground/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static h-12 w-12 translate-y-0 carousel-button" />
        </div>

        <CarouselContent className="h-[600px]">
          {questions.map((question, index) => (
            <CarouselItem key={index} className="pt-5 md:basis-1/2">
              <div
                className={cn(
                  "transition-all pb-1 duration-500 ease-[cubic-bezier(0.42,0,1,1)]",
                  current === index + 1
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-40 scale-95 pointer-events-none"
                )}
              >
                <Question key={question.id} question={question} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Questions
