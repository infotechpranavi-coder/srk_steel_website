"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <span className="text-2xl font-black text-white uppercase tracking-tighter">
                SRK<span className="text-primary italic">STEEL</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs italic">
              Premium steel solutions for construction, infrastructure, and industrial applications. 
              Building the world with strength and integrity since 1998.
            </p>
          </div>

          <div>
            <h4 className="font-black text-primary mb-8 uppercase tracking-[0.3em] text-[10px]">Industrial Products</h4>
            <ul className="space-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <li>
                <Link href="/products/tmt-bars" className="hover:text-primary transition-colors">
                  TMT Bars
                </Link>
              </li>
              <li>
                <Link href="/products/structural-steel" className="hover:text-primary transition-colors">
                  Structural Steel
                </Link>
              </li>
              <li>
                <Link href="/products/steel-pipes" className="hover:text-primary transition-colors">
                  Steel Pipes & Tubes
                </Link>
              </li>
              <li>
                <Link href="/products/steel-sheets-plates" className="hover:text-primary transition-colors">
                  Sheets & Plates
                </Link>
              </li>
              <li>
                <Link href="/products/wire-rods" className="hover:text-primary transition-colors">
                  Wire Rods & Coils
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-primary mb-8 uppercase tracking-[0.3em] text-[10px]">Company Divisions</h4>
            <ul className="space-y-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/about#milestones" className="hover:text-primary transition-colors">
                  Milestones
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-primary mb-8 uppercase tracking-[0.3em] text-[10px]">Headquarters</h4>
            <ul className="space-y-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <li className="flex flex-col gap-2">
                <span className="text-white font-black text-xs tracking-tighter">Registered Office</span>
                <span className="leading-relaxed">123 Industrial Area, Phase 4, Steel City, SC 54321</span>
              </li>
              <li className="flex flex-col gap-2">
                <span className="text-white font-black text-xs tracking-tighter">Direct Contact</span>
                <span className="leading-relaxed">+1 (555) 123-4567 • sales@srksteel.com</span>
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
