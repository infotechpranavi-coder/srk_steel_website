import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { uploadToCloudinary } from "@/lib/cloudinary"

// GET /api/products — list all published products
export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const query: any = {}
    if (category) query.mainCategory = category

    const products = await Product.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: products })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST /api/products — create a product (with image upload to Cloudinary)
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const formData = await req.formData()

    const title = formData.get("title") as string
    const mainCategory = formData.get("mainCategory") as string
    const subCategory = formData.get("subCategory") as string | null
    const specs = formData.get("specs") as string | null
    const description = formData.get("description") as string | null
    const price = formData.get("price") as string | null
    const stock = formData.get("stock") as string | null
    const imageFile = formData.get("image") as File | null
    const showInFooter = formData.get("showInFooter") === "true"

    if (!title || !mainCategory) {
      return NextResponse.json(
        { success: false, error: "Title and Main Category are required" },
        { status: 400 }
      )
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

    // Upload image to Cloudinary if provided
    let imageData = { url: "", publicId: "" }
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const safeFilename = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      imageData = await uploadToCloudinary(buffer, safeFilename, "products")
    }

    const product = await Product.create({
      title,
      slug,
      mainCategory,
      subCategory: subCategory || "",
      specs: specs || "",
      description: description || "",
      price: price || "",
      stock: stock || "",
      image: imageData,
      showInFooter,
    })

    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
