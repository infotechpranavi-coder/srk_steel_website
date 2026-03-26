import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"
import { uploadToCloudinary } from "@/lib/cloudinary"

// POST /api/categories/[id]/subcategories — add a sub-category
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    
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

    const category = await Category.findByIdAndUpdate(
      id,
      { $push: { subcategories: { name, slug, description, image: imageData } } },
      { new: true }
    )

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// DELETE /api/categories/[id]/subcategories — remove a sub-category
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const { subId } = await req.json()

    const category = await Category.findByIdAndUpdate(
      id,
      { $pull: { subcategories: { _id: subId } } },
      { new: true }
    )

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PATCH /api/categories/[id]/subcategories — update a sub-category
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    
    const contentType = req.headers.get("content-type") || ""
    let subId = ""
    let name = ""
    let description = ""
    let imageData: { url: string; publicId: string } | undefined = undefined

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      subId = formData.get("subId") as string
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
      subId = body.subId
      name = body.name
      description = body.description
    }

    if (!subId) {
      return NextResponse.json({ success: false, error: "Sub-category ID is required" }, { status: 400 })
    }

    const updateFields: any = {}
    if (name) {
      updateFields["subcategories.$[elem].name"] = name
      updateFields["subcategories.$[elem].slug"] = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    }
    if (description !== undefined) {
      updateFields["subcategories.$[elem].description"] = description
    }
    if (imageData) {
      updateFields["subcategories.$[elem].image"] = imageData
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { 
        arrayFilters: [{ "elem._id": subId }],
        new: true 
      }
    )

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
