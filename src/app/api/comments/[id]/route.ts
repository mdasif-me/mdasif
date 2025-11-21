import { NextRequest } from "next/server"
import { connectDB } from "@/services/db/connect"
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "@/services/lib/api-helpers"
import { MComment } from "@/services/model/comment.model"
import { MDocumentary } from "@/services/model/documentary.model"
import { MEngagement } from "@/services/model/engagement.model"

/**
 * PUT /api/comments/[id]
 * update a comment (edit content)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const { id } = params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return badRequestResponse("Invalid comment ID format")
    }

    const body = await request.json()

    const comment = await MComment.findById(id)

    if (!comment) {
      return errorResponse("Comment not found", 404)
    }

    // Check if comment was created more than 24 hours ago
    const now = new Date()
    const createdTime = new Date(comment.createdAt)
    const hoursDiff = (now.getTime() - createdTime.getTime()) / (1000 * 60 * 60)

    if (hoursDiff > 24) {
      return errorResponse("Cannot edit comments older than 24 hours", 403)
    }

    // Update content
    if (body.content) {
      comment.content = body.content.trim()
    }

    // Update author if provided
    if (body.author) {
      comment.author = body.author.trim()
    }

    const updated = await comment.save()

    return successResponse(updated)
  } catch (error) {
    console.error("Error updating comment:", error)
    return errorResponse("Failed to update comment")
  }
}

/**
 * DELETE /api/comments/[id]
 * Delete a comment
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const { id } = params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return badRequestResponse("Invalid comment ID format")
    }

    const comment = await MComment.findByIdAndDelete(id)

    if (!comment) {
      return errorResponse("Comment not found", 404)
    }

    // Decrement comments count if it's a root comment
    if (!comment.parentCommentId) {
      await MDocumentary.findByIdAndUpdate(comment.documentaryId, {
        $inc: { commentsCount: -1 },
      })
    } else {
      // Remove from parent comment's replies
      await MComment.findByIdAndUpdate(comment.parentCommentId, {
        $pull: { replies: id },
      })
    }

    // Clean up associated engagements
    await MEngagement.deleteMany({ targetId: id })

    return successResponse({ message: "Comment deleted successfully" })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return errorResponse("Failed to delete comment")
  }
}
