"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MessageCircle, FileText, MapPin } from "lucide-react"
import Link from "next/link"

export function QuickAccess() {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")

  const actions = [
    { 
      icon: MapPin, 
      label: "Location", 
      href: "/contact", 
      color: "text-[#a02222]", 
      bgColor: "hover:bg-[#a02222]/10" 
    },
    { 
      icon: FileText, 
      label: "Enquiry", 
      href: "/contact?type=enquiry", 
      color: "text-[#1a1a1a]", 
      bgColor: "hover:bg-gray-100" 
    },
    { 
      icon: Mail, 
      label: "Email", 
      href: "mailto:sales@srksteel.com", 
      color: "text-[#a02222]", 
      bgColor: "hover:bg-[#a02222]/10" 
    },
    { 
      icon: MessageCircle, 
      label: "WhatsApp", 
      href: "https://wa.me/919152341656", 
      color: "text-green-600", 
      bgColor: "hover:bg-green-50" 
    },
    { 
      icon: Phone, 
      label: "Call", 
      href: "tel:+919152341656", 
      color: "text-blue-600", 
      bgColor: "hover:bg-blue-50" 
    },
  ]

  if (isDashboard) return null

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] py-6 px-2 flex flex-col gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
      >
        {actions.map((action, idx) => (
          <Link
            key={idx}
            href={action.href}
            target={action.href.startsWith("http") ? "_blank" : "_self"}
            className={`group relative p-3 rounded-full transition-all duration-300 ${action.bgColor} ${action.color}`}
          >
            <action.icon className="w-[20px] h-[20px] transition-transform group-hover:scale-125" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1a1a1a] text-[9px] font-black uppercase tracking-[0.2em] text-white px-3 py-2 rounded-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-r-2 border-[#a02222] shadow-xl pointer-events-none">
              {action.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}
