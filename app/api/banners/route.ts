import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Banner } from "@/lib/models/Banner"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function GET() {
  try {
    await connectDB()
    const banners = await Banner.find().sort({ order: 1 }).lean()
    return NextResponse.json({ success: true, data: banners })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const formData = await req.formData()
    
    const title = formData.get("title") as string
    const subtitle = formData.get("subtitle") as string
    const description = (formData.get("description") as string) || ""
    const ctaText = (formData.get("ctaText") as string) || "Explore Products"
    const ctaLink = (formData.get("ctaLink") as string) || "/products"
    const order = Number(formData.get("order") || 0)
    
    const imageFile = formData.get("image") as File | null
    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ success: false, error: "Image is required" }, { status: 400 })
    }

    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const safeFilename = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const imageData = await uploadToCloudinary(buffer, safeFilename, "banners")

    const banner = await Banner.create({
      title,
      subtitle,
      description,
      ctaText,
      ctaLink,
      image: imageData,
      order
    })

    return NextResponse.json({ success: true, data: banner }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
