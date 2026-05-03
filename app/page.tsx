import Link from "next/link"
import { ArrowRight, ShieldCheck, TrendingUp, Box, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import connectDB from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { Category } from "@/lib/models/Category"
import { Banner } from "@/lib/models/Banner"
import { HomeHero } from "@/components/HomeHero"
import { CategorySlider } from "@/components/CategorySlider"
import * as motion from "framer-motion/client"

const FALLBACK_IMAGE = "/industrial-steel-factory-beams-dark-cinematic.jpg"

async function getHomeData() {
  await connectDB()
  
  const [banners, categories, products] = await Promise.all([
    Banner.find({ isActive: true }).sort({ order: 1 }).lean(),
    Category.find({}).sort({ name: 1 }).lean(),
    Product.find({}).sort({ createdAt: -1 }).limit(8).lean()
  ])

  return {
    banners: JSON.parse(JSON.stringify(banners)),
    categories: JSON.parse(JSON.stringify(categories)),
    products: JSON.parse(JSON.stringify(products))
  }
}

export default async function Home() {
  const data = await getHomeData()

  return (
    <div className="overflow-x-hidden">
      <HomeHero banners={data.banners} />

      {/* Products Showcase */}
      <section id="products" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <div className="max-w-3xl">
              <span className="text-[#a02222] font-bold tracking-widest uppercase text-sm mb-2 block">Our Catalogue</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0c2340] tracking-tight uppercase">Engineered for Strength</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto italic mt-4 font-medium">
                Explore our elite selection of industrial steel components designed for high-performance engineering.
              </p>
            </div>
            <Link href="/products" className="mt-8">
              <Button variant="outline" className="border-[#a02222] text-[#a02222] font-black tracking-widest uppercase text-xs h-12 px-8 rounded-none group hover:bg-[#a02222] hover:text-white transition-all shadow-xl">
                View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {data.products.map((product: any) => (
              <div key={product._id}>
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
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0c2340]/90 via-[#0c2340]/40 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <span className="text-[#a02222] font-bold tracking-[0.2em] uppercase text-[9px] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.mainCategory || "PREMIUM STEEL"}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center text-gray-400 font-bold uppercase text-[9px] tracking-widest gap-2">
                      <span>Experience Quality</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[#a02222]" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <section id="categories" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <div className="max-w-3xl">
              <span className="text-[#a02222] font-bold tracking-widest uppercase text-sm mb-2 block">Our Categories</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0c2340] tracking-tight uppercase">
                Explore Our Range
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto italic mt-4 font-medium">
                Browse our specialized industrial categories for precision-engineered components.
              </p>
            </div>
          </div>
        </div>
        <CategorySlider categories={data.categories} />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] bg-gray-200 overflow-hidden relative">
                <Image
                  src="/steel-worker-welding-industrial-factory.jpg"
                  alt="Industrial worker"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-gray-900 text-white p-8 max-w-xs z-20 shadow-xl hidden md:block">
                <p className="font-serif italic text-lg text-gray-100 font-medium">
                  "We don't just sell steel; we provide the backbone for tomorrow's infrastructure."
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tighter italic">
                  Why Leaders Choose <span className="text-[#a02222]">SRK Steel</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed italic border-l-2 border-[#a02222]/20 pl-6 font-medium">
                  With over two decades of experience, SRK Steel has established itself as a premier supplier of
                  high-grade steel products. We combine traditional metallurgical expertise with modern manufacturing
                  processes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: ShieldCheck, title: "Certified Quality", desc: "ISO 9001:2015 certified products guaranteed to meet international standards." },
                  { icon: TrendingUp, title: "Supply Efficiency", desc: "Just-in-time delivery network ensuring your projects never face delays." },
                  { icon: Box, title: "Diverse Inventory", desc: "From TMT bars to structural steel, we maintain stock for immediate dispatch." },
                  { icon: CheckCircle2, title: "Expert Support", desc: "Technical consultation available for complex structural requirements." },
                ].map((feature, idx) => (
                  <div key={idx} className="flex flex-col gap-3 group">
                    <div className="w-12 h-12 bg-[#a02222]/10 text-[#a02222] flex items-center justify-center transition-colors group-hover:bg-[#a02222] group-hover:text-white">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-xl text-gray-900 uppercase tracking-tighter">{feature.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50 overflow-hidden border-y border-gray-100">
        <div className="container px-4 md:px-8 lg:px-16 mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight uppercase tracking-tighter italic">
                Leading suppliers, <span className="text-[#a02222]">Since 1998</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed max-w-xl italic border-l-2 border-[#a02222]/20 pl-8 font-medium">
                <p>Established in 1998, SRK Steel started as a specialized trading business dealing in a range of higher-grade structural components.</p>
                <p>Our legacy of over 25 years has allowed SRK Steel to become one of the leading stockists and traders of engineering materials.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { label: "Years Experience", value: "25+", color: "bg-[#a02222]" },
                { label: "Specialized Products", value: "250+", color: "bg-[#1a1a1a]" },
                { label: "Projects Completed", value: "10k+", color: "bg-[#1a1a1a]" },
                { label: "Happy Customers", value: "500+", color: "bg-[#a02222]" }
              ].map((stat, idx) => (
                <div key={idx} className={`${stat.color} p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-2xl hover:scale-105 transition-transform cursor-default group`}>
                  <span className="text-white text-5xl md:text-6xl font-black mb-4 tracking-tighter group-hover:scale-110 duration-500">
                    {stat.value}
                  </span>
                  <span className="text-white/80 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-tight max-w-[120px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
