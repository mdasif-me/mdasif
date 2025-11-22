import { Schema } from "mongoose"

import { IDocumentary } from "../interfaces/documentary.interface"

export const SDocumentarySchema = new Schema<IDocumentary>(
  {
    badge: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)
