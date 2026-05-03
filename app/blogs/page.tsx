"use client"

import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search, Tag, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { PageHero } from "@/components/PageHero"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs")
        const json = await res.json()
        if (json.success) setBlogs(json.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div>
      <PageHero 
        title="Industrial Insights"
        subtitle="Exploring the latest advancements in steel technology, engineering standards, and industrial trends."
        backgroundImage="/steel-beams-construction-metal-stack.jpg"
        stats={[{ label: "EXPERT ANALYSIS" }, { label: "TECH GUIDES" }, { label: "MARKET UPDATES" }]}
      />

      {/* Blog Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Column: Featured & List (70%) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-12"
            >
              <div className="border-b border-gray-100 pb-10">
                <h2 className="text-4xl font-black text-[#1a1a1a] uppercase tracking-tight italic mb-6">Latest Articles</h2>
                <p className="text-gray-500 leading-relaxed italic border-l-2 border-[#a02222]/20 pl-6">
                  Deep dives into material science, project management, and global supply chain dynamics.
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-[#a02222]" />
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200">
                  <p className="text-gray-400 italic">No articles found. Check back soon for industrial updates.</p>
                </div>
              ) : (
                <div className="space-y-16">
                  {blogs.map((blog) => (
                    <Link key={blog._id} href={`/blogs/${blog.slug}`} className="group block">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-64 h-48 flex-shrink-0 overflow-hidden bg-gray-50 border border-gray-100">
                          <Image 
                            src={blog.image?.url || "/placeholder.svg"} 
                            alt={blog.title} 
                            width={400} 
                            height={300} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-[10px] font-black text-[#a02222] uppercase tracking-[0.2em]">{blog.category}</span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 group-hover:text-[#a02222] transition-colors leading-tight">
                            {blog.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#a02222] opacity-0 group-hover:opacity-100 transition-all">
                            Read Full Article <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Column: Sidebar (30%) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 space-y-10"
            >
              {/* Search */}
              <div className="p-8 bg-gray-50 border border-gray-100">
                <h4 className="font-black text-[#1a1a1a] uppercase tracking-widest text-xs mb-6">Search Articles</h4>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Keywords..." 
                    className="pl-12 h-14 rounded-none border-gray-200 bg-white focus:border-[#a02222] italic" 
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="p-8 bg-white border border-gray-100 space-y-6">
                <h4 className="font-black text-[#1a1a1a] uppercase tracking-widest text-xs border-b border-gray-100 pb-4">Knowledge Hubs</h4>
                <div className="flex flex-wrap gap-2">
                  {["Technical", "Compliance", "Hardware", "Sustainability", "Logistics", "Market News"].map(cat => (
                    <button key={cat} className="px-4 py-2 bg-gray-50 hover:bg-[#a02222] hover:text-white text-[9px] font-black uppercase tracking-widest transition-all">
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-[#1a1a1a] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a02222]/20 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 bg-[#a02222] flex-shrink-0 animate-pulse" />
                    <span className="text-[#a02222] text-[10px] font-black uppercase tracking-[0.3em]">Direct Dispatch</span>
                  </div>
                  <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase leading-none">Subscribe to Industrial Edge</h3>
                  <p className="mb-10 text-gray-400 text-[11px] leading-relaxed font-medium">
                    Get monthly technical digests and new inventory alerts directly.
                  </p>
                  <form className="space-y-3">
                    <Input 
                      placeholder="ENTER EMAIL ADDRESS" 
                      className="bg-white/5 border-white/10 rounded-none h-12 text-[10px] font-bold uppercase tracking-widest text-white focus:border-[#a02222]" 
                    />
                    <Button className="bg-[#a02222] hover:bg-white hover:text-black text-white rounded-none w-full h-12 text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#a02222]/20">
                      JOIN THE NETWORK
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Promo */}
              <div className="p-10 border border-dashed border-gray-200 text-center">
                <Tag className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                <h4 className="font-bold text-[#1a1a1a] uppercase tracking-tight mb-2">Technical Consultation?</h4>
                <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Speak with our engineers directly</p>
                <Link href="/contact">
                  <Button variant="link" className="text-[#a02222] font-black uppercase tracking-widest text-[10px]">
                    Go to Contact Page <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
