"use client"

import React, { useCallback, useState } from "react"

import { IEngagementStats } from "./interface"

interface EngagementProps {
  targetId: string
  targetType: "documentary" | "comment"
  initialStats?: IEngagementStats
}

export const EngagementButtons: React.FC<EngagementProps> = ({
  targetId,
  targetType,
  initialStats,
}) => {
  const [stats, setStats] = useState<IEngagementStats>(
    initialStats || {
      userEngagement: null,
      stats: { likes: 0, dislikes: 0 },
    }
  )
  const [loading, setLoading] = useState(false)

  const handleEngagement = useCallback(
    async (engagementType: "like" | "dislike") => {
      try {
        setLoading(true)

        const response = await fetch("/api/engagements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetId,
            targetType,
            engagementType,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to update engagement")
        }

        // Fetch updated stats
        const statsResponse = await fetch(
          `/api/engagements?targetId=${targetId}&targetType=${targetType}`
        )
        const updatedStats = await statsResponse.json()
        setStats(updatedStats)
      } catch (error) {
        console.error("Error updating engagement:", error)
      } finally {
        setLoading(false)
      }
    },
    [targetId, targetType]
  )

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleEngagement("like")}
        disabled={loading}
        className={`flex items-center gap-2 rounded px-3 py-2 transition ${
          stats.userEngagement === "like"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } disabled:opacity-50`}
      >
        👍 {stats.stats.likes}
      </button>

      <button
        onClick={() => handleEngagement("dislike")}
        disabled={loading}
        className={`flex items-center gap-2 rounded px-3 py-2 transition ${
          stats.userEngagement === "dislike"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        } disabled:opacity-50`}
      >
        👎 {stats.stats.dislikes}
      </button>
    </div>
  )
}
