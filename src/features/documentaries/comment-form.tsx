"use client"

import React, { useState } from "react"

import { IComment } from "./interface"

interface CommentFormProps {
  documentaryId: string
  parentCommentId?: string
  onCommentAdded?: (comment: IComment) => void
}

export const CommentForm: React.FC<CommentFormProps> = ({
  documentaryId,
  parentCommentId,
  onCommentAdded,
}) => {
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!author.trim() || !content.trim()) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentaryId,
          author: author.trim(),
          email: email.trim() || undefined,
          content: content.trim(),
          parentCommentId: parentCommentId || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to post comment")
      }

      const newComment = await response.json()
      setAuthor("")
      setEmail("")
      setContent("")
      setSuccess("Comment posted successfully! Thank you for your input.")

      if (onCommentAdded) {
        onCommentAdded(newComment)
      }

      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg bg-gray-50 p-4"
    >
      {error && (
        <div className="rounded bg-red-100 p-3 text-red-700">⚠️ {error}</div>
      )}

      {success && (
        <div className="rounded bg-green-100 p-3 text-green-700">
          ✓ {success}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email (optional)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comment * {parentCommentId && "(Reply)"}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  )
}
