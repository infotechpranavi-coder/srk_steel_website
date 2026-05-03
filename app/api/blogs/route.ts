import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Blog from "@/lib/models/Blog"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function GET() {
  await dbConnect()
  try {
    const blogs = await Blog.find({}).sort({ date: -1 })
    return NextResponse.json({ success: true, data: blogs })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()
  try {
    const formData = await req.formData()
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string || title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const author = formData.get("author") as string || "SRK Admin"
    const status = formData.get("status") as string || "Published"
    const imageFile = formData.get("image") as File | null

    let imageData = null
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      imageData = await uploadToCloudinary(buffer, imageFile.name, "blogs")
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      status,
      image: imageData
    })

    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (error: any) {
    console.error("Blog creation error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
