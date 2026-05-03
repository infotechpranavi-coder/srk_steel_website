"use client"

import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Mail, Phone, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const FALLBACK_IMAGE = "/steel-beams-construction-metal-stack.jpg"

export function ProductDetailClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const [activeImage, setActiveImage] = useState<string | null>(product.image?.url || FALLBACK_IMAGE)

  return (
    <main className="flex-grow pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/products" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#a02222] mb-12 transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images - Sticky Column with Sidebar Thumbnails */}
          <div className="lg:sticky lg:top-32 h-fit flex gap-4">
            {/* Vertical Thumbnail Strip */}
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
              <div 
                onClick={() => setActiveImage(product.image?.url || FALLBACK_IMAGE)}
                className={`relative aspect-square bg-gray-50 border cursor-pointer overflow-hidden transition-all shrink-0 ${
                  activeImage === product.image?.url || !activeImage ? "border-[#a02222] ring-2 ring-[#a02222]/10" : "border-gray-100 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={product.image?.url || FALLBACK_IMAGE} alt="Main Thumb" fill className="object-cover" />
              </div>
              
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
              {/* Mobile Thumbnails */}
              <div className="flex md:hidden gap-3 overflow-x-auto pb-2">
                <div onClick={() => setActiveImage(product.image?.url || FALLBACK_IMAGE)} className="relative w-16 h-16 bg-gray-50 border shrink-0 overflow-hidden">
                  <Image src={product.image?.url || FALLBACK_IMAGE} alt="Main" fill className="object-cover" />
                </div>
                {product.gallery?.map((img: any, idx: number) => (
                  <div key={idx} onClick={() => setActiveImage(img.url)} className="relative w-16 h-16 bg-gray-50 border shrink-0 overflow-hidden">
                    <Image src={img.url} alt={`Gallery ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-10">
              <span className="text-[#a02222] font-black tracking-[0.25em] uppercase text-[11px] mb-4 block">
                {product.mainCategory}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-8 leading-tight tracking-tight uppercase italic">{product.title}</h1>
              <p className="text-base text-gray-500 leading-relaxed mb-10 max-w-xl font-medium border-l-2 border-gray-100 pl-6 italic">
                {product.description || "Premium industrial grade component manufactured to exacting standards for high-performance structural applications."}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                 <Link href={`/contact?product=${product.title}`}>
                   <Button className="rounded-none h-11 px-10 bg-[#1a1a1a] hover:bg-[#a02222] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl border-none">
                      ENQUIRE NOW
                   </Button>
                 </Link>
              </div>
            </div>

            <div className="mb-16">
              <div className="space-y-6">
                <h3 className="font-black text-[#1a1a1a] uppercase tracking-widest text-[10px] border-b border-gray-100 pb-4">Technical Specifications</h3>
                <ul className="space-y-4">
                  {(product.specs ? product.specs.split('|').map((s: string) => s.trim()) : ["Industrial Grade Quality"]).map((spec: string, i: number) => (
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
                <Link href="tel:+919152341656" className="flex items-center gap-4 p-5 bg-white border border-gray-100 hover:border-[#a02222] transition-all group">
                  <Phone className="w-5 h-5 text-[#a02222] group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">+91 91523 41656</span>
                </Link>
                <Link href="mailto:sales@srksteel.com" className="flex items-center gap-4 p-5 bg-white border border-gray-100 hover:border-[#a02222] transition-all group">
                  <Mail className="w-5 h-5 text-[#a02222] group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">sales@srksteel.com</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
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
  )
}
