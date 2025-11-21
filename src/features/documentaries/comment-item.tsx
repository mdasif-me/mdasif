"use client"

import React, { useState } from "react"

import { EngagementButtons } from "./engagement-buttons"
import { IComment } from "./interface"

interface CommentItemProps {
  comment: IComment
  onReplyClick?: (parentCommentId: string) => void
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReplyClick,
}) => {
  const [showReplies, setShowReplies] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-3 border-l-4 border-gray-300 pl-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-800">{comment.author}</p>
          <p className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </p>
          {comment.isVerified && (
            <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
              ✓ Verified
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700">{comment.content}</p>

      <div className="flex items-center gap-4">
        <EngagementButtons
          targetId={comment._id}
          targetType="comment"
          initialStats={{
            userEngagement: null,
            stats: {
              likes: comment.likes,
              dislikes: comment.dislikes,
            },
          }}
        />

        {onReplyClick && (
          <button
            onClick={() => onReplyClick(comment._id)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reply
          </button>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {showReplies ? "Hide" : "Show"} {comment.replies.length} repl
            {comment.replies.length === 1 ? "y" : "ies"}
          </button>

          {showReplies && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  onReplyClick={onReplyClick}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
