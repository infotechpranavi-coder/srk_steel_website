import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { Category } from "@/lib/models/Category"
import { Banner } from "@/lib/models/Banner"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const [productCount, categoryCount, bannerCount, lowStockCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Banner.countDocuments(),
      Product.countDocuments({ status: "Low Stock" })
    ])

    // Get product distribution by category
    const categories = await Category.find().lean()
    const inventoryStatus = await Promise.all(
      categories.slice(0, 4).map(async (cat) => {
        const count = await Product.countDocuments({ mainCategory: cat.name })
        return {
          name: cat.name,
          count,
          percentage: productCount > 0 ? Math.round((count / productCount) * 100) : 0
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        totalProducts: productCount,
        totalCategories: categoryCount,
        totalBanners: bannerCount,
        lowStockProducts: lowStockCount,
        inventoryStatus
      }
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
