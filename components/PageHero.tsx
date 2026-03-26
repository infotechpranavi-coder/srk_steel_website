"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle: string
  backgroundImage: string
  stats?: Array<{ label: string }>
}

export function PageHero({ title, subtitle, backgroundImage, stats }: PageHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black text-center pt-40 pb-20">
      {/* Background with Darker Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={backgroundImage} 
          alt={title} 
          fill 
          className="object-cover opacity-60 scale-105" 
          priority 
        />
        {/* Top & Bottom Cinematic Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        {/* Soft bottom glow to transition to next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title - Heavy & Cinematic */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl">
            {title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium mb-12 drop-shadow-lg">
            {subtitle}
          </p>

          {/* Stats / Features Row - Matching the Reference Image */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 pt-4 border-t border-white/10 max-w-4xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rotate-45" />
                  <span className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-[0.3em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
