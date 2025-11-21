import mongoose from "mongoose"

export interface IComment extends Document {
  documentaryId: mongoose.Types.ObjectId
  author: string
  email?: string
  content: string
  parentCommentId?: mongoose.Types.ObjectId
  likes: number
  dislikes: number
  isVerified: boolean
  replies: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
  isApproved: boolean
}
