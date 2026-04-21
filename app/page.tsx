"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, ChevronDown, Search, ChevronRight, Loader2, ShieldCheck, TrendingUp, Box, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

type Product = {
  _id: string; slug: string; title: string; image?: { url: string }; mainCategory?: string 
}

type Category = {
  _id: string; name: string; slug: string; image?: { url: string }
}

const FALLBACK_IMAGE = "/industrial-steel-factory-beams-dark-cinematic.jpg"

export default function Home() {
  const [banners, setBanners] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [catalogueProducts, setCatalogueProducts] = useState<Product[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [catalogueLoading, setCatalogueLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const [bannerRes, catRes, prodRes] = await Promise.all([
        fetch("/api/banners"),
        fetch("/api/categories"),
        fetch("/api/products")
      ])
      
      const bannerData = await bannerRes.json()
      const catData = await catRes.json()
      const prodData = await prodRes.json()

      if (bannerData.success) setBanners(bannerData.data)
      if (catData.success) setCategories(catData.data)
      if (prodData.success) {
        // Just take first 8 for home page
        setCatalogueProducts(prodData.data.slice(0, 8))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setCategoriesLoading(false)
      setCatalogueLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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

  return (
    <div className="overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          {banners.length > 0 ? (
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
              
              <div className="container relative z-10 px-4 md:px-6 h-full flex items-center">
                <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-4xl">
                  <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                    <span className="h-[1px] w-12 bg-primary inline-block" />
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">{banners[currentSlide]?.subtitle}</span>
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
                    <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed italic opacity-80">
                      {banners[currentSlide]?.description}
                    </motion.p>
                  )}

                  <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                    <Link href={banners[currentSlide]?.ctaLink || "/products"}>
                      <Button size="lg" className="bg-primary hover:bg-neutral-900 text-white rounded-none h-14 px-8 text-lg group w-full sm:w-auto">
                        {banners[currentSlide]?.ctaText}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="absolute inset-0 z-0">
               <Image
                 src="/industrial-steel-factory-beams-dark-cinematic.jpg"
                 alt="Fallback Hero"
                 fill
                 className="object-cover"
                 priority
               />
            </div>
          )}
        </AnimatePresence>

        {/* Slide Indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-10 right-10 z-20 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-12 h-1 transition-all duration-500 ${currentSlide === i ? "bg-primary w-20" : "bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gray-700 overflow-hidden">
            <div className="w-full h-1/2 bg-primary animate-movedown" />
          </div>
        </motion.div>
      </section>

      {/* Products Showcase (Catalogue) — Moved Up */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16 gap-4"
          >
            <div className="max-w-3xl">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Catalogue</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0c2340] tracking-tight uppercase">Engineered for Strength</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto italic mt-4">
                Explore our elite selection of industrial steel components designed for high-performance engineering.
              </p>
            </div>
            <Link href="/products" className="mt-8">
              <Button variant="outline" className="border-primary text-primary font-bold tracking-widest uppercase text-xs h-12 px-8 rounded-none group hover:bg-primary hover:text-white transition-all">
                View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {catalogueLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : catalogueProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 italic mb-4">No products in catalogue yet.</p>
              <Link href="/dashboard/products">
                <Button className="bg-primary text-white rounded-none">Add Products →</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {catalogueProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/package/${product.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden bg-gray-200 border border-gray-100 shadow-sm"
                  >
                    <Image
                      src={product.image?.url || FALLBACK_IMAGE}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Bottom-heavy Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c2340]/90 via-[#0c2340]/40 to-transparent z-10" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                      <span className="text-primary font-bold tracking-[0.2em] uppercase text-[9px] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity">
                        {product.mainCategory || "PREMIUM STEEL"}
                      </span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center text-gray-400 font-bold uppercase text-[9px] tracking-widest gap-2">
                        <span>Experience Quality</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-primary" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section (Divisions) — Infinite Glide Slider */}
      <section id="categories" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16 gap-4"
          >
            <div className="max-w-3xl">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Categories</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0c2340] tracking-tight uppercase">
                Explore Our Range
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto italic mt-4">
                Browse our specialized industrial categories for precision-engineered components.
              </p>
            </div>
            <Link href="/categories" className="mt-8">
              <Button variant="outline" className="border-primary text-primary font-bold tracking-widest uppercase text-xs h-12 px-8 rounded-none group hover:bg-primary hover:text-white transition-all">
                View All Categories <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {categoriesLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="relative group/slider">
            {/* Infinite Horizontal Slider - Optimized for Smoothness */}
            <motion.div 
              className="flex gap-4 md:gap-6 px-4"
              animate={{
                x: [0, -2500], // Increased distance for a longer, smoother loop
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60, // Slower for premium feel
                  ease: "linear",
                },
              }}
              style={{ width: "fit-content" }}
            >
              {/* Multiply the list to ensure zero-gap looping on large screens */}
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
                    {/* Bottom-heavy Gradient Overlay */}
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
        )}
      </section>

      {/* Feature / About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-100 rounded-full z-0" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full z-0" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden"
              >
                <Image
                  src="/steel-worker-welding-industrial-factory.jpg"
                  alt="Industrial worker"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute -bottom-8 -left-8 bg-gray-900 text-white p-8 max-w-xs z-20 shadow-xl hidden md:block">
                <p className="font-serif italic text-lg text-gray-100">
                  "We don't just sell steel; we provide the backbone for tomorrow's infrastructure."
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Why Industry Leaders Choose <span className="text-primary">SRK Steel</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed italic border-l-2 border-primary/20 pl-6">
                  With over two decades of experience, SRK Steel has established itself as a premier supplier of
                  high-grade steel products. We combine traditional metallurgical expertise with modern manufacturing
                  processes.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: ShieldCheck, title: "Certified Quality", desc: "ISO 9001:2015 certified products guaranteed to meet international standards." },
                  { icon: TrendingUp, title: "Supply Efficiency", desc: "Just-in-time delivery network ensuring your projects never face delays." },
                  { icon: Box, title: "Diverse Inventory", desc: "From TMT bars to structural steel, we maintain stock for immediate dispatch." },
                  { icon: CheckCircle2, title: "Expert Support", desc: "Technical consultation available for complex structural requirements." },
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col gap-3 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 uppercase tracking-tighter">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Stats & About Section */}
      <section className="py-24 bg-gray-50 overflow-hidden border-y border-gray-100">
        <div className="container px-4 md:px-8 lg:px-16 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Leading industrial <span className="text-primary">suppliers, Since 1998</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-600 leading-relaxed max-w-xl italic border-l-2 border-primary/20 pl-8">
                <p>
                  Established in 1998, SRK Steel started as a specialized trading business dealing in a range of higher-grade structural components such as TMT bars, structural beams, and precision MS pipes.
                </p>
                <p>
                  As the infrastructure landscape across international and global markets evolved, SRK Steel progressed and diversified into specialized engineering and marine quality products pertaining to various sectors such as the construction, oil and petro-chemical industry, and shipbuilding.
                </p>
                <p>
                  Our legacy of over 25 years has allowed SRK Steel to become one of the leading stockists and traders of engineering materials, dealing in a variety of more than 5k items coming from reputed manufacturers located across leading global manufacturing hubs.
                </p>
              </div>
            </motion.div>

            {/* Right Stats Grid Column */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Years Industry Experience", value: "25+", color: "bg-primary" },
                { label: "Specialized Products", value: "250+", color: "bg-[#1a1a1a]" },
                { label: "Projects Completed", value: "10k+", color: "bg-[#1a1a1a]" },
                { label: "Happy Customers", value: "500+", color: "bg-primary" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`${stat.color} p-8 md:p-10 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-2xl shadow-gray-200/50 hover:scale-105 transition-transform cursor-default group`}
                >
                  <span className="text-white text-5xl md:text-6xl font-black mb-4 tracking-tighter transition-transform group-hover:scale-110 duration-500">
                    {stat.value}
                  </span>
                  <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-tight max-w-[120px]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
