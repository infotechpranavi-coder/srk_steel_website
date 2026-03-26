"use client"

import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  FileText, 
  Download, 
  Filter, 
  MoreHorizontal,
  ArrowUpRight,
  Plus
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
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardCustomers() {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: "CUST-001",
      name: "Rahul Mehra",
      company: "Rahul Construction Pvt Ltd",
      email: "rahul@rahulconst.com",
      phone: "+91 98765 43210",
      type: "Bulk Buyer",
      totalOrders: "12",
      lastInteraction: "Today, 10:45 AM"
    },
    {
      id: "CUST-002",
      name: "Amit Singh",
      company: "Apex Infrastructure",
      email: "amit.singh@apexinfra.in",
      phone: "+91 91234 56789",
      type: "Contractor",
      totalOrders: "4",
      lastInteraction: "Yesterday, 02:15 PM"
    },
    {
      id: "CUST-003",
      name: "Sanjay Gupta",
      company: "Global Builders",
      email: "sanjay@globalbuilders.com",
      phone: "+91 88888 77777",
      type: "Distributor",
      totalOrders: "28",
      lastInteraction: "2 days ago"
    },
    {
      id: "CUST-004",
      name: "Priyanka Verma",
      company: "Sunrise Developers",
      email: "p.verma@sunrisedev.com",
      phone: "+91 77777 66666",
      type: "Individual",
      totalOrders: "1",
      lastInteraction: "1 week ago"
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">Customer Intelligence</h1>
          <p className="text-gray-500 mt-1">Manage relationships and track quote requests from industrial partners.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-none border-gray-200 flex items-center gap-2 h-12 px-6">
              <Download className="w-4 h-4"/>
              Export CSV
           </Button>
           <Button className="bg-primary hover:bg-red-700 text-white rounded-none h-12 px-8 font-bold">
              Add New Partner
           </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="rounded-none border-gray-100 shadow-sm bg-white">
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Total Partners
                  <Users className="w-4 h-4 text-primary"/>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-2">1,248</div>
               <div className="text-[10px] text-green-600 font-bold mt-1 tracking-tighter uppercase">+12% GROWTH IN RECENT MONTH</div>
            </CardContent>
         </Card>
         <Card className="rounded-none border-gray-100 shadow-sm bg-white">
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Active Quotes
                  <FileText className="w-4 h-4 text-primary"/>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-2">84</div>
               <div className="text-[10px] text-primary font-bold mt-1 tracking-tighter uppercase">56 REQUESTS PENDING RESPONSE</div>
            </CardContent>
         </Card>
         <Card className="rounded-none border-gray-100 shadow-sm bg-white">
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Average Value
                  <ArrowUpRight className="w-4 h-4 text-primary"/>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-2">₹1.4L</div>
               <div className="text-[10px] text-gray-500 font-bold mt-1 tracking-tighter uppercase">PER TRANSACTION ORDER VALUE</div>
            </CardContent>
         </Card>
      </div>

      {/* Customer List Section */}
      <Card className="rounded-none border-gray-100 shadow-sm bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4 items-center">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                 placeholder="Search by name, company or email..." 
                 className="pl-10 h-10 rounded-none border-gray-200 focus-visible:ring-primary"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <Button variant="outline" className="rounded-none border-gray-200 flex items-center gap-2 h-10">
              <Filter className="w-4 h-4"/>
              Filter by Type
           </Button>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-100 uppercase tracking-widest text-[10px]">
              <TableHead className="font-bold text-gray-900">Partner Details</TableHead>
              <TableHead className="font-bold text-gray-900">Contact</TableHead>
              <TableHead className="font-bold text-gray-900">Engagement</TableHead>
              <TableHead className="font-bold text-gray-900">Type</TableHead>
              <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-gray-200 rounded-none shrink-0 overflow-hidden">
                       <AvatarImage src={`https://avatar.vercel.sh/${customer.name}.png`} className="object-cover"/>
                       <AvatarFallback className="rounded-none bg-primary text-white text-xs">{customer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{customer.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium tracking-tight uppercase">{customer.company}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors cursor-pointer">
                       <Mail className="w-3 h-3"/> {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                       <Phone className="w-3 h-3"/> {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-bold text-gray-900">{customer.totalOrders} Orders</div>
                    <div className="text-[10px] text-gray-400 font-medium">Last active: {customer.lastInteraction}</div>
                  </div>
                </TableCell>
                <TableCell>
                   <span className="px-3 py-1 bg-gray-100 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
                      {customer.type}
                   </span>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 bg-gray-50 flex justify-center">
            <Button variant="link" className="text-primary font-bold tracking-widest text-xs uppercase flex items-center gap-2 h-auto p-0">
               Load More Partners <Plus className="w-4 h-4"/>
            </Button>
        </div>
      </Card>
    </div>
  )
}
