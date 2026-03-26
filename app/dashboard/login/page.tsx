"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating login delay
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4">
      {/* Background Industrial Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-100 -skew-x-12 translate-x-1/2 z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-l-[32px] border-b-[32px] border-primary/5 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-primary flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <span className="text-3xl font-bold tracking-tighter text-gray-900">
              SRK<span className="text-primary">STEEL</span>
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-2">
            <ShieldCheck className="w-4 h-4" />
            Admin Secure Access
          </div>
        </div>

        <Card className="rounded-none border-gray-200 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8 border-b border-gray-50">
            <CardTitle className="text-2xl font-bold text-center">Manager Dashboard</CardTitle>
            <CardDescription className="text-center">
              Enter your industrial credentials to manage the portal.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 pt-8">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase text-gray-400">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@srksteel.com" 
                    required 
                    className="pl-10 h-12 rounded-none border-gray-200 focus:border-primary transition-all pr-4" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase text-gray-400">Secret Token</Label>
                  <Link href="#" className="text-xs text-primary hover:underline font-bold">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    className="pl-10 h-12 rounded-none border-gray-200 focus:border-primary transition-all pr-12" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded-none border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <label htmlFor="remember" className="text-xs font-medium text-gray-600 cursor-pointer">Remember this terminal for 30 days</label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-8">
              <Button 
                type="submit" 
                className="w-full h-14 bg-primary hover:bg-red-700 text-white rounded-none text-lg font-bold group"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Establish Connection"}
                {!isLoading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
              <p className="text-center text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Enterprise Logistics Management v4.0.1
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Support Footer */}
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Need access? <Link href="/contact" className="text-primary font-bold hover:underline">Contact System Admin</Link></p>
        </div>
      </motion.div>
    </div>
  )
}
