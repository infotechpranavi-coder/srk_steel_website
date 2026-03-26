import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"

// GET /api/categories/slug/[slug] — get a specific category by its slug
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB()
    const { slug } = await params
    const category = await Category.findOne({ slug }).lean()
    
    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, data: category })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
