"use client"

import { Suspense } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { reviews } from "./constants"
import Review from "./review"

const Reviews = () => {
  return (
    <div className="w-full relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {reviews.map((rev) => (
            <CarouselItem
              key={rev.id}
              className="pl-4 md:basis-1/2 xl:basis-1/3 h-auto"
            >
              <Suspense>
                <Review review={rev} />
              </Suspense>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Reviews
