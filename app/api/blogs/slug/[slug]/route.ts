import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Blog from "@/lib/models/Blog"

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect()
  try {
    const blog = await Blog.findOne({ slug: params.slug })
    if (!blog) return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 })
    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 })
  }
}
