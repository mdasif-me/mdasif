"use client"

import Image from "next/image"

import { useMediaQuery } from "../../../hooks/use-media-query"

/**
 * The TechStack component displays a section of the page that highlights the tech stack used in the project.
 * It includes a decorative line graphic, a heading, and a series of images representing the different
 * technologies used in the project.
 */
export default function TechStack() {
  const isMdAndSMDevice = useMediaQuery("only screen and (max-width: 1024px)")

  return (
    <div>
      <div className="relative w-fit shrink-0 mt-20 lg:mx-20 mx-8">
        <Image
          src="/images/about/line-freehand-second.svg"
          alt="Decorative line graphic"
          width={370}
          height={216}
          className="object-contain object-center rotate-5 shrink-0"
          priority
          draggable={false}
        />
        <h4 className="absolute left-4 bottom-16 text-2xl font-semibold uppercase text-secondary">
          My Tech stack
        </h4>
      </div>
      <section className="space-y-10">
        <div className="flex justify-center w-full p-3">
          <Image
            src="/images/icons/javascript.svg"
            alt="JavaScript logo"
            width={200}
            height={100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
        <div className="flex justify-around items-center w-full">
          <Image
            src="/images/icons/typescript.svg"
            alt="TypeScript logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
          <Image
            src="/images/icons/prisma.svg"
            alt="Prisma logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
        <div className="flex justify-center items-center w-full p-3">
          <Image
            src="/images/icons/go.svg"
            alt="Go logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
        <div className="flex justify-around items-center w-full">
          <Image
            src="/images/icons/expressjs.svg"
            alt="Express.js logo"
            width={isMdAndSMDevice ? 80 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
          <Image
            src="/images/icons/react.svg"
            alt="React logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-50"
            draggable={false}
          />
          <Image
            src="/images/icons/nextjs.svg"
            alt="Next.js logo"
            width={isMdAndSMDevice ? 80 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
        <div className="flex justify-center items-center w-full p-3">
          <Image
            src="/images/icons/postgresql.svg"
            alt="PostgreSQL logo"
            width={isMdAndSMDevice ? 150 : 250}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
        <div className="flex justify-around items-center w-full">
          <Image
            src="/images/icons/docker.svg"
            alt="Docker logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
          <Image
            src="/images/icons/nginx.svg"
            alt="Nginx logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
        <div className="flex justify-center w-full p-3">
          <Image
            src="/images/icons/aws.svg"
            alt="AWS logo"
            width={isMdAndSMDevice ? 120 : 200}
            height={isMdAndSMDevice ? 40 : 100}
            className="object-contain object-center shrink-0 opacity-[0.5]"
            draggable={false}
          />
        </div>
      </section>
    </div>
  )
}
