import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    url: { type: String },
    publicId: { type: String }
  },
  category: { type: String, required: true },
  author: { type: String, default: "SRK Admin" },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Published", "Draft"], default: "Published" },
  tags: [String],
}, { timestamps: true })

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
