import { Schema } from "mongoose"

import { EEngagementTarget, EEngagementType } from "../enums/engagement.enum"
import { IEngagement } from "../interfaces/engagement.interface"

export const SEngagementSchema = new Schema<IEngagement>(
  {
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: Object.values(EEngagementTarget),
      required: true,
    },
    engagementType: {
      type: String,
      enum: Object.values(EEngagementType),
      required: true,
    },
    anonymousId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)
