import { NextRequest } from "next/server"
import { connectDB } from "@/services/db/connect"
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "@/services/lib/api-helpers"
import { MComment } from "@/services/model/comment.model"
import { MDocumentary } from "@/services/model/documentary.model"

/**
 * GET /api/comments?documentaryId=xxx&parentCommentId=xxx
 * Get comments for a documentary or replies to a comment
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const documentaryId = searchParams.get("documentaryId")
    const parentCommentId = searchParams.get("parentCommentId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!documentaryId && !parentCommentId) {
      return badRequestResponse(
        "Either documentaryId or parentCommentId is required"
      )
    }

    const skip = (page - 1) * limit

    const filter: Record<string, unknown> = { isApproved: true }

    if (documentaryId) {
      filter.documentaryId = documentaryId
      filter.parentCommentId = null // Get root comments only
    } else if (parentCommentId) {
      filter.parentCommentId = parentCommentId // Get replies
    }

    const total = await MComment.countDocuments(filter)

    const comments = await MComment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("replies", "-__v")
      .lean()

    return successResponse({
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return errorResponse("Failed to fetch comments")
  }
}

/**
 * POST /api/comments
 * Create a new comment (anonymous, requires verification)
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate required fields
    const { documentaryId, author, content } = body

    if (!documentaryId) {
      return badRequestResponse("documentaryId is required")
    }

    if (!author || author.trim().length === 0) {
      return badRequestResponse("author name is required")
    }

    if (!content || content.trim().length === 0) {
      return badRequestResponse("comment content is required")
    }

    // Validate documentaryId exists (for main comments)
    if (!body.parentCommentId) {
      const documentary = await MDocumentary.findById(documentaryId)
      if (!documentary) {
        return errorResponse("Documentary not found", 404)
      }
    }

    // Create comment
    const comment = new MComment({
      documentaryId,
      author: author.trim(),
      email: body.email?.trim(),
      content: content.trim(),
      parentCommentId: body.parentCommentId || null,
      isVerified: false, // Needs math verification
    })

    const saved = await comment.save()

    // Increment comments count if it's a root comment
    if (!body.parentCommentId) {
      await MDocumentary.findByIdAndUpdate(documentaryId, {
        $inc: { commentsCount: 1 },
      })
    } else {
      // Add to parent comment's replies
      await MComment.findByIdAndUpdate(body.parentCommentId, {
        $push: { replies: saved._id },
      })
    }

    return successResponse(saved, 201)
  } catch (error) {
    console.error("Error creating comment:", error)
    return errorResponse("Failed to create comment")
  }
}
