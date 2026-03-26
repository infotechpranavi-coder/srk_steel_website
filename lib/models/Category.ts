import mongoose, { Schema, Document, models, model } from "mongoose"

// ─── Sub-Category Schema ────────────────────────────────────────────────────
const SubCategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, default: "" },
  image: {
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },
})

// ─── Category Schema ────────────────────────────────────────────────────────
export interface ICategory extends Document {
  name: string
  slug: string
  description: string
  image: { url: string; publicId: string }
  subcategories: Array<{
    name: string
    slug: string
    description?: string
    image?: { url: string; publicId: string }
  }>
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    subcategories: [SubCategorySchema],
  },
  { timestamps: true }
)

export const Category = models.Category || model<ICategory>("Category", CategorySchema)
