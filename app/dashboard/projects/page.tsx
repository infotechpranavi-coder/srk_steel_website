"use client"

import { 
  Building2, 
  MapPin, 
  Calendar, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  Clock,
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
import Image from "next/image"

export default function DashboardProjects() {
  const [searchTerm, setSearchTerm] = useState("")

  const projects = [
    {
      id: "PROJ-001",
      title: "Indra Metro Phase II",
      location: "Strategic Infrastructure Hub",
      completion: "March 2024",
      tonnage: "1,250 Tons",
      status: "Completed",
      image: "/industrial-steel-factory-beams-dark-cinematic.jpg"
    },
    {
      id: "PROJ-002",
      title: "Ocean View Bridge",
      location: "Coastal Marine District",
      completion: "Ongoing",
      tonnage: "4,800 Tons",
      status: "In Progress",
      image: "/steel-worker-welding-industrial-factory.jpg"
    },
    {
      id: "PROJ-003",
      title: "Green Valley Tech Park",
      location: "Tech Infrastructure Zone",
      completion: "Nov 2023",
      tonnage: "750 Tons",
      status: "Completed",
      image: "/industrial-steel-factory-beams-dark-cinematic.jpg"
    },
    {
        id: "PROJ-004",
        title: "Industrial Complex Z",
        location: "Industrial Development Park",
        completion: "Oct 2024 (Est)",
        tonnage: "2,100 Tons",
        status: "Planning",
        image: "/abstract-steel-texture-dark-metal.jpg"
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">Project Showcase</h1>
          <p className="text-gray-500 mt-1">Manage the historical projects that build the SRK Steel legacy.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white rounded-none h-12 px-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Project Case
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] border-none rounded-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold uppercase tracking-wider">Add Project Details</DialogTitle>
              <DialogDescription>
                Highlight the achievements and technical scale of the project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proj_title">Project Name</Label>
                  <Input id="proj_title" placeholder="e.g. Skyline Skyscraper" className="rounded-none border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proj_location">Location</Label>
                  <Input id="proj_location" placeholder="City, State" className="rounded-none border-gray-200" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proj_tonnage">Steel Tonnage</Label>
                  <Input id="proj_tonnage" placeholder="e.g. 500 Tons" className="rounded-none border-gray-200" />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="proj_status">Status</Label>
                   <select className="w-full h-10 border border-gray-200 rounded-none bg-white px-3 text-sm">
                      <option>Completed</option>
                      <option>In Progress</option>
                      <option>Planning Stage</option>
                   </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proj_desc">Case Study Description</Label>
                <Textarea id="proj_desc" placeholder="Details about the industrial solution provided..." className="rounded-none border-gray-200 min-h-[100px]" />
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="border-2 border-dashed border-gray-200 p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                   <Building2 className="w-12 h-12 text-gray-400 group-hover:text-primary transition-colors mx-auto mb-2" />
                   <p className="text-sm text-gray-600 font-bold uppercase tracking-widest">Upload Architectural Photo</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-none border-gray-100">Cancel</Button>
              <Button type="submit" className="bg-primary hover:bg-gray-950 text-white rounded-none px-8 font-bold">Add to Portfolio</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-none border-gray-100 shadow-sm bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-100">
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                 placeholder="Search project database..." 
                 className="pl-10 h-10 rounded-none border-gray-200"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-100 uppercase tracking-[0.2em] text-[10px]">
              <TableHead className="font-bold text-gray-900">Project Reference</TableHead>
              <TableHead className="font-bold text-gray-900">Location & Date</TableHead>
              <TableHead className="font-bold text-gray-900">Volume</TableHead>
              <TableHead className="font-bold text-gray-900">Status</TableHead>
              <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((proj) => (
              <TableRow key={proj.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 relative bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      <Image src={proj.image || "/placeholder.svg"} alt={proj.title} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{proj.title}</div>
                      <div className="text-[10px] text-gray-400 font-mono tracking-tighter uppercase">{proj.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                       <MapPin className="w-3 h-3 text-primary"/> {proj.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                       <Calendar className="w-3 h-3 text-gray-400"/> {proj.completion}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-gray-900 text-sm">
                   {proj.tonnage}
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    proj.status === "Completed" ? "bg-green-50 text-green-700" : 
                    proj.status === "In Progress" ? "bg-blue-50 text-blue-700" : 
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {proj.status === "Completed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {proj.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                   <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary-hover transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                   </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="py-12 flex flex-col items-center gap-4 text-center">
         <div className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">End of Database Records</div>
         <Button variant="outline" className="rounded-none border-gray-200 h-10 px-6 font-bold uppercase text-xs tracking-widest">
            Backup Local Records
         </Button>
      </div>
    </div>
  )
}

