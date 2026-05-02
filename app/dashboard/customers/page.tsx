"use client"

import { useState, useEffect } from "react"
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
  Plus,
  Loader2
} from "lucide-react"
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
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const res = await fetch("/api/inquiries")
        const json = await res.json()
        if (json.success) setInquiries(json.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchInquiries()
  }, [])

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans uppercase italic">Partner Intelligence</h1>
          <p className="text-gray-500 mt-1 italic">Manage relationships and track quote requests from industrial partners.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-none border-gray-200 flex items-center gap-2 h-12 px-6">
              <Download className="w-4 h-4"/>
              Export CSV
           </Button>
           <Button className="bg-primary hover:bg-primary-hover text-white rounded-none h-12 px-8 font-bold">
              Add New Partner
           </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="rounded-none border-gray-100 shadow-sm bg-white border-l-4 border-primary">
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Total Partners
                  <Users className="w-4 h-4 text-primary"/>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-2">{inquiries.length}</div>
               <div className="text-[10px] text-green-600 font-bold mt-1 tracking-tighter uppercase">REAL-TIME ACQUISITION STATUS</div>
            </CardContent>
         </Card>
         <Card className="rounded-none border-gray-100 shadow-sm bg-white border-l-4 border-primary">
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Active Quotes
                  <FileText className="w-4 h-4 text-primary"/>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-2">
                 {inquiries.filter(i => i.status === "Pending").length}
               </div>
               <div className="text-[10px] text-primary font-bold mt-1 tracking-tighter uppercase">REQUESTS PENDING RESPONSE</div>
            </CardContent>
         </Card>
         <Card className="rounded-none border-gray-100 shadow-sm bg-white border-l-4 border-primary">
            <CardContent className="p-6">
               <div className="flex justify-between items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                  Growth Rate
                  <ArrowUpRight className="w-4 h-4 text-primary"/>
               </div>
               <div className="text-3xl font-bold text-gray-900 mt-2">85%</div>
               <div className="text-[10px] text-gray-500 font-bold mt-1 tracking-tighter uppercase">RETENTION AND RECALL RATE</div>
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
                 className="pl-10 h-10 rounded-none border-gray-100 bg-gray-50 focus-visible:ring-primary italic"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <Button variant="outline" className="rounded-none border-gray-200 flex items-center gap-2 h-10">
              <Filter className="w-4 h-4"/>
              Filter by Status
           </Button>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-100 uppercase tracking-widest text-[10px]">
              <TableHead className="font-bold text-gray-900">Partner Details</TableHead>
              <TableHead className="font-bold text-gray-900">Contact</TableHead>
              <TableHead className="font-bold text-gray-900">Message Content</TableHead>
              <TableHead className="font-bold text-gray-900">Status</TableHead>
              <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-gray-400 italic">
                  No inquiries found in the database.
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border border-gray-200 rounded-none shrink-0 overflow-hidden">
                         <AvatarImage src={`https://avatar.vercel.sh/${inquiry.name}.png`} className="object-cover"/>
                         <AvatarFallback className="rounded-none bg-primary text-white text-xs">{inquiry.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-primary transition-colors uppercase tracking-tighter">{inquiry.name}</div>
                        <div className="text-[10px] text-gray-400 font-medium tracking-tight uppercase">{inquiry.subject}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors cursor-pointer italic">
                         <Mail className="w-3 h-3"/> {inquiry.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 italic">
                         <Phone className="w-3 h-3"/> {inquiry.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 max-w-xs">
                      <div className="text-xs text-gray-600 line-clamp-2 italic">"{inquiry.message}"</div>
                      <div className="text-[10px] text-gray-400 font-medium">{new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <span className={`px-3 py-1 font-bold uppercase tracking-wider text-[10px] ${
                       inquiry.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                       inquiry.status === "In Progress" ? "bg-blue-100 text-blue-700" : 
                       "bg-green-100 text-green-700"
                     }`}>
                        {inquiry.status}
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
              ))
            )}
          </TableBody>
        </Table>
        <div className="p-4 bg-gray-50 flex justify-center">
            <Button variant="link" className="text-primary font-bold tracking-widest text-xs uppercase flex items-center gap-2 h-auto p-0">
               Refresh Partner Data <Plus className="w-4 h-4"/>
            </Button>
        </div>
      </Card>
    </div>
  )
}

