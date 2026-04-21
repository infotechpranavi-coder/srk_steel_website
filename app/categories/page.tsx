"use client"

import { motion } from "framer-motion"
import { ArrowRight, Box, Layers, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { PageHero } from "@/components/PageHero"

type Category = {
  _id: string
  name: string
  slug: string
  description?: string
  image?: { url: string; publicId: string }
  subcategories: Array<{ name: string; slug: string }>
}

const FALLBACK_IMAGE = "/industrial-steel-factory-beams-dark-cinematic.jpg"

export default function CategoriesIndexPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories", { cache: "no-store" })
      const json = await res.json()
      if (json.success) setCategories(json.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  return (
    <div>
      {/* Categories Grid */}
      <section className="py-24 bg-gray-50 flex-grow pt-32">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-gray-500 font-medium">Loading divisions...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20">
              <Box className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Categories Yet</h2>
              <p className="text-gray-500">Categories will appear here once added from the dashboard.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/categories/${cat.slug}`} className="block group bg-white border border-gray-100 hover:shadow-2xl transition-all h-full">
                    <div className="relative h-64 overflow-hidden bg-gray-200">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10" />
                      <Image 
                        src={cat.image?.url || FALLBACK_IMAGE}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-gray-900 flex items-center gap-2">
                        <Layers className="w-3 h-3 text-primary" /> {cat.subcategories.length} Sub-categories
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{cat.name}</h3>
                      <p className="text-gray-600 line-clamp-2 mb-6 text-sm leading-relaxed">
                        {cat.description || `Explore our high-quality range of ${cat.name.toLowerCase()} products designed for industrial applications.`}
                      </p>
                      
                      {cat.subcategories.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {cat.subcategories.slice(0, 3).map((sub) => (
                            <span key={sub.slug} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600">
                              {sub.name}
                            </span>
                          ))}
                          {cat.subcategories.length > 3 && (
                            <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600">
                              +{cat.subcategories.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                        Explore Category <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
