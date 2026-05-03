"use client"

import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Mail, Phone, ShieldCheck, Loader2, AlertCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

type Product = {
  _id: string
  slug: string
  title: string
  mainCategory: string
  subCategory: string
  specs: string
  description: string
  features: string[]
  technicalSpecs: Array<{ label: string; value: string }>
  price: string
  status: string
  image?: { url: string }
}

const FALLBACK_IMAGE = "/steel-beams-construction-metal-stack.jpg"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const fetchProduct = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/products/${slug}`)
      const json = await res.json()
      if (json.success) {
        setProduct(json.data)
        setActiveImage(json.data.image?.url || FALLBACK_IMAGE)
        
        // Fetch related products
        if (json.data.mainCategory) {
          const relRes = await fetch(`/api/products?category=${encodeURIComponent(json.data.mainCategory)}`)
          const relJson = await relRes.json()
          if (relJson.success) {
            const filtered = relJson.data.filter((p: Product) => p.slug !== slug)
            setRelatedProducts(filtered.slice(0, 4))
          }
        }
      } else {
        setError(json.error || "Product not found")
      }
    } catch (err) {
      console.error("Failed to fetch product:", err)
      setError("An unexpected error occurred while loading product details.")
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    if (slug) fetchProduct()
  }, [slug, fetchProduct])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#a02222]" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Retrieving Technical Data...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 px-4 text-center">
        <div className="w-16 h-16 bg-red-50 flex items-center justify-center rounded-full">
          <AlertCircle className="w-8 h-8 text-[#a02222]" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tight">System Error</h2>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">{error || "The requested component could not be located in our inventory."}</p>
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
    <div>
      <main className="flex-grow pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/products" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#a02222] mb-12 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Catalogue
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images - Sticky Column with Sidebar Thumbnails */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-32 h-fit flex gap-4"
            >
              {/* Vertical Thumbnail Strip */}
              <div className="hidden md:flex flex-col gap-3 w-20 shrink-0 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                {/* Main Image Thumbnail */}
                <div 
                  onClick={() => setActiveImage(product.image?.url || FALLBACK_IMAGE)}
                  className={`relative aspect-square bg-gray-50 border cursor-pointer overflow-hidden transition-all shrink-0 ${
                    activeImage === product.image?.url || (!activeImage && !product.gallery?.length) ? "border-[#a02222] ring-2 ring-[#a02222]/10" : "border-gray-100 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={product.image?.url || FALLBACK_IMAGE} alt="Main Thumb" fill className="object-cover" />
                </div>
                
                {/* Gallery Thumbnails */}
                {product.gallery?.map((img: any, idx: number) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(img.url)}
                    className={`relative aspect-square bg-gray-50 border cursor-pointer overflow-hidden transition-all shrink-0 ${
                      activeImage === img.url ? "border-[#a02222] ring-2 ring-[#a02222]/10" : "border-gray-100 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt={`Gallery ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Main Preview Image */}
              <div className="flex-1 space-y-4">
                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden border border-gray-100 shadow-sm group">
                  <Image
                    src={activeImage || product.image?.url || FALLBACK_IMAGE}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                {/* Mobile Thumbnails (Horizontal) */}
                <div className="flex md:hidden gap-3 overflow-x-auto pb-2">
                  <div 
                    onClick={() => setActiveImage(product.image?.url || FALLBACK_IMAGE)}
                    className="relative w-16 h-16 bg-gray-50 border shrink-0 overflow-hidden"
                  >
                    <Image src={product.image?.url || FALLBACK_IMAGE} alt="Main" fill className="object-cover" />
                  </div>
                  {product.gallery?.map((img: any, idx: number) => (
                    <div 
                      key={idx}
                      onClick={() => setActiveImage(img.url)}
                      className="relative w-16 h-16 bg-gray-50 border shrink-0 overflow-hidden"
                    >
                      <Image src={img.url} alt={`Gallery ${idx}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="mb-10">
                <span className="text-[#a02222] font-black tracking-[0.25em] uppercase text-[11px] mb-4 block">
                  {product.mainCategory}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-8 leading-tight tracking-tight uppercase">{product.title}</h1>
                <p className="text-base text-gray-500 leading-relaxed mb-10 max-w-xl font-medium border-l-2 border-gray-100 pl-6">
                  {product.description || "Premium industrial grade component manufactured to exacting standards for high-performance structural applications."}
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                   <Link href={`/contact?product=${product.title}`}>
                     <Button className="rounded-none h-11 px-10 bg-[#1a1a1a] hover:bg-[#a02222] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-black/10">
                        ENQUIRE NOW
                     </Button>
                   </Link>
                </div>
              </div>

              <div className="mb-16">
                <div className="space-y-6">
                  <h3 className="font-black text-[#1a1a1a] uppercase tracking-widest text-xs border-b border-gray-100 pb-4">Technical Specifications</h3>
                  <ul className="space-y-4">
                    {(product.specs ? product.specs.split('|').map(s => s.trim()) : ["Industrial Grade Quality", "Standard Compliance"]).map((spec, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-gray-600 font-bold uppercase tracking-tight leading-relaxed italic">
                        <CheckCircle2 className="w-5 h-5 text-[#a02222] flex-shrink-0 mt-0.5" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="tel:+919152341656" className="flex items-center gap-4 p-5 bg-white border border-gray-100 hover:border-[#a02222] transition-all">
                    <Phone className="w-5 h-5 text-[#a02222]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">+91 91523 41656</span>
                  </Link>
                  <Link href="mailto:sales@srksteel.com" className="flex items-center gap-4 p-5 bg-white border border-gray-100 hover:border-[#a02222] transition-all">
                    <Mail className="w-5 h-5 text-[#a02222]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">sales@srksteel.com</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-32 pt-16 border-t border-gray-100">
              <div className="mb-12">
                <span className="text-[#a02222] font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">System Continuity</span>
                <h2 className="text-3xl font-black text-[#1a1a1a] uppercase tracking-tight italic">Related Components</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <Link key={p._id} href={`/package/${p.slug}`} className="group block">
                    <div className="relative aspect-square bg-gray-50 mb-6 overflow-hidden border border-gray-100">
                      <Image 
                        src={p.image?.url || FALLBACK_IMAGE} 
                        alt={p.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </div>
                    <span className="text-[#a02222] font-black tracking-[0.2em] uppercase text-[9px] mb-2 block">
                      {p.mainCategory}
                    </span>
                    <h3 className="text-sm font-black text-[#1a1a1a] uppercase mb-3 group-hover:text-[#a02222] transition-colors leading-tight">
                      {p.title}
                    </h3>
                    <div className="flex items-center text-[9px] font-black text-gray-600 uppercase tracking-[0.25em] gap-2 transition-all group-hover:translate-x-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 text-[#a02222]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
