"use client"

import { motion } from "framer-motion"
import { ArrowRight, Search, Loader2, ArrowLeft, ChevronRight, LayoutGrid } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/PageHero"

type Product = {
  _id: string; slug: string; title: string; mainCategory: string; subCategory: string; specs: string; description: string; price: string; status: string; stock?: string; image?: { url: string }
}

type Category = {
  _id: string; name: string; slug: string; description?: string; image?: { url: string; publicId: string }; 
  subcategories: Array<{ name: string; slug: string; description?: string; image?: { url: string; publicId: string } }>
}

const FALLBACK_IMAGE = "/steel-beams-construction-metal-stack.jpg"

export default function CategoryClientPage({ slug }: { slug: string }) {
  const [category, setCategory] = useState<Category | null>(null)
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSubcat, setActiveSubcat] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch all categories for sidebar
      const allCatsRes = await fetch("/api/categories")
      const allCatsJson = await allCatsRes.json()
      if (allCatsJson.success) setAllCategories(allCatsJson.data)

      const catRes = await fetch(`/api/categories/slug/${slug}`)
      const catJson = await catRes.json()
      
      if (catJson.success && catJson.data) {
        setCategory(catJson.data)
        const prodRes = await fetch(`/api/products?category=${encodeURIComponent(catJson.data.name)}`)
        const prodJson = await prodRes.json()
        if (prodJson.success) setProducts(prodJson.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black flex-col gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-white/50 font-bold uppercase tracking-widest text-xs">Synchronizing Inventory...</p>
      </div>
    )
  }

  if (!category) return null

  const activeSubcatData = activeSubcat !== "All" ? category.subcategories?.find(s => s.name === activeSubcat) : null
  const displayImage = activeSubcatData?.image?.url || category.image?.url || FALLBACK_IMAGE
  const displayTitle = activeSubcatData?.name || category.name
  const displayDescription = activeSubcatData?.description || category.description || ""

  const filteredProducts = products.filter((p) => {
    const matchSubcat = activeSubcat === "All" || p.subCategory === activeSubcat
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchSubcat && matchSearch
  })

  return (
    <div>
      <main className="flex-grow pt-24 pb-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 min-h-[800px]">
            
            {/* 1. LEFT SIDEBAR: ALL CATEGORIES */}
            <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-[160px] h-fit">
              <div className="bg-black border border-white/10 p-2 shadow-2xl">
                <div className="p-4 border-b border-white/5 mb-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Categories</h4>
                </div>
                <div className="flex flex-col gap-1">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/categories/${cat.slug}`}
                      className={`group flex items-center justify-between px-4 py-4 transition-all duration-300 ${
                        cat.slug === slug 
                          ? "bg-primary text-white" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${cat.slug === slug ? "translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"}`} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Contact Tactical Box */}
              <div className="mt-6 bg-gray-50 border border-gray-100 p-6 flex flex-col gap-4">
                <h5 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Technical Support</h5>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">Need precision specs for a critical project? Connect with our engineers.</p>
                <Link href="/contact" className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group">
                  Initialize Inquiry <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-grow flex flex-col gap-12 pt-4">
              
              {/* CENTER: CATEGORY DETAILS */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-[1px] w-8 bg-primary inline-block" />
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">Category Overview</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <motion.div 
                    key={displayImage} // Force re-animation on image change
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-video md:aspect-[4/3] overflow-hidden bg-black shadow-2xl"
                  >
                    <Image src={displayImage} alt={displayTitle} fill className="object-cover" priority />
                  </motion.div>
                  
                  <div className="space-y-6">
                    {/* Subcategory Filter Pills - Moved Above Title */}
                    {category.subcategories?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        <button
                          onClick={() => setActiveSubcat("All")}
                          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                            activeSubcat === "All" 
                              ? "border-primary text-primary" 
                              : "border-transparent text-gray-400 hover:text-gray-900"
                          }`}
                        >
                          {category.name}
                        </button>
                        {category.subcategories.map(s => (
                          <button
                            key={s.slug}
                            onClick={() => setActiveSubcat(s.name)}
                            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                              activeSubcat === s.name 
                                ? "border-primary text-primary" 
                                : "border-transparent text-gray-400 hover:text-gray-900"
                            }`}
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    )}

                    <h1 className="text-4xl md:text-5xl font-black text-[#0c2340] uppercase tracking-tighter leading-[0.9]">
                      {displayTitle}
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed border-l-2 border-primary/20 pl-6">
                      {displayDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: PRODUCT GRID */}
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                  <h2 className="text-2xl font-black text-[#0c2340] uppercase tracking-tighter">Available Inventory</h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Search Inventory..." 
                      className="pl-9 h-10 rounded-none border-gray-200 focus-visible:ring-primary text-xs italic"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center bg-gray-50 border border-dashed border-gray-200">
                    <p className="text-gray-400 italic">No products matched your parameters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((p, idx) => (
                      <motion.div 
                        key={p._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link 
                          href={`/package/${p.slug}`}
                          className="group block bg-white border border-gray-200 hover:border-primary transition-all overflow-hidden"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                            <Image src={p.image?.url || FALLBACK_IMAGE} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                          <div className="p-6 relative">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                            <h3 className="text-lg font-black text-[#0c2340] uppercase tracking-tighter leading-tight mb-2 group-hover:text-primary transition-colors">
                              {p.title}
                            </h3>
                            <div className="flex items-center justify-between mt-6">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Model: {p.specs || "Standard"}</span>
                              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
