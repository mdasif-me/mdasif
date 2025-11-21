import mongoose from "mongoose"

import { IDocumentary } from "../interfaces/documentary.interface"
import { SDocumentarySchema } from "../schemas/documentary.schema"

SDocumentarySchema.index({ category: 1, isPublished: 1 })
SDocumentarySchema.index({ createdAt: -1 })

export const MDocumentary =
  mongoose.models.Documentary ||
  mongoose.model<IDocumentary>("Documentary", SDocumentarySchema)
