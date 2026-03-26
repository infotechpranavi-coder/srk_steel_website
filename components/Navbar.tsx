"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

type Category = {
  _id: string; name: string; slug: string; image?: { url: string }
  subcategories?: { name: string; slug: string }[]
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
    const handleScroll = () => setScrolled(window.scrollY > 20)
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

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-lg backdrop-blur-md h-auto" : "bg-white h-auto border-b border-gray-100"}`}>
      {/* Upper Row: Logo and Main Nav */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300 shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg md:text-xl">S</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-[#0c2340] uppercase">
              SRK<span className="text-primary italic">STEEL</span>
            </span>
          </Link>

          {/* Desktop Main Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8 h-full border-r border-gray-100 pr-8 mr-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                    pathname === link.href ? "text-primary" : "text-gray-400 group-hover:text-primary"
                  }`}>
                    {link.name}
                  </span>
                  {(pathname === link.href) ? (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/40 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>

            {/* Tactical Search Bar */}
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="SEARCH CATALOGUE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 border border-gray-100 px-4 pl-10 h-11 w-[180px] text-[10px] font-bold focus:w-[260px] focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all duration-300 rounded-none italic"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </form>

            <Button className="bg-primary hover:bg-neutral-900 text-white rounded-none h-11 px-8 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 flex items-center gap-3 transition-all">
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-[#0c2340]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Lower Row: Category Tab Bar (Desktop Only) - Industrial Contrast */}
      <div className="hidden md:block bg-black border-y border-white/5 py-3 shadow-2xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-x-12 gap-y-3 justify-center">
            {categories.map((cat) => (
              <div key={cat._id} className="relative group">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-2 text-[10px] font-black text-primary hover:text-white whitespace-nowrap uppercase tracking-[0.2em] transition-all py-1 cursor-pointer"
                >
                  {cat.name}
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <ChevronDown className="w-3 h-3 text-red-500/50 group-hover:text-white transition-colors" />
                  )}
                </Link>

                {/* Subcategories Dropdown Modal - Industrial Contrast */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-black border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,1)] p-4 min-w-[240px] space-y-1">
                      {cat.subcategories.map((sub: any) => (
                        <Link
                          key={sub.name}
                          href={`/categories/${cat.slug}?sub=${sub.slug}`}
                          className="block text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-none px-4 py-3 transition-all uppercase tracking-widest border-b border-white/5 last:border-0"
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container px-4 py-8 flex flex-col gap-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 px-4 pl-12 h-14 text-sm font-bold focus:ring-1 focus:ring-primary outline-none italic uppercase"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </form>

              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black text-[#0c2340] uppercase tracking-tighter"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <span className="text-primary font-bold tracking-widest uppercase text-xs">Our Divisions</span>
                <div className="grid grid-cols-1 gap-4">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/categories/${cat.slug}`}
                      className="text-lg font-bold text-gray-500 hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Button className="bg-primary text-white w-full h-14 text-lg font-black uppercase tracking-widest rounded-none shadow-lg shadow-primary/20">Get a Quote</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
