"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Plus, Search, MoreVertical, Edit2, Trash2, FolderOpen, Loader2, Upload, ImageIcon, Monitor, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Banner = {
  _id: string; title: string; subtitle: string; description?: string; image: { url: string; publicId: string }
  ctaText: string; ctaLink: string; isActive: boolean; order: number
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop"

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  // Add States
  const [newTitle, setNewTitle] = useState("")
  const [newSubtitle, setNewSubtitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newCtaText, setNewCtaText] = useState("Explore Products")
  const [newCtaLink, setNewCtaLink] = useState("/products")
  const [newOrder, setNewOrder] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Edit States
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editSubtitle, setEditSubtitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editCtaText, setEditCtaText] = useState("Explore Products")
  const [editCtaLink, setEditCtaLink] = useState("/products")
  const [editOrder, setEditOrder] = useState(0)
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)
  const editFileRef = useRef<HTMLInputElement>(null)

  const fetchBanners = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/banners")
      const json = await res.json()
      if (json.success) setBanners(json.data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBanners() }, [fetchBanners])

  const handleCreate = async () => {
    if (!newTitle || !fileRef.current?.files?.[0]) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("title", newTitle)
      fd.append("subtitle", newSubtitle)
      fd.append("description", newDescription)
      fd.append("ctaText", newCtaText)
      fd.append("ctaLink", newCtaLink)
      fd.append("order", newOrder.toString())
      fd.append("image", fileRef.current.files[0])

      const res = await fetch("/api/banners", { method: "POST", body: fd })
      const json = await res.json()
      if (json.success) {
        setBanners(prev => [...prev, json.data])
        setIsAddOpen(false)
        resetAddFields()
      }
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingBanner || !editTitle) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("title", editTitle)
      fd.append("subtitle", editSubtitle)
      fd.append("description", editDescription)
      fd.append("ctaText", editCtaText)
      fd.append("ctaLink", editCtaLink)
      fd.append("order", editOrder.toString())
      if (editFileRef.current?.files?.[0]) fd.append("image", editFileRef.current.files[0])

      const res = await fetch(`/api/banners/${editingBanner._id}`, { method: "PATCH", body: fd })
      const json = await res.json()
      if (json.success) {
        setBanners(prev => prev.map(b => b._id === editingBanner._id ? json.data : b))
        setIsEditOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/banners/${id}`, { method: "DELETE" })
    const json = await res.json()
    if (json.success) setBanners(prev => prev.filter(b => b._id !== id))
  }

  const resetAddFields = () => {
    setNewTitle("")
    setNewSubtitle("")
    setNewDescription("")
    setNewCtaText("Explore Products")
    setNewCtaLink("/products")
    setNewOrder(0)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  const openEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setEditTitle(banner.title)
    setEditSubtitle(banner.subtitle)
    setEditDescription(banner.description || "")
    setEditCtaText(banner.ctaText)
    setEditCtaLink(banner.ctaLink)
    setEditOrder(banner.order)
    setEditImagePreview(banner.image.url)
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">Banner Management</h1>
          <p className="text-gray-500 mt-1 italic">Control the hero section slides on your website's home page.</p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover text-white rounded-none h-12 px-8">
              <Plus className="w-4 h-4 mr-2" /> Add Hero Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Hero Banner</DialogTitle>
              <DialogDescription>Create a new slide for the home page hero section.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid gap-2">
                <Label>Hero Image *</Label>
                <div 
                  className="border-2 border-dashed border-gray-200 aspect-video flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 bg-gray-50 group"
                  onClick={() => fileRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                      <p className="text-xs text-gray-500 mt-2">Upload 1920x1080 Image</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setImagePreview(URL.createObjectURL(file))
                }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Division/Tagline *</Label>
                  <Input value={newSubtitle} onChange={e => setNewSubtitle(e.target.value)} placeholder="Industrial Excellence" className="rounded-none" />
                </div>
                <div className="grid gap-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={newOrder} onChange={e => setNewOrder(Number(e.target.value))} className="rounded-none" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Main Headline *</Label>
                <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Forging the Future" className="rounded-none font-bold" />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Short supporting text..." className="rounded-none min-h-[80px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Button Text</Label>
                  <Input value={newCtaText} onChange={e => setNewCtaText(e.target.value)} className="rounded-none" />
                </div>
                <div className="grid gap-2">
                  <Label>Button Link</Label>
                  <Input value={newCtaLink} onChange={e => setNewCtaLink(e.target.value)} className="rounded-none" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={saving} className="bg-primary hover:bg-primary-hover text-white">
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Add Banner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {banners.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 italic text-gray-400">
              No hero banners yet. Click "Add Hero Banner" to begin.
            </div>
          )}
          {banners.map((banner) => (
            <Card key={banner._id} className="overflow-hidden group border-gray-100 hover:border-primary transition-colors hover:shadow-lg">
              <div className="relative aspect-video">
                <Image src={banner.image.url} alt={banner.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                  <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{banner.subtitle}</span>
                  <h3 className="text-white font-black text-xl uppercase italic leading-tight">{banner.title}</h3>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                   <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90" onClick={() => openEdit(banner)}>
                     <Edit2 className="h-4 w-4" />
                   </Button>
                   <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(banner._id)}>
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </div>
              <CardContent className="p-4 bg-white space-y-3">
                <p className="text-[10px] text-gray-500 line-clamp-2 italic">{banner.description || "No description provided."}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-widest">
                    {banner.ctaText} <ArrowRight className="h-3 w-3" />
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">POS: {banner.order}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Hero Banner</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid gap-2">
              <Label>Replace Hero Image (Optional)</Label>
              <div 
                className="border-2 border-dashed border-gray-200 aspect-video flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 bg-gray-50 group"
                onClick={() => editFileRef.current?.click()}
              >
                {editImagePreview ? (
                  <div className="relative w-full h-full">
                    <Image src={editImagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                   <FolderOpen className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <input ref={editFileRef} type="file" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setEditImagePreview(URL.createObjectURL(file))
              }} />
            </div>
            <div className="grid gap-2">
              <Label>Main Headline</Label>
              <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="rounded-none font-bold" />
            </div>
            <div className="grid gap-2">
              <Label>Division/Tagline</Label>
              <Input value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} className="rounded-none" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} className="rounded-none min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Button Text</Label>
                <Input value={editCtaText} onChange={e => setEditCtaText(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Sort Order</Label>
                <Input type="number" value={editOrder} onChange={e => setEditOrder(Number(e.target.value))} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={saving} className="bg-primary hover:bg-primary-hover text-white">
              {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Update Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

