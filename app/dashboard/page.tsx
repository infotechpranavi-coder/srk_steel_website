"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  ArrowUpRight, 
  Box, 
  CheckCircle2, 
  Clock, 
  Package, 
  Search, 
  TrendingUp, 
  Users,
  Tags,
  ImageIcon,
  Loader2
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardOverview() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [inquiries, setInquiries] = useState<any[]>([])

  useEffect(() => {
    async function fetchStats() {
      try {
        const [statsRes, inqRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/inquiries")
        ])
        const statsJson = await statsRes.json()
        const inqJson = await inqRes.json()
        
        if (statsJson.success) setData(statsJson.data)
        if (inqJson.success) setInquiries(inqJson.data.slice(0, 4))
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const stats = [
    { title: "Total Products", value: data?.totalProducts || "0", icon: Package, change: "+0%", trend: "up" },
    { title: "Total Categories", value: data?.totalCategories || "0", icon: Tags, change: "+0%", trend: "up" },
    { title: "Active Banners", value: data?.totalBanners || "0", icon: ImageIcon, change: "+0%", trend: "up" },
    { title: "Low Stock Items", value: data?.lowStockProducts || "0", icon: TrendingUp, change: "Critical", trend: "down" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1 italic">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-none border-gray-200">
            Download Report
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-none">
            New Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm bg-white rounded-none border-l-4 border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} <span className="text-gray-400">indicator</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="rounded-none border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold uppercase tracking-tight">Recent Inquiries</CardTitle>
            <CardDescription className="italic">Latest quotes requested from the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {inquiries.length > 0 ? (
                inquiries.map((inquiry, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-none text-gray-500">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 uppercase tracking-tighter">{inquiry.name}</h4>
                        <p className="text-xs text-gray-500 italic">{inquiry.subject} • {new Date(inquiry.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      inquiry.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                      inquiry.status === "In Progress" ? "bg-blue-100 text-blue-700" : 
                      "bg-green-100 text-green-700"
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-gray-400 italic">No recent inquiries.</div>
              )}
            </div>
            <Link href="/dashboard/customers">
              <Button variant="link" className="w-full mt-6 text-primary h-auto p-0 font-bold group">
                View All Inquiries <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card className="rounded-none border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold uppercase tracking-tight">Category Distribution</CardTitle>
            <CardDescription className="italic">Product counts across major industrial divisions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {data?.inventoryStatus?.length > 0 ? (
              data.inventoryStatus.map((item: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 uppercase tracking-tighter">{item.name}</span>
                    <span className="text-primary font-bold">{item.count} Products ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2 bg-gray-100 rounded-none overflow-hidden [&>div]:bg-primary" />
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-400 italic">
                No category data available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
