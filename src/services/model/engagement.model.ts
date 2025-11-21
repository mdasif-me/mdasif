import mongoose from "mongoose"

import { IEngagement } from "../interfaces/engagement.interface"
import { SEngagementSchema } from "../schemas/engagement.schema"

SEngagementSchema.index(
  { targetId: 1, targetType: 1, anonymousId: 1 },
  { unique: true }
)

export const MEngagement =
  mongoose.models.Engagement ||
  mongoose.model<IEngagement>("Engagement", SEngagementSchema)
