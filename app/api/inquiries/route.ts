import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Inquiry } from "@/lib/models/Inquiry"

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: inquiries })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    
    const { name, email, phone, subject, message } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject: subject || "No Subject",
      message,
    })

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
