"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search, Loader2 } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/PageHero"

type Product = {
  _id: string
  slug: string
  title: string
  mainCategory: string
  subCategory: string
  specs: string
  description: string
  price: string
  status: string
  image?: { url: string }
}

const FALLBACK_IMAGE = "/steel-beams-construction-metal-stack.jpg"

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<string[]>(["All"])
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products", { cache: "no-store" } as RequestInit)
      const json = await res.json()
      if (json.success && json.data.length > 0) {
        setProducts(json.data)
        // Build unique category list from live data
        const uniqueCats = Array.from(new Set<string>(json.data.map((p: Product) => p.mainCategory))) as string[]
        setCategories(["All", ...uniqueCats])
      }
    } catch (err) {
      console.error("Failed to fetch products:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === "All" || p.mainCategory === activeCategory
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.mainCategory.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div>

      {/* Main Catalogue Layout */}
      <section className="py-24 bg-gray-50 flex-grow pt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Sidebar Filters */}
            <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-8 lg:sticky lg:top-32">
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-[#0c2340] font-bold text-sm uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary inline-block"></span>
                  Filter by Category
                </h3>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setActiveCategory("All")}
                    className={`text-left px-5 py-4 text-xs font-bold uppercase tracking-wider transition-colors border ${
                      activeCategory === "All"
                        ? "bg-[#a02222] text-white border-[#a02222] shadow-sm"
                        : "bg-[#FAFAFA] text-[#333333] border-gray-200 hover:bg-white hover:text-primary hover:border-primary"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.filter(c => c !== "All").map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`text-left px-5 py-4 text-xs font-bold uppercase tracking-wider transition-colors border ${
                        activeCategory === category
                          ? "bg-[#a02222] text-white border-[#a02222] shadow-sm"
                          : "bg-[#FAFAFA] text-[#333333] border-gray-200 hover:bg-white hover:text-primary hover:border-primary"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

              </div>

              {/* Contact Card in Sidebar */}
              <div className="bg-[#0c2340] p-6 text-white text-center">
                <h4 className="font-bold text-lg mb-2">Need Custom Sizing?</h4>
                <p className="text-gray-400 text-xs mb-6">Contact our experts for specialized fabrication services.</p>
                <Link href="/contact" className="inline-block w-full py-3 bg-primary hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-colors">
                  Enquire Now
                </Link>
              </div>
            </div>

            {/* Right Side Catalogue */}
            <div className="flex-grow w-full">
              <div className="mb-8 flex flex-col gap-8 border-b border-gray-200 pb-10">
                <div className="relative max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search our industrial inventory..."
                    className="pl-12 h-14 rounded-none border-gray-200 focus-visible:ring-primary text-sm shadow-sm bg-white"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#0c2340] tracking-tight">{activeCategory === "All" ? "Full Catalogue" : activeCategory}</h2>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Showing {filteredProducts.length} high-performance items</p>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-gray-100">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <p className="text-gray-400 text-sm">Synchronizing catalogue...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-white border border-gray-100">
                  <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border border-dashed border-gray-300">
                    <Search className="w-6 h-6 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0c2340]">No items available</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    {products.length === 0
                      ? "The catalogue is currently empty. Please check back later."
                      : "We couldn't find any products matching your specific filters."}
                  </p>
                  <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All") }} className="text-primary font-bold">Clear all filters</Button>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Group products by Subcategory if category is selected, or by Main Category if "All" is active */}
                  {Object.entries(
                    filteredProducts.reduce((acc, p) => {
                      const groupKey = activeCategory === "All" ? p.mainCategory : (p.subCategory || "General Products")
                      if (!acc[groupKey]) acc[groupKey] = []
                      acc[groupKey].push(p)
                      return acc
                    }, {} as Record<string, Product[]>)
                  ).map(([groupName, groupProducts]) => (
                    <div key={groupName} className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-xl font-black text-[#0c2340] uppercase tracking-tight whitespace-nowrap">
                          {groupName}
                        </h3>
                        <div className="h-[1px] w-full bg-gray-200" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {groupProducts.map((product, index) => (
                          <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="group cursor-pointer bg-white border border-gray-200 hover:shadow-xl transition-all flex flex-col overflow-hidden"
                          >
                            <Link href={`/package/${product.slug}`} className="flex flex-col h-full relative">
                              <div className="relative overflow-hidden bg-gray-100 aspect-square shrink-0 border-b border-gray-100">
                                <Image
                                  src={product.image?.url || FALLBACK_IMAGE}
                                  alt={product.title}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                              </div>

                              <div className="p-5 flex flex-col flex-grow relative bg-white">
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                
                                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[9px] mb-2 block">
                                  {product.mainCategory?.toUpperCase()}
                                </span>
                                <h3 className="text-base font-black text-[#0c2340] group-hover:text-primary transition-colors leading-snug uppercase tracking-tight">
                                  {product.title}
                                </h3>
                                <div className="mt-4 flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest gap-2">
                                  <span>View Details</span>
                                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-primary" />
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Initializing Catalogue...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
