import { Suspense } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { ProductDetailClient } from "@/components/ProductDetailClient"
import { Button } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await connectDB()
  const product = await Product.findOne({ slug: params.slug }).lean()
  if (!product) return { title: "Product Not Found | SRK Steel" }
  
  return {
    title: `${product.title} | Industrial Steel | SRK Steel`,
    description: product.description || `Technical specifications and details for ${product.title}.`,
  }
}

async function getProductData(slug: string) {
  await connectDB()
  const product = await Product.findOne({ slug }).lean()
  if (!product) return null

  const related = await Product.find({ 
    mainCategory: product.mainCategory,
    slug: { $ne: slug } 
  }).limit(4).lean()

  return {
    product: JSON.parse(JSON.stringify(product)),
    related: JSON.parse(JSON.stringify(related))
  }
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const data = await getProductData(params.slug)

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 px-4 text-center">
        <div className="w-16 h-16 bg-red-50 flex items-center justify-center rounded-full">
          <AlertCircle className="w-8 h-8 text-[#a02222]" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tight">Component Not Found</h2>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">The requested component could not be located in our inventory system.</p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="border-gray-200 text-xs font-black uppercase tracking-widest rounded-none h-12 px-8">
            Return to Catalogue
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#a02222]" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Retrieving Technical Data...</p>
      </div>
    }>
      <ProductDetailClient 
        product={data.product} 
        relatedProducts={data.related} 
      />
    </Suspense>
  )
}
