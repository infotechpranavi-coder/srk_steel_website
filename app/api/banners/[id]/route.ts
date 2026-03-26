import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Banner } from "@/lib/models/Banner"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const formData = await req.formData()
    
    const title = formData.get("title") as string
    const subtitle = formData.get("subtitle") as string
    const description = (formData.get("description") as string) || ""
    const ctaText = (formData.get("ctaText") as string) || "Explore Products"
    const ctaLink = (formData.get("ctaLink") as string) || "/products"
    const order = Number(formData.get("order") || 0)
    const imageFile = formData.get("image") as File | null

    const updateData: any = {
      title,
      subtitle,
      description,
      ctaText,
      ctaLink,
      order
    }

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const safeFilename = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const imageData = await uploadToCloudinary(buffer, safeFilename, "banners")
      updateData.image = imageData
    }

    const banner = await Banner.findByIdAndUpdate(id, updateData, { new: true })
    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: banner })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const deleted = await Banner.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: deleted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
