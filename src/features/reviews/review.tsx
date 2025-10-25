import Image from "next/image"

import { IReview } from "./interface"

const Review = ({ review }: { review: IReview }) => {
  return (
    <div className="card h-full min-h-[400px] justify-between">
      <article className="px-6 gap-7 py-10 flex-1 flex flex-col justify-start">
        <h3 className="gradient-text mb-4">{review.title}</h3>
        <p className="description flex-1">{review.review}</p>
      </article>
      <div className="rounded-b-2xl w-full bg-[#272727] p-6 flex items-center gap-3 mt-auto">
        <Image
          className="rounded-full object-cover w-16 h-16"
          src={review.photo}
          alt={review.name}
          width={64}
          height={64}
        />
        <article className="space-y-1">
          <p className="text-xl text-secondary font-bold">{review.name}</p>
          <p className="text-base font-bold text-[#6F6F6F]">
            {review.designation}
          </p>
        </article>
      </div>
    </div>
  )
}

export default Review
