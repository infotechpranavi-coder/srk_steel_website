"use client"

import { 
  ArrowUpRight, 
  Box, 
  CheckCircle2, 
  Clock, 
  Package, 
  Search, 
  TrendingUp, 
  Users 
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
  const stats = [
    { title: "Total Products", value: "245", icon: Package, change: "+12%", trend: "up" },
    { title: "New Orders", value: "18", icon: Clock, change: "+5%", trend: "up" },
    { title: "Active Customers", value: "1,240", icon: Users, change: "+24%", trend: "up" },
    { title: "Sales Revenue", value: "₹24.8L", icon: TrendingUp, change: "+18%", trend: "up" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
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
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1 font-medium">
                {stat.change} <span className="text-gray-400">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="rounded-none border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Inquiries</CardTitle>
            <CardDescription>Latest quotes requested from the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Rahul Construction Pvt Ltd", type: "Bulk TMT Bars", time: "2 hours ago", status: "Pending" },
                { name: "Apex Infrastructure", type: "I-Beams", time: "5 hours ago", status: "In Progress" },
                { name: "Global Builders", type: "Binding Wires", time: "Yesterday", status: "Completed" },
                { name: "Sunrise Developers", type: "Custom Fabrication", time: "2 days ago", status: "Pending" },
              ].map((inquiry, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-none text-gray-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{inquiry.name}</h4>
                      <p className="text-xs text-gray-500">{inquiry.type} • {inquiry.time}</p>
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
              ))}
            </div>
            <Button variant="link" className="w-full mt-6 text-primary h-auto p-0 font-bold group">
              View All Inquiries <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card className="rounded-none border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Inventory Status</CardTitle>
            <CardDescription>Current stock levels for major categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Structural Steel</span>
                <span className="text-primary">85%</span>
              </div>
              <Progress value={85} className="h-2 bg-gray-100 rounded-none overflow-hidden [&>div]:bg-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">TMT Bars</span>
                <span className="text-primary">42%</span>
              </div>
              <Progress value={42} className="h-2 bg-gray-100 rounded-none overflow-hidden [&>div]:bg-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">MS Pipes</span>
                <span className="text-primary">68%</span>
              </div>
              <Progress value={68} className="h-2 bg-gray-100 rounded-none overflow-hidden [&>div]:bg-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-700">Steel Sheets</span>
                <span className="text-yellow-600">12% - Critical</span>
              </div>
              <Progress value={12} className="h-2 bg-gray-100 rounded-none overflow-hidden [&>div]:bg-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
