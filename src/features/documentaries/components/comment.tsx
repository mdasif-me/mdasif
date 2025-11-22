import { useCallback, useEffect, useState } from "react"
import {
  ThumbsDownIcon as ThumbsDownIconFilled,
  ThumbsUpIcon as ThumbsUpIconFilled,
} from "@hugeicons-pro/core-solid-rounded"
import {
  Message01Icon,
  SendToMobile02Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { IComment } from "../interface"

interface CommentProps {
  documentaryId: string
}

export const Comment = ({ documentaryId }: CommentProps) => {
  const [comments, setComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [author, setAuthor] = useState("")
  const [email, setEmail] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 })
  const [userAnswer, setUserAnswer] = useState("")
  const [captchaError, setCaptchaError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
    })
    setUserAnswer("")
    setCaptchaError(false)
  }

  const fetchComments = useCallback(async () => {
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
  }, [documentaryId])

  useEffect(() => {
    fetchComments()
    generateCaptcha()
  }, [fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (parseInt(userAnswer) !== captcha.answer) {
      setCaptchaError(true)
      return
    }

    if (!author.trim() || !newComment.trim()) {
      setError("Name and comment are required")
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentaryId,
          author: author.trim(),
          email: email.trim() || undefined,
          content: newComment.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to post comment")
      }

      const savedComment = await response.json()
      setComments([savedComment, ...comments])
      setNewComment("")
      setAuthor("")
      setEmail("")
      generateCaptcha()
      setSuccess("Comment posted successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment")
    } finally {
      setSubmitting(false)
    }
  }

  const handleReplySubmit = async (
    parentId: string,
    replyContent: string,
    replyAuthor: string,
    replyEmail: string
  ) => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentaryId,
          parentCommentId: parentId,
          author: replyAuthor.trim(),
          email: replyEmail.trim() || undefined,
          content: replyContent.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to post reply")
      }

      // Refresh comments to show the new reply
      await fetchComments()
      setReplyingTo(null)
    } catch (err) {
      console.error("Error posting reply:", err)
      alert("Failed to post reply. Please try again.")
    }
  }

  return (
    <section className="space-y-4">
      <div className="border-border/10">
        <h2 className="text-foreground mb-8 flex items-center gap-2 text-2xl font-bold">
          <HugeiconsIcon icon={Message01Icon} className="h-6 w-6" />
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-secondary-foreground border-border/10 rounded-2xl border p-4"
        >
          <div className="space-y-4">
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-500">{success}</div>}

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Name *"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-border/10 w-full rounded-md border p-3 outline-none focus:ring-blue-500/20"
                required
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border/10 w-full rounded-md border p-3 outline-none focus:ring-blue-500/20"
              />
            </div>

            <textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-border/10 w-full min-h-[100px] resize-none rounded-md border p-3 outline-none focus:ring-blue-500/20"
              required
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Verify you are human: {captcha.question} =
                </span>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value)
                    setCaptchaError(false)
                  }}
                  className={`w-16 rounded-md border p-2 text-center text-sm outline-none ${
                    captchaError
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-border/10 focus:ring-blue-500/20"
                  }`}
                  placeholder="?"
                />
                {captchaError && (
                  <span className="text-xs text-red-500">Incorrect</span>
                )}
              </div>

              <Button type="submit" className="gap-2" disabled={submitting}>
                <HugeiconsIcon icon={SendToMobile02Icon} className="h-4 w-4" />
                {submitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4 mt-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-center text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                onReply={(id) => setReplyingTo(id)}
                replyingTo={replyingTo}
                onCancelReply={() => setReplyingTo(null)}
                onReplySubmit={handleReplySubmit}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

const CommentItem = ({
  comment,
  onReply,
  replyingTo,
  onCancelReply,
  onReplySubmit,
}: {
  comment: IComment
  onReply: (id: string) => void
  replyingTo: string | null
  onCancelReply: () => void
  onReplySubmit: (
    parentId: string,
    content: string,
    author: string,
    email: string
  ) => Promise<void>
}) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [replyAuthor, setReplyAuthor] = useState("")
  const [replyEmail, setReplyEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [likes, setLikes] = useState(comment.likes || 0)
  const [dislikes, setDislikes] = useState(comment.dislikes || 0)
  const [userEngagement, setUserEngagement] = useState<
    "like" | "dislike" | null
  >(null)

  // Fetch initial engagement status
  useEffect(() => {
    const fetchEngagement = async () => {
      try {
        const response = await fetch(
          `/api/engagements?targetId=${comment._id}&targetType=comment`
        )
        if (response.ok) {
          const data = await response.json()
          setUserEngagement(data.userEngagement)
          setLikes(data.stats.likes)
          setDislikes(data.stats.dislikes)
        }
      } catch (error) {
        console.error("Error fetching engagement:", error)
      }
    }
    fetchEngagement()
  }, [comment._id])

  const handleEngagement = async (type: "like" | "dislike") => {
    try {
      const response = await fetch("/api/engagements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetId: comment._id,
          targetType: "comment",
          engagementType: type,
        }),
      })

      if (response.ok) {
        await response.json()
        // Refresh stats
        const statsResponse = await fetch(
          `/api/engagements?targetId=${comment._id}&targetType=comment`
        )
        const statsData = await statsResponse.json()
        setUserEngagement(statsData.userEngagement)
        setLikes(statsData.stats.likes)
        setDislikes(statsData.stats.dislikes)
      }
    } catch (error) {
      console.error("Error updating engagement:", error)
    }
  }

  const handleSubmitReply = async () => {
    if (!replyAuthor.trim() || !replyContent.trim()) {
      alert("Name and content are required")
      return
    }
    setSubmitting(true)
    await onReplySubmit(comment._id, replyContent, replyAuthor, replyEmail)
    setSubmitting(false)
    setReplyContent("")
    setReplyAuthor("")
    setReplyEmail("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-secondary-foreground border-border/10 hover:bg-blog-hover rounded-2xl border p-4 transition-colors">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10 capitalize">
          <AvatarImage src="" alt={`${comment.author}'s avatar`} />
          <AvatarFallback className="uppercase">
            {comment.author?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3 capitalize">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">{comment.author}</p>
              <p className="text-blog-meta text-sm">
                {formatDate(comment.createdAt)}
              </p>
            </div>
          </div>

          <p className="text-blog-content leading-relaxed">{comment.content}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleEngagement("like")}
              className={`gap-2 flex items-center cursor-pointer ${
                userEngagement === "like" ? "text-primary" : "text-blog-meta"
              }`}
            >
              {userEngagement === "like" ? (
                <HugeiconsIcon icon={ThumbsUpIconFilled} className="h-4 w-4" />
              ) : (
                <HugeiconsIcon icon={ThumbsUpIcon} className="h-4 w-4" />
              )}
              {likes}
            </button>
            <button
              onClick={() => handleEngagement("dislike")}
              className={`gap-2 flex items-center cursor-pointer ${
                userEngagement === "dislike" ? "text-red-600" : "text-blog-meta"
              }`}
            >
              {userEngagement === "dislike" ? (
                <HugeiconsIcon
                  icon={ThumbsDownIconFilled}
                  className="h-4 w-4"
                />
              ) : (
                <HugeiconsIcon icon={ThumbsDownIcon} className="h-4 w-4" />
              )}
              {dislikes}
            </button>
            <Button size={"sm"} onClick={() => onReply(comment._id)}>
              Reply
            </Button>
          </div>

          {/* Reply Form */}
          {replyingTo === comment._id && (
            <div className="mt-4 space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name *"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  className="border-border/10 w-full rounded-md border p-2 text-sm outline-none focus:ring-blue-500/20"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  className="border-border/10 w-full rounded-md border p-2 text-sm outline-none focus:ring-blue-500/20"
                />
              </div>
              <textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="border-border/10 w-full min-h-[80px] resize-none rounded-md border p-3 outline-none focus:ring-blue-500/20"
              />
              <div className="flex justify-end gap-2">
                <Button size={"sm"} variant={"ghost"} onClick={onCancelReply}>
                  Cancel
                </Button>
                <Button
                  size={"sm"}
                  className="bg-primary text-primary-foreground"
                  onClick={handleSubmitReply}
                  disabled={submitting}
                >
                  {submitting ? "Replying..." : "Reply"}
                </Button>
              </div>
            </div>
          )}

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-sm text-gray-500"
              >
                {showReplies ? "Hide" : "Show"} {comment.replies.length} replies
              </button>

              {showReplies && (
                <div className="mt-4 space-y-4 border-l-2 border-border/10 pl-4">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply._id}
                      comment={reply}
                      onReply={onReply}
                      replyingTo={replyingTo}
                      onCancelReply={onCancelReply}
                      onReplySubmit={onReplySubmit}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
