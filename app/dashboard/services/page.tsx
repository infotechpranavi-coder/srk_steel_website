"use client"

import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Settings,
  Wrench,
  Truck,
  Shield,
  Package,
  Users,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardServices() {
  const [searchTerm, setSearchTerm] = useState("")

  const services = [
    {
      id: "SVC-001",
      icon: Package,
      title: "Custom Cutting & Fabrication",
      description: "Precision cutting and fabrication services tailored to exact specifications.",
      status: "Active",
      features: ["CNC Plasma", "Laser Cutting", "Custom Welding"]
    },
    {
      id: "SVC-002",
      icon: Truck,
      title: "Fast Delivery & Logistics",
      description: "Global delivery network ensuring materials reach on time.",
      status: "Active",
      features: ["Same-Day Dispatch", "Real-Time Tracking", "International Coverage"]
    },
    {
      id: "SVC-003",
      icon: Shield,
      title: "Quality Testing",
      description: "Rigorous quality testing and full certification to international standards.",
      status: "Active",
      features: ["Material Reports", "ISO 9001", "Third-Party Inspection"]
    },
    {
        id: "SVC-004",
        icon: Users,
        title: "Technical Consultation",
        description: "Expert engineering support for construction or manufacturing projects.",
        status: "Disabled",
        features: ["Material Selection", "Load Calculation", "Cost Optimization"]
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Service Offerings</h1>
          <p className="text-gray-500 mt-1">Manage and update your value-added industrial services.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-red-700 text-white rounded-none h-12 px-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] border-none rounded-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold uppercase tracking-wider">Define New Service</DialogTitle>
              <DialogDescription>
                Describe the technical expertise and features of this service.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input id="title" placeholder="e.g. Automated Surface Treatment" className="rounded-none border-gray-200" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" placeholder="A concise summary of the service's key value proposition..." className="rounded-none border-gray-200 min-h-[80px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Key Features (One per line)</Label>
                <Textarea id="features" placeholder="Bullet points for the service page..." className="rounded-none border-gray-200 min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon Type</Label>
                  <div className="grid grid-cols-4 gap-2">
                     <Button variant="outline" className="h-12 w-full rounded-none border-primary bg-primary text-white"><Wrench className="w-5 h-5"/></Button>
                     <Button variant="outline" className="h-12 w-full rounded-none border-gray-100"><Truck className="w-5 h-5"/></Button>
                     <Button variant="outline" className="h-12 w-full rounded-none border-gray-100"><Shield className="w-5 h-5"/></Button>
                     <Button variant="outline" className="h-12 w-full rounded-none border-gray-100"><Settings className="w-5 h-5"/></Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Availability</Label>
                  <select className="w-full h-12 border border-gray-200 rounded-none bg-white px-3 text-sm focus:outline-primary">
                    <option>Show on Website</option>
                    <option>Hide from Site</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-none border-gray-200">Save Draft</Button>
              <Button type="submit" className="bg-primary hover:bg-gray-800 text-white rounded-none px-8">Publish Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid (Table style) */}
      <Card className="rounded-none border-gray-100 shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-100">
              <TableHead className="w-[100px] font-bold text-gray-900">ID</TableHead>
              <TableHead className="font-bold text-gray-900">Service Provider</TableHead>
              <TableHead className="font-bold text-gray-900">Key Features</TableHead>
              <TableHead className="font-bold text-gray-900">Site Visibility</TableHead>
              <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                <TableCell className="font-mono text-xs text-gray-400">
                  {service.id}
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-50 text-primary flex items-center justify-center shrink-0">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{service.title}</div>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{service.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold uppercase text-gray-500">
                        {f}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${service.status === "Active" ? "bg-green-600 animate-pulse" : "bg-gray-300"}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${service.status === "Active" ? "text-green-700 font-bold" : "text-gray-400 font-medium"}`}>
                      {service.status === "Active" ? "LIVE ON SITE" : "DRAFT MODE"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
         <Card className="rounded-none border-primary/20 bg-white shadow-sm border-l-4 border-l-primary">
            <CardContent className="p-8">
               <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center text-gray-500">
                     <TrendingUp className="w-8 h-8"/>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h3 className="text-xl font-bold text-gray-900">Service Analytics</h3>
                        <p className="text-sm text-gray-500 mt-1">Track which services are getting the most quote requests.</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="text-center bg-gray-50 p-3 flex-1">
                           <div className="text-2xl font-bold text-primary">124</div>
                           <div className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">TOTAL REQUESTS</div>
                        </div>
                        <div className="text-center bg-gray-50 p-3 flex-1">
                           <div className="text-2xl font-bold text-gray-900">+18%</div>
                           <div className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">THIS MONTH</div>
                        </div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="rounded-none border-gray-100 bg-gray-900 shadow-sm border-l-4 border-l-gray-400">
            <CardContent className="p-8">
               <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Advanced Configuration</h3>
                    <p className="text-sm text-gray-400 mt-1">Configure technical parameters for custom quotes.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                     <Button className="rounded-none bg-white text-gray-900 hover:bg-gray-100 h-11 font-bold flex items-center justify-between">
                        Modify Price Tiers <Plus className="w-4 h-4"/>
                     </Button>
                     <Button variant="outline" className="rounded-none border-gray-700 bg-transparent text-gray-400 hover:text-white h-11 font-bold text-left justify-start">
                        Update API Endpoints
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="py-12 border-t border-gray-50 text-center">
         <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-200 transition-colors">
            Preview Service Page Changes <ArrowRight className="w-3 h-3 ml-2"/>
         </div>
      </div>
    </div>
  )
}
