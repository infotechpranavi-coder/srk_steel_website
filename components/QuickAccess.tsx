"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MessageCircle, FileText, MapPin } from "lucide-react"
import Link from "next/link"

export function QuickAccess() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        // Only show after scrolling past hero on home page
        setIsVisible(window.scrollY > window.innerHeight * 0.8)
      } else if (pathname.startsWith("/dashboard")) {
        // Never show on dashboard
        setIsVisible(false)
      } else {
        // Show instantly on other public pages
        setIsVisible(true)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const actions = [
    { icon: MapPin, label: "Location", href: "/contact", color: "hover:bg-primary" },
    { icon: FileText, label: "Enquiry", href: "/contact?type=enquiry", color: "hover:bg-primary" },
    { icon: Mail, label: "Email", href: "mailto:sales@srksteel.com", color: "hover:bg-primary" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/yournumber", color: "hover:bg-green-600" },
    { icon: Phone, label: "Call", href: "tel:+1234567890", color: "hover:bg-primary" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] hidden lg:block"
        >
          <div className="bg-black/90 backdrop-blur-xl border border-primary/40 rounded-[2rem] py-5 px-2 flex flex-col gap-5 shadow-[0_20px_50px_rgba(211,47,47,0.2)]">
            {actions.map((action, idx) => (
              <Link
                key={idx}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : "_self"}
                className={`group relative p-2 rounded-full transition-all duration-300 ${action.color} text-white/50 hover:text-white`}
              >
                <action.icon className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />
                
                {/* Tooltip */}
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-[9px] font-black uppercase tracking-[0.2em] text-white px-3 py-1.5 rounded-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-r-2 border-primary pointer-events-none">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
