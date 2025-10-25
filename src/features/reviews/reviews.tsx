import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import { reviews } from "./constants"
import Review from "./review"

const Reviews = () => {
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map((rev, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 xl:basis-[32%]">
              <Review key={rev.id} review={rev} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default Reviews
