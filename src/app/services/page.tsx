import type { Metadata } from "next"

import { Container, Hero } from "@/features/services"

import { servicesMetadata } from "../../../config/services-metadata"

export const metadata: Metadata = servicesMetadata

export default function Services() {
  return (
    <div className="w-full lg:mt-56 mt-40">
      <Hero />
      <Container />
    </div>
  )
}
