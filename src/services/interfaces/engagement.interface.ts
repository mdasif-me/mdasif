import mongoose from "mongoose"

import { EEngagementTarget, EEngagementType } from "../enums/engagement.enum"

export interface IEngagement extends Document {
  targetId: mongoose.Types.ObjectId
  targetType: EEngagementTarget
  engagementType: EEngagementType
  anonymousId: string
  createdAt: Date
  updatedAt: Date
}
