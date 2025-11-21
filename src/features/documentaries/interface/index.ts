export interface IDocumentary {
  _id: string
  badge: string
  title: string
  content: string
  thumbnail?: string
  description?: string
  category?: string
  views: number
  likes: number
  dislikes: number
  commentsCount: number
  createdAt: string
  isPublished: boolean
}

export interface IComment {
  _id: string
  documentaryId: string
  author: string
  email?: string
  content: string
  parentCommentId?: string
  likes: number
  dislikes: number
  isVerified: boolean
  replies: IComment[]
  createdAt: string
  isApproved: boolean
}

export interface IEngagementStats {
  userEngagement: "like" | "dislike" | null
  stats: {
    likes: number
    dislikes: number
  }
}
