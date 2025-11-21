export interface IDocumentary extends Document {
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
  createdAt: Date
  updatedAt: Date
  isPublished: boolean
}
