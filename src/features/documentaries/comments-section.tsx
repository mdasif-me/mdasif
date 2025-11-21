"use client"

import React, { useEffect, useState } from "react"

import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import { IComment } from "./interface"

interface CommentsSection {
  documentaryId: string
}

export const CommentsSection: React.FC<CommentsSection> = ({
  documentaryId,
}) => {
  const [comments, setComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/comments?documentaryId=${documentaryId}&limit=50`
        )

        if (response.ok) {
          const data = await response.json()
          setComments(data.comments)
        }
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [documentaryId])

  const handleCommentAdded = (newComment: IComment) => {
    setComments([newComment, ...comments])
    setReplyingTo(null)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Comments Section</h3>

      <CommentForm
        documentaryId={documentaryId}
        parentCommentId={replyingTo || undefined}
        onCommentAdded={handleCommentAdded}
      />

      {replyingTo && (
        <button
          onClick={() => setReplyingTo(null)}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel reply
        </button>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReplyClick={setReplyingTo}
            />
          ))}
        </div>
      )}
    </div>
  )
}
