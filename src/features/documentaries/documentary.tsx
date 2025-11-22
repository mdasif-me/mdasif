"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"

import { Comment, Content, Header } from "./components"
import { IDocumentary, IEngagementStats } from "./interface"

interface DocumentaryProps {
  initialDocumentary: IDocumentary
}

export default function Documentary({ initialDocumentary }: DocumentaryProps) {
  const navigate = useRouter()
  const [engagementStats, setEngagementStats] = useState<IEngagementStats>({
    userEngagement: null,
    stats: {
      likes: initialDocumentary.likes ?? 0,
      dislikes: initialDocumentary.dislikes ?? 0,
    },
  })

  useEffect(() => {
    // Only fetch engagement stats on mount to get user-specific status
    const fetchEngagement = async () => {
      try {
        const statsResponse = await fetch(
          `/api/engagements?targetId=${initialDocumentary._id}&targetType=documentary`
        )
        if (statsResponse.ok) {
          const updatedStats = await statsResponse.json()
          setEngagementStats(updatedStats)
        }
      } catch (error) {
        console.error("Failed to fetch engagement stats", error)
      }
    }

    fetchEngagement()
  }, [initialDocumentary._id])

  const handleEngagement = async (type: "like" | "dislike") => {
    try {
      const response = await fetch("/api/engagements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: initialDocumentary._id,
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
        `/api/engagements?targetId=${initialDocumentary._id}&targetType=documentary`
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background min-h-screen"
    >
      <div className="mx-auto px-6">
        <Header
          category={initialDocumentary.category || ""}
          badge={initialDocumentary.badge || ""}
          title={initialDocumentary.title || ""}
          publishedDate={initialDocumentary.createdAt || ""}
          views={initialDocumentary.views || 0}
          onBack={() => navigate.push("/documentaries")}
          engagementStats={engagementStats}
          onEngagement={handleEngagement}
        />

        <div className="mt-16">
          <Content
            description={initialDocumentary.description || ""}
            content={initialDocumentary.content || ""}
            coverImage={initialDocumentary.thumbnail || ""}
          />
        </div>

        <div className="mt-16">
          <Comment documentaryId={initialDocumentary._id} />
        </div>
      </div>
    </motion.div>
  )
}
