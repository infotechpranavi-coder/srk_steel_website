import mongoose from "mongoose"

const BannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  ctaText: { type: String, default: "Explore Products" },
  ctaLink: { type: String, default: "/products" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
})

export const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema)
