import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Blog from "@/lib/models/Blog"
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const blog = await Blog.findById(params.id)
    if (!blog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 })
    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid Blog ID" }, { status: 400 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const formData = await req.formData()
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const category = formData.get("category") as string
    const author = formData.get("author") as string
    const status = formData.get("status") as string
    const imageFile = formData.get("image") as File | null

    const existingBlog = await Blog.findById(params.id)
    if (!existingBlog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 })

    let imageData = existingBlog.image
    if (imageFile) {
      // Delete old image if it exists
      if (existingBlog.image?.publicId) {
        await deleteFromCloudinary(existingBlog.image.publicId)
      }
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      imageData = await uploadToCloudinary(buffer, imageFile.name, "blogs")
    }

    const updatedBlog = await Blog.findByIdAndUpdate(params.id, {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      status,
      image: imageData
    }, { new: true })

    return NextResponse.json({ success: true, data: updatedBlog })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  try {
    const blog = await Blog.findById(params.id)
    if (!blog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 })

    // Delete image from Cloudinary
    if (blog.image?.publicId) {
      await deleteFromCloudinary(blog.image.publicId)
    }

    await Blog.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true, message: "Blog deleted" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 400 })
  }
}
