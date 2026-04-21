"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

type FooterProduct = { _id: string; title: string; slug: string; showInFooter: boolean }

export function Footer() {
  const [footerProducts, setFooterProducts] = useState<FooterProduct[]>([])

  useEffect(() => {
    const fetchFooterProducts = async () => {
      try {
        const res = await fetch("/api/products")
        const json = await res.json()
        if (json.success) {
          const featured = json.data.filter((p: FooterProduct) => p.showInFooter)
          setFooterProducts(featured)
        }
      } catch (e) {
        console.error("Failed to load footer products", e)
      }
    }
    fetchFooterProducts()
  }, [])

  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <Link href="/" className="block group">
              <div className="relative w-64 h-32 transition-all duration-300">
                <Image 
                  src="/srk_steel%20logo.jpeg"
                  alt="SRK Steel Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium italic">
              Premium industrial steel solutions engineered for strength, durability, and precision. 
              Serving construction and infrastructure sectors since 1998.
            </p>
          </div>

          <div>
            <h4 className="font-black text-primary mb-8 uppercase tracking-[0.3em] text-[10px]">Industrial Products</h4>
            <ul className="space-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              {footerProducts.length > 0 ? (
                footerProducts.map(product => (
                  <li key={product._id}>
                    <Link href={`/package/${product.slug}`} className="hover:text-primary transition-colors">
                      {product.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <span className="text-gray-600">No featured products</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-primary mb-8 uppercase tracking-[0.3em] text-[10px]">Explore Site</h4>
            <ul className="space-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-primary mb-8 uppercase tracking-[0.3em] text-[10px]">Get in Touch</h4>
            <ul className="space-y-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">123 Industrial Area, Phase 4, Steel City, SC 54321</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="leading-relaxed">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="leading-relaxed text-white">sales@srksteel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} SRK Steel Limited. All rights reserved.</p>
          <div className="flex gap-10">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>

  )
}
