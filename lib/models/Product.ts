import mongoose, { Schema, Document, models, model } from "mongoose"

// ─── Technical Spec sub-schema ───────────────────────────────────────────────
const SpecSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
)

// ─── Product Schema ──────────────────────────────────────────────────────────
export interface IProduct extends Document {
  title: string
  slug: string
  mainCategory: string
  subCategory: string
  specs: string           // short spec string (e.g. "8mm to 32mm")
  description: string
  features: string[]
  technicalSpecs: Array<{ label: string; value: string }>
  price: string           // indicative price string
  stock: string
  status: "Active" | "Low Stock" | "Critical" | "Discontinued"
  image: {
    url: string
    publicId: string
  }
  gallery: Array<{
    url: string
    publicId: string
  }>
  isPublished: boolean
  showInFooter: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, default: "" },
    specs: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [{ type: String }],
    technicalSpecs: [SpecSchema],
    price: { type: String, default: "" },
    stock: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Active", "Low Stock", "Critical", "Discontinued"],
      default: "Active",
    },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    gallery: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    isPublished: { type: Boolean, default: true },
    showInFooter: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Auto-generate slug from title before save
ProductSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  }
  next()
})

export const Product = models.Product || model<IProduct>("Product", ProductSchema)
