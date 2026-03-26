import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary"

// GET /api/products/[slug] — get a single product by slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    const { slug } = await params
    const product = await Product.findOne({ slug }).lean()
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: product })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PATCH /api/products/[slug] — update a product
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    const { slug } = await params

    const formData = await req.formData()
    const updates: any = {}

    ;["title", "mainCategory", "subCategory", "specs", "description", "price", "stock", "status"].forEach((field) => {
      const val = formData.get(field)
      if (val !== null) updates[field] = val
    })

    // Handle new image
    const imageFile = formData.get("image") as File | null
    if (imageFile && imageFile.size > 0) {
      const existing = await Product.findOne({ slug }).select("image").lean() as any
      if (existing?.image?.publicId) {
        await deleteFromCloudinary(existing.image.publicId)
      }
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const safeFilename = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const imageData = await uploadToCloudinary(buffer, safeFilename, "products")
      updates.image = imageData
    }

    const product = await Product.findOneAndUpdate({ slug }, updates, { new: true })
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: product })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// DELETE /api/products/[slug] — delete a product
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    const { slug } = await params
    const product = await Product.findOneAndDelete({ slug }) as any
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }
    if (product.image?.publicId) {
      await deleteFromCloudinary(product.image.publicId)
    }
    return NextResponse.json({ success: true, data: product })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
