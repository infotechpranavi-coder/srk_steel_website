"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search, Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export function ProductsClient({ initialProducts, initialCategories, initialSearch }: { initialProducts: Product[], initialCategories: string[], initialSearch?: string }) {
  const [products] = useState<Product[]>(initialProducts)
  const [categories] = useState<string[]>(initialCategories)
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState(initialSearch || "")
  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === "All" || p.mainCategory === activeCategory
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.mainCategory.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div>
      {/* Main Catalogue Layout */}
      <section className="py-8 bg-gray-50 flex-grow pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-6">
            
            {/* Top Row: Title & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-200 pb-6">
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] tracking-tight uppercase leading-none">
                  {activeCategory === "All" ? "Full Catalogue" : activeCategory}
                </h2>
                <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] mt-2">
                  Showing {filteredProducts.length} high-performance items
                </p>
              </div>

              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-12 h-12 rounded-none border-gray-200 focus-visible:ring-primary text-sm shadow-sm bg-white"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Pills Row - Compact */}
            <div className="flex flex-wrap items-center gap-2 pb-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mr-2">Filter By:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeCategory === cat
                      ? "bg-[#a02222] text-white border-[#a02222]"
                      : "bg-white text-gray-400 border-gray-100 hover:border-[#a02222]/30 hover:text-[#a02222]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full mt-12">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center bg-white border border-gray-100">
                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border border-dashed border-gray-300">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a]">No items available</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  {products.length === 0
                    ? "The catalogue is currently empty. Please check back later."
                    : "We couldn't find any products matching your specific filters."}
                </p>
                <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All") }} className="text-[#a02222] font-bold">Clear all filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group cursor-pointer bg-white border border-gray-100 flex flex-col overflow-hidden"
                  >
                    <Link href={`/package/${product.slug}`} className="flex flex-col h-full">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <Image
                          src={product.image?.url || FALLBACK_IMAGE}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-6 pb-8 flex flex-col flex-grow bg-white text-center">
                        <span className="text-[#a02222] font-black tracking-[0.2em] uppercase text-[10px] mb-3 block">
                          {product.mainCategory}
                        </span>
                        <h3 className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#a02222] transition-colors leading-tight lowercase">
                          {product.title}
                        </h3>
                        <div className="mt-4 flex items-center justify-center text-[10px] font-black text-gray-600 uppercase tracking-[0.25em] gap-2 transition-all group-hover:translate-x-1">
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3 text-[#a02222]" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
