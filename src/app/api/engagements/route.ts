import { NextRequest } from "next/server"
import { connectDB } from "@/services/db/connect"
import {
  EEngagementTarget,
  EEngagementType,
} from "@/services/enums/engagement.enum"
import {
  badRequestResponse,
  errorResponse,
  generateAnonymousId,
  successResponse,
} from "@/services/lib/api-helpers"
import { MComment } from "@/services/model/comment.model"
import { MDocumentary } from "@/services/model/documentary.model"
import { MEngagement } from "@/services/model/engagement.model"

/**
 * Create a new engagement (like or dislike) for a target (documentary or comment)
 * @param {NextRequest} request
 * @returns {Promise<Response>} Response object
 * @throws {Error} If target not found or engagement fails to create
 */

export async function POST(request: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const body = await request.json()

    // validate body
    const { targetId, targetType, engagementType } = body

    if (!targetId) {
      return badRequestResponse("targetId is required")
    }

    if (!targetType || !Object.values(EEngagementTarget).includes(targetType)) {
      return badRequestResponse(
        "Invalid targetType. Must be 'documentary' or 'comment'"
      )
    }

    if (
      !engagementType ||
      !Object.values(EEngagementType).includes(engagementType)
    ) {
      return badRequestResponse(
        "Invalid engagementType. Must be 'like' or 'dislike'"
      )
    }

    // Validate target exists
    if (targetType === EEngagementTarget.DOCUMENTARY) {
      const doc = await MDocumentary.findById(targetId)
      if (!doc) {
        return errorResponse("Documentary not found", 404)
      }
    } else if (targetType === EEngagementTarget.COMMENT) {
      const comment = await MComment.findById(targetId)
      if (!comment) {
        return errorResponse("Comment not found", 404)
      }
    }

    // Generate anonymous ID
    const anonymousId = generateAnonymousId(request)

    // Check if user already engaged with this target
    const existingEngagement = await MEngagement.findOne({
      targetId,
      targetType,
      anonymousId,
    })

    if (existingEngagement) {
      // If same engagement type, remove it (toggle off)
      if (existingEngagement.engagementType === engagementType) {
        await MEngagement.deleteOne({ _id: existingEngagement._id })

        // Update counter
        if (targetType === EEngagementTarget.DOCUMENTARY) {
          const field =
            engagementType === EEngagementType.LIKE ? "likes" : "dislikes"
          await MDocumentary.findByIdAndUpdate(targetId, {
            $inc: { [field]: -1 },
          })
        } else {
          const field =
            engagementType === EEngagementType.LIKE ? "likes" : "dislikes"
          await MComment.findByIdAndUpdate(targetId, {
            $inc: { [field]: -1 },
          })
        }

        return successResponse({ message: `${engagementType} removed` }, 200)
      }

      // Different engagement type - update it
      const oldType = existingEngagement.engagementType
      existingEngagement.engagementType = engagementType
      await existingEngagement.save()

      // Update counters
      if (targetType === EEngagementTarget.DOCUMENTARY) {
        const oldField = oldType === EEngagementType.LIKE ? "likes" : "dislikes"
        const newField =
          engagementType === EEngagementType.LIKE ? "likes" : "dislikes"

        await MDocumentary.findByIdAndUpdate(targetId, {
          $inc: { [oldField]: -1, [newField]: 1 },
        })
      } else {
        const oldField = oldType === EEngagementType.LIKE ? "likes" : "dislikes"
        const newField =
          engagementType === EEngagementType.LIKE ? "likes" : "dislikes"

        await MComment.findByIdAndUpdate(targetId, {
          $inc: { [oldField]: -1, [newField]: 1 },
        })
      }

      return successResponse({ message: `Changed to ${engagementType}` })
    }

    // Create new engagement
    const engagement = new MEngagement({
      targetId,
      targetType,
      engagementType,
      anonymousId,
    })

    await engagement.save()

    // Update counter
    if (targetType === EEngagementTarget.DOCUMENTARY) {
      const field =
        engagementType === EEngagementType.LIKE ? "likes" : "dislikes"
      await MDocumentary.findByIdAndUpdate(targetId, {
        $inc: { [field]: 1 },
      })
    } else {
      const field =
        engagementType === EEngagementType.LIKE ? "likes" : "dislikes"
      await MComment.findByIdAndUpdate(targetId, {
        $inc: { [field]: 1 },
      })
    }

    return successResponse(
      { message: `${engagementType} added`, engagement },
      201
    )
  } catch (error) {
    console.error("Error creating engagement:", error)
    return errorResponse("Failed to create engagement")
  }
}

/**
 * Get user's engagement and engagement stats for a target (documentary or comment)
 * @param {NextRequest} request
 * @returns {Promise<Response>} Response object
 * @throws {Error} If target not found or engagement fails to fetch
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const targetId = searchParams.get("targetId")
    const targetType = searchParams.get("targetType")

    if (!targetId || !targetType) {
      return badRequestResponse("targetId and targetType are required")
    }

    const anonymousId = generateAnonymousId(request)

    // Get user's engagement
    const userEngagement = await MEngagement.findOne({
      targetId,
      targetType,
      anonymousId,
    })

    // Get engagement stats
    const stats = await MEngagement.aggregate([
      {
        $match: {
          targetId: targetId,
          targetType: targetType,
        },
      },
      {
        $group: {
          _id: "$engagementType",
          count: { $sum: 1 },
        },
      },
    ])

    const result = {
      userEngagement: userEngagement ? userEngagement.engagementType : null,
      stats: {
        likes: stats.find((s) => s._id === EEngagementType.LIKE)?.count || 0,
        dislikes:
          stats.find((s) => s._id === EEngagementType.DISLIKE)?.count || 0,
      },
    }

    return successResponse(result)
  } catch (error) {
    console.error("Error fetching engagement:", error)
    return errorResponse("Failed to fetch engagement")
  }
}
