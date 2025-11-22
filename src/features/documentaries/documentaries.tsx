"use client"

import { useEffect, useState } from "react"
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

interface DocumentaryListProps {
  category?: string
}

export default function Documentaries({ category }: DocumentaryListProps) {
  const [documentaries, setDocumentaries] = useState<IDocumentary[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchDocumentaries = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
        })

        if (category) {
          params.append("category", category)
        }

        const response = await fetch(`/api/documentaries?${params}`, {
          signal: abortController.signal,
        })

        if (response.ok) {
          const data = await response.json()
          if (
            Array.isArray(data?.documentaries) &&
            typeof data?.pagination?.pages === "number"
          ) {
            setDocumentaries(data.documentaries)
            setTotalPages(data.pagination.pages)
          } else {
            console.error("Invalid API response structure:", data)
            setDocumentaries([])
          }
        } else {
          console.error(`API error: ${response.status} ${response.statusText}`)
          setDocumentaries([])
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error fetching documentaries:", error)
          setDocumentaries([])
        }
      } finally {
        setLoading(false)
      }
    }
    fetchDocumentaries()

    return () => abortController.abort()
  }, [category, page])

  if (loading) {
    return (
      <div className="text-center text-gray-500">Loading documentaries...</div>
    )
  }
  if (documentaries.length === 0) {
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
            src={documentaries[0].thumbnail || ""}
            alt={documentaries[0].title || ""}
            className="w-full object-cover"
            width={600}
            height={550}
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 to-transparent p-6 text-white">
            <Badge className="mb-2 w-fit bg-white/20 text-white backdrop-blur-sm">
              {documentaries[0].category}
            </Badge>
            <Link href={`/documentaries/${documentaries[0]._id}`}>
              <h2 className="text-2xl leading-tight font-bold md:text-3xl hover:underline">
                {documentaries[0].title}
              </h2>
            </Link>
          </div>
        </div>

        {/* others documentaries */}
        <div className="bg-secondary-foreground text-secondary space-y-4 rounded-2xl border border-border/10 p-4 lg:col-span-1">
          <h3 className="text-xl font-semibold">Other featured posts</h3>
          <div className="space-y-4">
            {documentaries.slice(1, 7).map((documentary) => (
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
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} />
            </Button>

            <span className="text-gray-600">
              Page {page} of {totalPages}
            </span>

            <Button
              className="h-6 w-6"
              size={"icon"}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} />
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
          {documentaries.slice(7, 9999).map((documentary) => (
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
