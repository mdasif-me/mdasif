import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"

const DOCUMENTARY_SECRET_KEY = process.env.DOCUMENTARY_SECRET_KEY

if (!DOCUMENTARY_SECRET_KEY) {
  console.warn(
    "Warning: DOCUMENTARY_SECRET_KEY is not defined in environment variables"
  )
}

/**
 * Verify the secret key from request headers
 * @param request - NextRequest object
 * @returns boolean - true if secret key is valid
 */
export function verifySecretKey(request: NextRequest): boolean {
  const secretKey = request.headers.get("x-documentary-secret")

  if (!secretKey || !DOCUMENTARY_SECRET_KEY) {
    return false
  }

  return secretKey === DOCUMENTARY_SECRET_KEY
}

/**
 * Generate a hash from IP and User Agent for anonymous identification
 * @param request - NextRequest object
 * @returns string - hash of user identifier
 */
export function generateAnonymousId(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  const userAgent = request.headers.get("user-agent") || "unknown"

  const combined = `${ip}:${userAgent}`
  return crypto.createHash("sha256").update(combined).digest("hex")
}

/**
 * Generates an unauthorized response with a default message of
 * "Unauthorized - Invalid or missing secret key" or a custom message.
 * @param {string} [message] - Custom error message
 * @returns {NextResponse} - Response with 401 status code and error message
 */
export function unauthorizedResponse(
  message: string = "Unauthorized - Invalid or missing secret key"
): NextResponse {
  return NextResponse.json({ error: message }, { status: 401 })
}

/**
 * Generates a bad request response with a default status code of 400.
 * @param {string} message - Error message to return in response
 * @returns {NextResponse} - Response with 400 status code and error message
 */
export function badRequestResponse(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 })
}

/**
 * Generates a successful response with a default status code of 200.
 * @template T - Type of data to return in response
 * @param {T} data - Data to return in response
 * @param {number} [status] - Status code of response (default: 200)
 * @returns {NextResponse} - Response with given status code and data
 */
export function successResponse<T>(
  data: T,
  status: number = 200
): NextResponse {
  return NextResponse.json(data, { status })
}

/**
 * Generates an error response with a default status code of 500.
 * @param {string} message - Error message to return in response
 * @param {number} [status] - Status code of response (default: 500)
 * @returns {NextResponse} - Response with given status code and error message
 */
export function errorResponse(
  message: string,
  status: number = 500
): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
