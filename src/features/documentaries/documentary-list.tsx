"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { IDocumentary } from "./interface"

interface DocumentaryListProps {
  category?: string
}

export const DocumentaryList: React.FC<DocumentaryListProps> = ({
  category,
}) => {
  const [documentaries, setDocumentaries] = useState<IDocumentary[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
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

        const response = await fetch(`/api/documentaries?${params}`)

        if (response.ok) {
          const data = await response.json()
          setDocumentaries(data.documentaries)
          setTotalPages(data.pagination.pages)
        }
      } catch (error) {
        console.error("Error fetching documentaries:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDocumentaries()
  }, [category, page])

  if (loading) {
    return (
      <div className="text-center text-gray-500">Loading documentaries...</div>
    )
  }

  return (
    <div className="space-y-6">
      {documentaries.length === 0 ? (
        <div className="text-center text-gray-500">No documentaries found.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documentaries.map((doc) => (
            <Link href={`/documentaries/${doc._id}`} key={doc._id}>
              <div className="overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
                {doc.thumbnail && (
                  <Image
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="h-48 w-full object-cover"
                    width={1000}
                    height={600}
                  />
                )}

                <div className="p-4">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    {doc.badge}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-gray-800">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {doc.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>👁️ {doc.views} views</span>
                    <span>💬 {doc.commentsCount} comments</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>👍 {doc.likes}</span>
                    <span>👎 {doc.dislikes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
