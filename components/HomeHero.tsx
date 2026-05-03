"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function HomeHero({ banners }: { banners: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [banners.length])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  if (banners.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/industrial-steel-factory-beams-dark-cinematic.jpg"
            alt="Fallback Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6 text-center">
           <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">SRK STEEL</h1>
           <p className="text-xl text-gray-300 mt-4 uppercase tracking-[0.3em]">Industrial Excellence Since 1998</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[currentSlide]?._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={banners[currentSlide]?.image?.url || "/industrial-steel-factory-beams-dark-cinematic.jpg"}
            alt={banners[currentSlide]?.title}
            fill
            className="object-cover transition-transform duration-[10000ms] scale-110"
            priority
          />
          
          <div className="absolute inset-0 bg-black/40" />

          <div className="container relative z-10 px-4 md:px-6 h-full flex items-center">
            <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl">
              <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                <span className="h-[1px] w-12 bg-[#a02222] inline-block" />
                <span className="text-[#a02222] font-black tracking-widest uppercase text-sm">{banners[currentSlide]?.subtitle}</span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-8 uppercase italic tracking-tighter"
              >
                {banners[currentSlide]?.title.split('<br />').map((text: string, i: number) => (
                  <span key={i}>
                    {text}
                    <br />
                  </span>
                ))}
              </motion.h1>

              {banners[currentSlide]?.description && (
                <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed italic opacity-90 font-medium">
                  {banners[currentSlide]?.description}
                </motion.p>
              )}

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href={banners[currentSlide]?.ctaLink || "/products"}>
                  <Button size="lg" className="bg-[#a02222] hover:bg-white hover:text-[#a02222] text-white rounded-none h-14 px-10 text-lg group w-full sm:w-auto font-black transition-all shadow-2xl shadow-black/20 border-none">
                    {banners[currentSlide]?.ctaText}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-10 right-10 z-20 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1 transition-all duration-500 ${currentSlide === i ? "bg-[#a02222] w-20" : "bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
