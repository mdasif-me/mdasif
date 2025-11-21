import { Schema } from "mongoose"

import { IComment } from "../interfaces/comment.interface"

export const SCommentSchema = new Schema<IComment>(
  {
    documentaryId: {
      type: Schema.Types.ObjectId,
      ref: "Documentary",
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)
