"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { IReview } from "./interface"
import styles from "./styles/review.module.css"

gsap.registerPlugin(ScrollTrigger)

const Review = ({ review }: { review: IReview }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        }
      )
    },
    { scope: cardRef }
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.name,
    },
    reviewBody: review.review,
    itemReviewed: {
      "@type": "Person",
      name: "Md Asif",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div ref={cardRef} className={`${styles.card} group relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <article className="px-6 sm:gap-7 gap-3 py-6 sm:py-10 flex-1 flex flex-col justify-start relative z-10">
          <h3 className="gradient-text mb-4 text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {review.title}
          </h3>
          <p className="description flex-1 text-gray-300 leading-relaxed">
            {`"${review.review}"`}
          </p>
        </article>
        <div
          className={`${styles.footer} w-full sm:p-6 px-6 py-4 flex items-center gap-4 mt-auto border-t border-white/5 relative z-10`}
        >
          <Image
            className="rounded-full object-cover w-14 h-14 border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-300"
            src={review.photo}
            alt={review.name}
            width={56}
            height={56}
          />
          <article className="space-y-0.5">
            <p className="text-lg text-white font-semibold group-hover:text-primary transition-colors duration-300">
              {review.name}
            </p>
            <p className="text-sm font-medium text-gray-400">
              {review.designation}
            </p>
          </article>
        </div>
      </div>
    </>
  )
}

export default Review
