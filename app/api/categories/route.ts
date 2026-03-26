import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"
import { uploadToCloudinary } from "@/lib/cloudinary"

// GET /api/categories — list all categories
export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find().sort({ createdAt: 1 }).lean()
    return NextResponse.json({ success: true, data: categories })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST /api/categories — create new main category (supports FormData with image)
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const contentType = req.headers.get("content-type") || ""

    let name = ""
    let description = ""
    let imageData = { url: "", publicId: "" }

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      name = formData.get("name") as string
      description = (formData.get("description") as string) || ""
      const imageFile = formData.get("image") as File | null
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const safeFilename = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")
        imageData = await uploadToCloudinary(buffer, safeFilename, "categories")
      }
    } else {
      const body = await req.json()
      name = body.name
      description = body.description || ""
    }

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")

    const existing = await Category.findOne({ slug })
    if (existing) {
      return NextResponse.json({ success: false, error: "Category already exists" }, { status: 409 })
    }

    const category = await Category.create({ name, slug, description, image: imageData, subcategories: [] })
    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
