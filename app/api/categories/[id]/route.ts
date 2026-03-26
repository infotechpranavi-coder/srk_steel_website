import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"
import { uploadToCloudinary } from "@/lib/cloudinary"

// DELETE /api/categories/[id] — delete entire main category
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const deleted = await Category.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: deleted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PATCH /api/categories/[id] — update name, description, and image
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    
    const contentType = req.headers.get("content-type") || ""
    let name = ""
    let description = ""
    let imageData: { url: string; publicId: string } | undefined = undefined

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
      description = body.description
    }

    const updateData: any = {}
    if (name) {
      updateData.name = name
      updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    }
    if (description !== undefined) updateData.description = description
    if (imageData) updateData.image = imageData

    const updated = await Category.findByIdAndUpdate(id, updateData, { new: true })
    if (!updated) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
