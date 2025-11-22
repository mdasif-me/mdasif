"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"

import { Comment, Content, Header } from "./components"
import { IDocumentary, IEngagementStats } from "./interface"

export default function Documentary({
  documentaryId,
}: {
  documentaryId: string
}) {
  const navigate = useRouter()
  const [documentary, setDocumentary] = useState<IDocumentary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [engagementStats, setEngagementStats] = useState<IEngagementStats>({
    userEngagement: null,
    stats: { likes: 0, dislikes: 0 },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError("")

        const docResponse = await fetch(`/api/documentaries/${documentaryId}`)
        if (!docResponse.ok) throw new Error("Failed to fetch documentary")
        const docData = await docResponse.json()
        setDocumentary(docData.documentary)
        setEngagementStats({
          userEngagement: null,
          stats: {
            likes: docData.documentary.likes ?? 0,
            dislikes: docData.documentary.dislikes ?? 0,
          },
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [documentaryId])

  const handleEngagement = async (type: "like" | "dislike") => {
    try {
      const response = await fetch("/api/engagements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: documentaryId,
          targetType: "documentary",
          engagementType: type,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage =
          errorData.message ||
          errorData.error ||
          `Failed to ${type} the documentary. Please try again.`
        alert(errorMessage)
        return
      }

      const statsResponse = await fetch(
        `/api/engagements?targetId=${documentaryId}&targetType=documentary`
      )

      if (!statsResponse.ok) {
        const errorMessage = "Failed to fetch updated engagement stats"
        alert(errorMessage)
        return
      }

      const updatedStats = await statsResponse.json()
      setEngagementStats(updatedStats)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection and try again."
      alert(errorMessage)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  if (error || !documentary) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error || "Documentary not found"}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background min-h-screen"
    >
      <div className="mx-auto px-6">
        <Header
          category={documentary.category || ""}
          badge={documentary.badge || ""}
          title={documentary.title || ""}
          publishedDate={documentary.createdAt || ""}
          views={documentary.views || 0}
          onBack={() => navigate.push("/")}
          engagementStats={engagementStats}
          onEngagement={handleEngagement}
        />

        <div className="mt-16">
          <Content
            description={documentary.description || ""}
            content={documentary.content || ""}
            coverImage={documentary.thumbnail || ""}
          />
        </div>

        <div className="mt-16">
          <Comment documentaryId={documentaryId} />
        </div>
      </div>
    </motion.div>
  )
}
