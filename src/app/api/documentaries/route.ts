import { NextRequest } from "next/server"
import { connectDB } from "@/services/db/connect"
import {
  badRequestResponse,
  errorResponse,
  successResponse,
  unauthorizedResponse,
  verifySecretKey,
} from "@/services/lib/api-helpers"
import { MDocumentary } from "@/services/model/documentary.model"

/**
 * GET /api/documentaries
 * Get all documentaries with optional filters for category and search
 * @param {NextRequest} request
 * @returns {Promise<NextResponse>} response
 * @example
 * // Get all documentaries
 * GET /api/documentaries?page=1&limit=10
 * // Get documentaries by category
 * GET /api/documentaries?page=1&limit=10&category=Frontend
 * // Get documentaries by search
 * GET /api/documentaries?page=1&limit=10&search=react
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const skip = (page - 1) * limit

    // Build filter query
    const filter: Record<string, unknown> = { isPublished: true }

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    // Get total count for pagination
    const total = await MDocumentary.countDocuments(filter)

    // Get documentaries
    const documentaries = await MDocumentary.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return successResponse({
      documentaries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching documentaries:", error)
    return errorResponse("Failed to fetch documentaries")
  }
}

/**
 * POST /api/documentaries
 * Create a new documentary (requires secret key)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret key
    if (!verifySecretKey(request)) {
      return unauthorizedResponse()
    }

    await connectDB()

    const body = await request.json()

    // Validate required fields
    const { badge, title, content } = body

    if (!badge || !title || !content) {
      return badRequestResponse(
        "Missing required fields: badge, title, content"
      )
    }

    // Create new documentary
    const documentary = new MDocumentary({
      badge: badge.trim(),
      title: title.trim(),
      content,
      thumbnail: body.thumbnail?.trim(),
      description: body.description?.trim(),
      category: body.category?.trim() || "General",
      isPublished: body.isPublished !== false,
    })

    const saved = await documentary.save()

    return successResponse(saved, 201)
  } catch (error) {
    console.error("Error creating documentary:", error)
    return errorResponse("Failed to create documentary")
  }
}
