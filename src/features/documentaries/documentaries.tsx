"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"

import { Badge } from "@/components/ui/badge"

import { Button } from "../../components/ui/button"
import { Card, Sidebar } from "./components"
import { IDocumentary } from "./interface"

interface DocumentariesProps {
  initialDocumentaries: IDocumentary[]
  totalPages: number
  currentPage: number
  category?: string
}

export default function Documentaries({
  initialDocumentaries,
  totalPages,
  currentPage,
  category,
}: DocumentariesProps) {
  if (initialDocumentaries.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center text-gray-500">No documentaries found.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="relative h-[400px] overflow-hidden rounded-2xl md:h-[550px] lg:col-span-2">
          <Image
            src={initialDocumentaries[0].thumbnail || ""}
            alt={initialDocumentaries[0].title || ""}
            className="w-full object-cover"
            width={800}
            height={550}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 to-transparent p-6 text-white">
            <Badge className="mb-2 w-fit bg-white/20 text-white backdrop-blur-sm">
              {initialDocumentaries[0].category}
            </Badge>
            <Link href={`/documentaries/${initialDocumentaries[0]._id}`}>
              <h2 className="text-2xl leading-tight font-bold md:text-3xl hover:underline">
                {initialDocumentaries[0].title}
              </h2>
            </Link>
          </div>
        </div>

        {/* others documentaries */}
        <div className="bg-secondary-foreground text-secondary space-y-4 rounded-2xl border border-border/10 p-4 lg:col-span-1">
          <h3 className="text-xl font-semibold">Other featured posts</h3>
          <div className="space-y-4">
            {initialDocumentaries.slice(1, 7).map((documentary) => (
              <Sidebar
                key={documentary._id}
                _id={documentary._id}
                imageSrc={documentary.thumbnail || ""}
                imageAlt={documentary.title || ""}
                title={documentary.title || ""}
              />
            ))}
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-start gap-2">
            <Button
              className="h-6 w-6"
              size={"icon"}
              asChild
              disabled={currentPage === 1}
            >
              <Link
                href={
                  currentPage === 1
                    ? "#"
                    : `/documentaries?page=${Math.max(1, currentPage - 1)}${
                        category ? `&category=${category}` : ""
                      }`
                }
                aria-disabled={currentPage === 1}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} />
              </Link>
            </Button>

            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              className="h-6 w-6"
              size={"icon"}
              asChild
              disabled={currentPage === totalPages}
            >
              <Link
                href={
                  currentPage === totalPages
                    ? "#"
                    : `/documentaries?page=${Math.min(
                        totalPages,
                        currentPage + 1
                      )}${category ? `&category=${category}` : ""}`
                }
                aria-disabled={currentPage === totalPages}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* recent documentaries */}
      <div className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Posts</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialDocumentaries.slice(7, 9999).map((documentary) => (
            <Card
              key={documentary._id}
              _id={documentary._id}
              imageSrc={documentary.thumbnail || ""}
              imageAlt={documentary.title || ""}
              title={documentary.title || ""}
              description={documentary.description || ""}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
