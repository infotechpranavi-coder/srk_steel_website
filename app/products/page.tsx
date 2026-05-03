import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { Category } from "@/lib/models/Category"
import { ProductsClient } from "@/components/ProductsClient"

// Next.js metadata for SEO
export const metadata = {
  title: "Industrial Steel Catalogue | SRK Steel",
  description: "Browse our comprehensive catalogue of high-performance industrial steel components, including TMT bars, structural steel, and more.",
}

async function getProductsData() {
  await connectDB()
  
  // Fetch products and categories directly from DB for maximum speed
  const [products, categories] = await Promise.all([
    Product.find({}).sort({ createdAt: -1 }).lean(),
    Category.find({}).sort({ name: 1 }).lean()
  ])

  // Convert MongoDB objects to plain objects for the client
  const plainProducts = JSON.parse(JSON.stringify(products))
  const categoryNames = ["All", ...categories.map((c: any) => c.name)]

  return {
    products: plainProducts,
    categories: categoryNames
  }
}

export default async function ProductsPage({ searchParams }: { searchParams: { search?: string } }) {
  const data = await getProductsData()
  const search = searchParams.search

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="w-12 h-12 text-[#a02222] animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Synchronizing Catalogue...</p>
      </div>
    }>
      <ProductsClient 
        initialProducts={data.products} 
        initialCategories={data.categories} 
        initialSearch={search}
      />
    </Suspense>
  )
}
