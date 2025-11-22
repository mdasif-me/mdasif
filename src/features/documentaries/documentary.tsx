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

        // Fetch documentary
        const docResponse = await fetch(`/api/documentaries/${documentaryId}`)
        if (!docResponse.ok) throw new Error("Failed to fetch documentary")
        const docData = await docResponse.json()
        setDocumentary(docData.documentary)
        setEngagementStats({
          userEngagement: null, // You might want to fetch user specific engagement if available
          stats: {
            likes: docData.documentary.likes,
            dislikes: docData.documentary.dislikes,
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

      if (!response.ok) throw new Error("Failed to update engagement")

      // Optimistic update or re-fetch
      const statsResponse = await fetch(
        `/api/engagements?targetId=${documentaryId}&targetType=documentary`
      )
      const updatedStats = await statsResponse.json()
      setEngagementStats(updatedStats)
    } catch (error) {
      console.error("Error updating engagement:", error)
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
        Error: {error}
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
