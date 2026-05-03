"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, Share2, Tag, Loader2, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PageHero } from "@/components/PageHero"
import { Button } from "@/components/ui/button"

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/slug/${slug}`)
        const json = await res.json()
        if (json.success) {
          setBlog(json.data)
        } else {
          setError(json.error || "Article not found")
        }
      } catch (err) {
        setError("Failed to load article")
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-[#a02222]" />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <AlertCircle className="w-16 h-16 text-[#a02222] mb-6" />
        <h1 className="text-2xl font-bold mb-4 uppercase italic">Error Loading Article</h1>
        <p className="text-gray-500 mb-8">{error}</p>
        <Link href="/blogs">
          <Button className="bg-[#a02222] hover:bg-black text-white rounded-none px-8 h-14 font-black uppercase tracking-widest">
            Back to Insights
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white pb-24">
      <PageHero 
        title={blog.title}
        subtitle={`${blog.category} | Published by ${blog.author}`}
        backgroundImage={blog.image?.url || "/steel-beams-construction-metal-stack.jpg"}
      />

      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Article Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 shadow-2xl border-t-4 border-[#a02222]"
          >
            <div className="flex flex-wrap items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              <Link href="/blogs" className="flex items-center gap-2 text-[#a02222] hover:text-black transition-colors">
                <ArrowLeft className="w-3 h-3" /> Back to Articles
              </Link>
              <span className="w-1 h-1 bg-gray-200 rounded-full" />
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <span className="w-1 h-1 bg-gray-200 rounded-full" />
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> {blog.author}
              </div>
              <span className="w-1 h-1 bg-gray-200 rounded-full" />
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-[#a02222]">
                <Tag className="w-3 h-3" /> {blog.category}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-8 leading-[1.1] tracking-tighter uppercase italic">
              {blog.title}
            </h1>

            <p className="text-xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-gray-100 pl-8 mb-12">
              {blog.excerpt}
            </p>

            {/* Main Image */}
            {blog.image?.url && (
              <div className="relative h-[300px] md:h-[500px] w-full mb-12 overflow-hidden bg-gray-50">
                <Image 
                  src={blog.image.url} 
                  alt={blog.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
            )}

            {/* Content Area */}
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight prose-a:text-[#a02222] prose-strong:text-black">
              {/* Note: In a real app, use a markdown renderer like react-markdown here */}
              <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} className="text-gray-700 leading-[1.8] space-y-6" />
            </div>

            {/* Footer Actions */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share This Insight</span>
                <div className="flex gap-2">
                  {[Share2, Share2, Share2].map((Icon, idx) => (
                    <button key={idx} className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#a02222] hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              <Link href="/contact">
                <Button className="bg-[#1a1a1a] hover:bg-[#a02222] text-white rounded-none h-14 px-10 font-black uppercase tracking-widest text-[11px] transition-all">
                  Discuss This With Our Team
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Related Articles Hook */}
          <div className="mt-20 text-center">
            <span className="text-[#a02222] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Knowledge Continues</span>
            <h2 className="text-3xl font-black uppercase italic mb-12">More Industrial Insights</h2>
            <Link href="/blogs">
              <Button variant="outline" className="rounded-none border-gray-200 h-14 px-10 font-black uppercase tracking-widest text-[11px] hover:bg-gray-50">
                Explore All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
