"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Search,
  Phone,
  MessageSquare,
  MessageCircle,
  FileText,
  Mail,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Settings,
  Shield,
  Truck,
  Wrench,
  Container,
  Component,
  Hash,
  Activity,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Category = {
  _id: string;
  name: string;
  slug: string;
  image?: { url: string };
  subcategories?: { name: string; slug: string }[]
}

const CATEGORY_ICONS: Record<string, any> = {
  "TMT Bars": Hash,
  "Structural Steel": Container,
  "Steel Pipes": Activity,
  "Sheets & Plates": LayoutGrid,
  "Wire Rods": Component,
  "Bolts": Settings,
  "Nuts": Settings,
  "Washers": Shield,
  "Screws": Wrench,
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories")
      const json = await res.json()
      if (json.success) setCategories(json.data)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [fetchCategories])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsMenuOpen(false)
    }
  }

  const topLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const contactButtons = [
    { label: "+91 91523 41656", icon: Phone, href: "tel:+919152341656" },
    { label: "WhatsApp", icon: MessageCircle, href: "https://wa.me/919152341656" },
    { label: "Enquiry Form", icon: FileText, href: "/contact" },
    { label: "sales@srksteel.com", icon: Mail, href: "mailto:sales@srksteel.com" },
  ]

  return (
    <motion.header 
      initial={false}
      animate={{ y: scrolled ? -40 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* 1. TOP BAR */}
      <div className="bg-[#a02222] text-white h-[40px] flex items-center overflow-hidden hidden lg:block">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Left: Tagline */}
          <div className="flex items-center gap-2 min-w-[250px]">
            <Shield className="w-3 h-3 text-[#f8d7da]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Celebrating 10+ Years Excellence</span>
          </div>

          {/* Center: Main Contacts */}
          <div className="flex items-center gap-8">
            <Link href="tel:+919152341656" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em]">+91 91523 41656</span>
            </Link>
            <Link href="https://wa.me/919152341656" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <MessageCircle className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-[0.15em]">Direct Message Us</span>
            </Link>
          </div>

          {/* Right: Social Media */}
          <div className="flex items-center gap-5 min-w-[250px] justify-end">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50 mr-2">Follow Us</span>
            <Link href="#" className="hover:text-[#f8d7da] transition-colors"><Facebook className="w-3.5 h-3.5" /></Link>
            <Link href="#" className="hover:text-[#f8d7da] transition-colors"><Instagram className="w-3.5 h-3.5" /></Link>
            <Link href="#" className="hover:text-[#f8d7da] transition-colors"><Linkedin className="w-3.5 h-3.5" /></Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV - Sticky */}
      <div className={`transition-all duration-300 bg-white ${scrolled ? "shadow-2xl border-b border-gray-100" : ""}`}>
        <div className="container mx-auto flex items-center">
          {/* Logo - Left part */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-1 group">
              <div className="relative w-40 h-16 md:w-64 md:h-24 flex-shrink-0">
                <Image 
                  src="/srk_steel logo - Copy.jpeg"
                  alt="SRK Steel"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight -ml-8 md:-ml-12">
                <h1 className="flex items-center font-black tracking-tighter text-xl md:text-2xl">
                  <span className="text-[#1a1a1a]">SRK</span>
                  <span className="text-[#a02222] italic ml-1">STEEL</span>
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Industrial Excellence</p>
              </div>
            </Link>
          </div>
 
          {/* Navigation Tabs - Shifted Right */}
          <nav className="hidden xl:flex items-center gap-8 ml-24 flex-grow">
            {topLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                  pathname === link.href ? "text-[#a02222]" : "text-gray-400 hover:text-[#a02222]"
                }`}>
                  {link.name}
                </span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#a02222]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions - Right part of the flex container */}
          <div className="flex-1 hidden lg:flex items-center gap-4 justify-end">
            {/* Search Bar */}
            <div className="relative group">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-50 px-4 h-12 rounded-sm border border-gray-100 focus-within:border-[#a02222]/30 transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="SEARCH CATALOGUE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[10px] font-bold outline-none italic w-48 uppercase tracking-wider"
                />
              </form>
            </div>

            {/* Get a Quote Button */}
            <Link href="/contact">
              <Button className="bg-[#a02222] hover:bg-[#801b1b] text-white rounded-none px-6 h-12 font-black text-[11px] flex items-center gap-3 uppercase tracking-wider shadow-lg shadow-[#a02222]/20">
                GET A QUOTE <ChevronRight className="w-4 h-4 stroke-[3px]" />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="xl:hidden p-2 text-[#1a1a1a] ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* 3. CATEGORY BAR - All Products & Quick Categories - RED BAR */}
      <div className="hidden lg:block bg-[#a02222] text-white py-2 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center">
          <div className="flex items-center gap-12">
            {categories.slice(0, 6).map((cat) => (
              <div key={cat._id} className="relative group">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-2 text-[11px] font-black text-white hover:bg-white/10 px-3 py-1.5 uppercase tracking-[0.25em] transition-all whitespace-nowrap"
                >
                  {cat.name}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  )}
                </Link>
                
                {/* Submenu */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white border border-gray-100 shadow-2xl p-2 min-w-[200px] rounded-sm">
                      {cat.subcategories.map((sub: any) => (
                        <Link
                          key={sub.name}
                          href={`/categories/${cat.slug}?sub=${sub.slug}`}
                          className="block text-[9px] font-black text-gray-600 hover:text-[#a02222] hover:bg-gray-50 px-4 py-2.5 transition-all uppercase tracking-[0.15em]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[60] flex flex-col md:hidden"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
               <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-1">
                <div className="relative w-32 h-12">
                  <Image 
                    src="/srk_steel logo - Copy.jpeg"
                    alt="SRK Steel"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-none -ml-4">
                  <h1 className="flex items-center font-black tracking-tighter text-lg">
                    <span className="text-[#1a1a1a]">SRK</span>
                    <span className="text-[#a02222] italic ml-1">STEEL</span>
                  </h1>
                </div>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2"><X className="w-8 h-8" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="SEARCH CATALOGUE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 px-6 pr-14 h-16 text-sm font-bold focus:border-primary outline-none italic uppercase rounded-lg"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400">
                  <Search className="w-6 h-6" />
                </button>
              </form>

              {/* Mobile Links */}
              <div className="space-y-4">
                <span className="text-primary font-black tracking-widest uppercase text-[10px]">Navigate Site</span>
                <nav className="flex flex-col gap-4">
                  {topLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tighter"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tighter"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                </nav>
              </div>

              {/* Mobile Contact */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                 <span className="text-primary font-black tracking-widest uppercase text-[10px]">Instant Connection</span>
                 <div className="grid grid-cols-1 gap-3">
                   {contactButtons.map((btn, idx) => (
                     <Link key={idx} href={btn.href} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg group">
                        <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-md">
                          <btn.icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-sm text-[#1a1a1a]">{btn.label}</span>
                     </Link>
                   ))}
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
