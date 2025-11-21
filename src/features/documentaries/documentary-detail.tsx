"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

import { CommentsSection } from "./comments-section"
import { EngagementButtons } from "./engagement-buttons"
import { IDocumentary } from "./interface"

interface DocumentaryDetailProps {
  documentaryId: string
}

export const DocumentaryDetail: React.FC<DocumentaryDetailProps> = ({
  documentaryId,
}) => {
  const [documentary, setDocumentary] = useState<IDocumentary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDocumentary = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(`/api/documentaries/${documentaryId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch documentary")
        }

        const data = await response.json()
        setDocumentary(data.documentary)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDocumentary()
  }, [documentaryId])

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>
  }

  if (error || !documentary) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  return (
    <article className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {documentary.badge}
            </span>
            {documentary.category && (
              <span className="ml-2 text-sm text-gray-500">
                {documentary.category}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            👁️ {documentary.views} views
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          {documentary.title}
        </h1>

        {documentary.description && (
          <p className="text-lg text-gray-600">{documentary.description}</p>
        )}

        <div className="text-sm text-gray-500">
          {new Date(documentary.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Thumbnail */}
      {documentary.thumbnail && (
        <div className="overflow-hidden rounded-lg">
          <Image
            src={documentary.thumbnail}
            alt={documentary.title}
            className="h-96 w-full object-cover"
            width={1000}
            height={600}
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: documentary.content }}
      />

      {/* Engagement */}
      <div className="border-y border-gray-200 py-4">
        <div className="mb-2 text-sm font-semibold text-gray-700">
          Was this helpful?
        </div>
        <EngagementButtons
          targetId={documentaryId}
          targetType="documentary"
          initialStats={{
            userEngagement: null,
            stats: {
              likes: documentary.likes,
              dislikes: documentary.dislikes,
            },
          }}
        />
      </div>

      {/* Comments */}
      <CommentsSection documentaryId={documentaryId} />
    </article>
  )
}
