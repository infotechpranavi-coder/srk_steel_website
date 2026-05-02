import mongoose, { Schema, Document, models, model } from "mongoose"

export interface IInquiry extends Document {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "Pending" | "In Progress" | "Completed"
  createdAt: Date
  updatedAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, default: "" },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
)

export const Inquiry = models.Inquiry || model<IInquiry>("Inquiry", InquirySchema)
