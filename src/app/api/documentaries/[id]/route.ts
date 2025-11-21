import { NextRequest } from "next/server"
import { connectDB } from "@/services/db/connect"
import {
  badRequestResponse,
  errorResponse,
  successResponse,
  unauthorizedResponse,
  verifySecretKey,
} from "@/services/lib/api-helpers"
import { MComment } from "@/services/model/comment.model"
import { MDocumentary } from "@/services/model/documentary.model"
import { MEngagement } from "@/services/model/engagement.model"

/**
 * GET /api/documentaries/[id]
 * Get a single documentary by ID with comments count
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return badRequestResponse("Invalid documentary ID format")
    }

    const documentary = await MDocumentary.findById(id)

    if (!documentary) {
      return errorResponse("Documentary not found", 404)
    }

    // Increment view count
    documentary.views = (documentary.views || 0) + 1
    await documentary.save()

    // Get comments for this documentary
    const comments = await MComment.find({
      documentaryId: id,
      parentCommentId: null,
      isApproved: true,
    })
      .sort({ createdAt: -1 })
      .lean()

    return successResponse({
      documentary,
      commentsCount: comments.length,
    })
  } catch (error) {
    console.error("Error fetching documentary:", error)
    return errorResponse("Failed to fetch documentary")
  }
}

/**
 * PUT /api/documentaries/[id]
 * Update a documentary (requires secret key)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify secret key
    if (!verifySecretKey(request)) {
      return unauthorizedResponse()
    }

    await connectDB()

    const { id } = await params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return badRequestResponse("Invalid documentary ID format")
    }

    const body = await request.json()

    const documentary = await MDocumentary.findById(id)

    if (!documentary) {
      return errorResponse("Documentary not found", 404)
    }

    // Update fields
    if (body.badge) documentary.badge = body.badge.trim()
    if (body.title) documentary.title = body.title.trim()
    if (body.content) documentary.content = body.content
    if (body.thumbnail !== undefined)
      documentary.thumbnail = body.thumbnail?.trim()
    if (body.description !== undefined)
      documentary.description = body.description?.trim()
    if (body.category !== undefined)
      documentary.category = body.category?.trim() || "General"
    if (body.isPublished !== undefined)
      documentary.isPublished = body.isPublished

    const updated = await documentary.save()

    return successResponse(updated)
  } catch (error) {
    console.error("Error updating documentary:", error)
    return errorResponse("Failed to update documentary")
  }
}

/**
 * DELETE /api/documentaries/[id]
 * Delete a documentary (requires secret key)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify secret key
    if (!verifySecretKey(request)) {
      return unauthorizedResponse()
    }

    await connectDB()

    const { id } = await params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return badRequestResponse("Invalid documentary ID format")
    }

    const documentary = await MDocumentary.findByIdAndDelete(id)

    if (!documentary) {
      return errorResponse("Documentary not found", 404)
    }

    // Clean up associated data
    await MComment.deleteMany({ documentaryId: id })
    await MEngagement.deleteMany({ targetId: id })

    return successResponse({ message: "Documentary deleted successfully" })
  } catch (error) {
    console.error("Error deleting documentary:", error)
    return errorResponse("Failed to delete documentary")
  }
}
