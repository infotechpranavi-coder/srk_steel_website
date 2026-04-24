"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { QuickAccess } from "@/components/QuickAccess"

export function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      {!isDashboard && <QuickAccess />}
      <main className={`flex-grow ${!isDashboard ? "pt-[70px] lg:pt-[110px]" : ""}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}
