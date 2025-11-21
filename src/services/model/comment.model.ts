import mongoose from "mongoose"

import { IComment } from "../interfaces/comment.interface"
import { SCommentSchema } from "../schemas/comment.schema"

SCommentSchema.index({ documentaryId: 1, createdAt: -1 })
SCommentSchema.index({ parentCommentId: 1 })

export const MComment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", SCommentSchema)
