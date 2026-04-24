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
  Activity
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
    { name: "Services", href: "/services" },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-2xl" : ""}`}>
      {/* MAIN NAV - Logo, Search, Page Tabs */}
      <div className="bg-white py-2 px-4 md:px-6 border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative w-40 h-16 md:w-64 md:h-20 transform group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/srk_steel%20logo.jpeg"
                alt="SRK Steel Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Search by product name, grade, standard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 px-6 pr-12 h-14 text-sm font-medium focus:ring-0 focus:border-primary outline-none transition-all rounded-md italic"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Page Tabs - Desktop (Moved from Top Bar) */}
          <nav className="hidden lg:flex items-center gap-4">
            {topLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-xs font-black uppercase tracking-widest transition-colors ${
                  pathname === link.href ? "text-primary" : "text-gray-500 hover:text-primary"
                }`}>
                  {link.name}
                </span>
                {pathname === link.href ? (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <div className="absolute -bottom-1 left-0 w-0 h-1 bg-primary/40 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-[#1a1a1a]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* 3. CATEGORY BAR - All Products & Quick Categories */}
      <div className="hidden lg:block bg-primary text-white py-3 shadow-inner">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              href="/products" 
              className="group flex items-center gap-2 px-6 py-1 border-r border-white/20 mr-4 hover:text-white/80 transition-colors"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">All Products</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <nav className="flex items-center gap-8">
              {categories.slice(0, 8).map((cat) => {
                const Icon = CATEGORY_ICONS[cat.name] || Component
                return (
                  <div key={cat._id} className="relative group">
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-2 text-[10px] font-black text-white/90 hover:text-white uppercase tracking-[0.15em] transition-all py-1.5"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                      {cat.name}
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      )}
                    </Link>
                    
                    {/* Submenu */}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="absolute top-full left-0 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <div className="bg-white border border-gray-100 shadow-2xl p-3 min-w-[220px] rounded-lg">
                          {cat.subcategories.map((sub: any) => (
                            <Link
                              key={sub.name}
                              href={`/categories/${cat.slug}?sub=${sub.slug}`}
                              className="block text-[10px] font-bold text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md px-4 py-3 transition-all uppercase tracking-widest border-b border-gray-50 last:border-0"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
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
               <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                <div className="relative w-40 h-16">
                  <Image 
                    src="/srk_steel%20logo.jpeg"
                    alt="SRK Steel Logo"
                    fill
                    className="object-contain object-left"
                  />
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
    </header>
  )
}
