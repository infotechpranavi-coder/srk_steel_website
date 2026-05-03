"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const FALLBACK_IMAGE = "/industrial-steel-factory-beams-dark-cinematic.jpg"

export function CategorySlider({ categories }: { categories: any[] }) {
  if (categories.length === 0) return null

  return (
    <div className="relative group/slider">
      <motion.div 
        className="flex gap-4 md:gap-6 px-4"
        animate={{
          x: [0, -2500],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {[...categories, ...categories, ...categories, ...categories, ...categories].map((cat, idx) => (
          <div
            key={`${cat._id}-${idx}`}
            className="w-[280px] md:w-[320px] flex-shrink-0"
          >
            <Link 
              href="/categories" 
              className="group relative block aspect-[4/5] overflow-hidden bg-gray-200 border border-gray-100 shadow-sm"
            >
              <Image 
                src={cat.image?.url || FALLBACK_IMAGE} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c2340]/90 via-[#0c2340]/40 to-transparent z-10" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center text-gray-400 font-bold uppercase text-[9px] tracking-widest gap-2">
                  <span>Explore Division</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-primary" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
