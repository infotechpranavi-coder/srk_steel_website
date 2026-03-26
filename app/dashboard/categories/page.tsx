"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { 
  Plus, Search, MoreVertical, Edit2, Trash2, ChevronRight, FolderOpen, Layers, Loader2, Upload
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type SubCategory = { _id: string; name: string; slug: string; description?: string; image?: { url: string; publicId: string } }
type Category = { _id: string; name: string; slug: string; description?: string; image?: { url: string; publicId: string }; subcategories: SubCategory[] }

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false)
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const [newCatName, setNewCatName] = useState("")
  const [newCatDescription, setNewCatDescription] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [selectedParentId, setSelectedParentId] = useState("")
  const [newSubName, setNewSubName] = useState("")
  const [newSubDescription, setNewSubDescription] = useState("")
  const [subImagePreview, setSubImagePreview] = useState<string | null>(null)
  const subFileRef = useRef<HTMLInputElement>(null)

  // Edit States
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [editCatName, setEditCatName] = useState("")
  const [editCatDescription, setEditCatDescription] = useState("")
  const [editCatImagePreview, setEditCatImagePreview] = useState<string | null>(null)
  const editCatFileRef = useRef<HTMLInputElement>(null)
  const [isEditMainOpen, setIsEditMainOpen] = useState(false)

  const [editingSub, setEditingSub] = useState<{ catId: string; sub: SubCategory } | null>(null)
  const [editSubName, setEditSubName] = useState("")
  const [editSubDescription, setEditSubDescription] = useState("")
  const [editSubImagePreview, setEditSubImagePreview] = useState<string | null>(null)
  const editSubFileRef = useRef<HTMLInputElement>(null)
  const [isEditSubOpen, setIsEditSubOpen] = useState(false)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/categories")
      const json = await res.json()
      if (json.success) setCategories(json.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const handleSubImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSubImagePreview(URL.createObjectURL(file))
  }

  const handleAddMainCategory = async () => {
    if (!newCatName) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("name", newCatName)
      fd.append("description", newCatDescription)
      if (fileRef.current?.files?.[0]) fd.append("image", fileRef.current.files[0])

      const res = await fetch("/api/categories", {
        method: "POST",
        body: fd,
      })
      const json = await res.json()
      if (json.success) {
        setCategories(prev => [...prev, json.data])
        setNewCatName("")
        setNewCatDescription("")
        setImagePreview(null)
        if (fileRef.current) fileRef.current.value = ""
        setIsMainDialogOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleAddSubcategory = async () => {
    if (!newSubName || !selectedParentId) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("name", newSubName)
      fd.append("description", newSubDescription)
      if (subFileRef.current?.files?.[0]) fd.append("image", subFileRef.current.files[0])

      const res = await fetch(`/api/categories/${selectedParentId}/subcategories`, {
        method: "POST",
        body: fd,
      })
      const json = await res.json()
      if (json.success) {
        setCategories(prev => prev.map(c => c._id === selectedParentId ? json.data : c))
        setNewSubName("")
        setNewSubDescription("")
        setSubImagePreview(null)
        if (subFileRef.current) subFileRef.current.value = ""
        setSelectedParentId("")
        setIsSubDialogOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    setCategories(prev => prev.filter(c => c._id !== id))
  }

  const handleDeleteSubcategory = async (catId: string, subId: string) => {
    const res = await fetch(`/api/categories/${catId}/subcategories`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subId }),
    })
    const json = await res.json()
    if (json.success) {
      setCategories(prev => prev.map(c => c._id === catId ? json.data : c))
    }
  }

  const handleEditMainCategory = async () => {
    if (!editingCat || !editCatName) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("name", editCatName)
      fd.append("description", editCatDescription)
      if (editCatFileRef.current?.files?.[0]) fd.append("image", editCatFileRef.current.files[0])

      const res = await fetch(`/api/categories/${editingCat._id}`, {
        method: "PATCH",
        body: fd,
      })
      const json = await res.json()
      if (json.success) {
        setCategories(prev => prev.map(c => c._id === editingCat._id ? json.data : c))
        setIsEditMainOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleEditSubcategory = async () => {
    if (!editingSub || !editSubName) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("subId", editingSub.sub._id)
      fd.append("name", editSubName)
      fd.append("description", editSubDescription)
      if (editSubFileRef.current?.files?.[0]) fd.append("image", editSubFileRef.current.files[0])

      const res = await fetch(`/api/categories/${editingSub.catId}/subcategories`, {
        method: "PATCH",
        body: fd,
      })
      const json = await res.json()
      if (json.success) {
        setCategories(prev => prev.map(c => c._id === editingSub.catId ? json.data : c))
        setIsEditSubOpen(false)
      }
    } finally {
      setSaving(false)
    }
  }

  const openEditMain = (cat: Category) => {
    setEditingCat(cat)
    setEditCatName(cat.name)
    setEditCatDescription(cat.description || "")
    setEditCatImagePreview(cat.image?.url || null)
    setIsEditMainOpen(true)
  }

  const openEditSub = (catId: string, sub: SubCategory) => {
    setEditingSub({ catId, sub })
    setEditSubName(sub.name)
    setEditSubDescription(sub.description || "")
    setEditSubImagePreview(sub.image?.url || null)
    setIsEditSubOpen(true)
  }

  const filtered = categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Category Management</h1>
          <p className="text-gray-500 mt-1">Manage main product categories and sub-categories. All data is saved to MongoDB.</p>
        </div>

        <div className="flex gap-2">
          {/* Add Main Category */}
          <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-red-700 text-white rounded-none">
                <Plus className="w-4 h-4 mr-2" /> Main Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Main Category</DialogTitle>
                <DialogDescription>Creates a new top-level product category in MongoDB.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="e.g. Wire Rods" className="rounded-none font-medium" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea id="description" value={newCatDescription} onChange={(e) => setNewCatDescription(e.target.value)} placeholder="Describe the category..." className="rounded-none min-h-[80px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Category Banner Image</Label>
                  <div
                    className="border-2 border-dashed border-gray-200 p-4 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => fileRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="relative h-24 w-full">
                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                        <p className="text-xs text-gray-600 tracking-tight">Upload Banner</p>
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMainDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMainCategory} className="bg-primary hover:bg-red-700 text-white" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save to Database
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add Sub Category */}
          <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-200 rounded-none">
                <Plus className="w-4 h-4 mr-2" /> Sub Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Sub Category</DialogTitle>
                <DialogDescription>Link a new sub-category to an existing main category.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid gap-2">
                  <Label>Parent Category *</Label>
                  <Select onValueChange={setSelectedParentId} value={selectedParentId}>
                    <SelectTrigger className="rounded-none font-medium">
                      <SelectValue placeholder="Select main category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {categories.map(cat => <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subname">Name *</Label>
                  <Input id="subname" value={newSubName} onChange={(e) => setNewSubName(e.target.value)} placeholder="e.g. GI Wire" className="rounded-none font-medium" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subdesc">Short Description</Label>
                  <Textarea id="subdesc" value={newSubDescription} onChange={(e) => setNewSubDescription(e.target.value)} placeholder="Describe the sub-category..." className="rounded-none min-h-[80px]" />
                </div>
                <div className="grid gap-2">
                  <Label>Sub-Category Image</Label>
                  <div
                    className="border-2 border-dashed border-gray-200 p-4 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                    onClick={() => subFileRef.current?.click()}
                  >
                    {subImagePreview ? (
                      <div className="relative h-24 w-full">
                        <Image src={subImagePreview} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                        <p className="text-xs text-gray-600 tracking-tight">Upload Option Image</p>
                      </div>
                    )}
                  </div>
                  <input ref={subFileRef} type="file" accept="image/*" className="hidden" onChange={handleSubImageChange} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSubDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddSubcategory} className="bg-primary hover:bg-red-700 text-white" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save to Database
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Main Category Dialog */}
      <Dialog open={isEditMainOpen} onOpenChange={setIsEditMainOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Main Category</DialogTitle>
            <DialogDescription>Update the category details in MongoDB.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid gap-2">
              <Label>Name *</Label>
              <Input value={editCatName} onChange={(e) => setEditCatName(e.target.value)} className="rounded-none shadow-sm" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={editCatDescription} onChange={(e) => setEditCatDescription(e.target.value)} className="rounded-none min-h-[80px]" />
            </div>
            <div className="grid gap-2">
              <Label>Banner Image</Label>
              <div
                className="border-2 border-dashed border-gray-200 p-4 text-center cursor-pointer hover:bg-gray-50 bg-gray-50 group"
                onClick={() => editCatFileRef.current?.click()}
              >
                {editCatImagePreview ? (
                  <div className="relative h-24 w-full">
                    <Image src={editCatImagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                    <p className="text-xs text-gray-500">Upload New Banner</p>
                  </div>
                )}
              </div>
              <input ref={editCatFileRef} type="file" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setEditCatImagePreview(URL.createObjectURL(file))
              }} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMainOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMainCategory} disabled={saving} className="bg-primary hover:bg-red-700 text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Update Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Sub Category Dialog */}
      <Dialog open={isEditSubOpen} onOpenChange={setIsEditSubOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Sub Category</DialogTitle>
            <DialogDescription>Modify sub-category link or details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid gap-2">
              <Label>Name *</Label>
              <Input value={editSubName} onChange={(e) => setEditSubName(e.target.value)} className="rounded-none" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={editSubDescription} onChange={(e) => setEditSubDescription(e.target.value)} className="rounded-none min-h-[80px]" />
            </div>
            <div className="grid gap-2">
              <Label>Thumbnail Image</Label>
              <div
                className="border-2 border-dashed border-gray-200 p-4 text-center cursor-pointer hover:bg-gray-50 bg-gray-50 group"
                onClick={() => editSubFileRef.current?.click()}
              >
                {editSubImagePreview ? (
                  <div className="relative h-24 w-full">
                    <Image src={editSubImagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                    <p className="text-xs text-gray-500">Upload New Image</p>
                  </div>
                )}
              </div>
              <input ref={editSubFileRef} type="file" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setEditSubImagePreview(URL.createObjectURL(file))
              }} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSubOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubcategory} disabled={saving} className="bg-primary hover:bg-red-700 text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Update Sub-Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search categories..." className="pl-10 h-11 border-gray-200 rounded-md bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.length === 0 && (
                <p className="text-center text-gray-400 py-12 italic">No categories yet. Click &quot;Main Category&quot; to add your first one.</p>
              )}
              {filtered.map((cat, idx) => (
                <Card key={cat._id} className="border-gray-200 overflow-hidden group">
                  <CardHeader className="p-4 flex flex-row items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                      {cat.image ? (
                        <div className="relative w-12 h-12 border border-gray-100 shrink-0">
                          <Image src={cat.image.url} alt={cat.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                          <Layers className="w-4 h-4 text-gray-300" />
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg font-bold flex items-center gap-2 leading-none mb-1 text-[#0c2340]">
                          {cat.name}
                          <Badge variant="secondary" className="ml-2 bg-gray-100 text-[10px] text-gray-500 font-bold uppercase tracking-tight">{cat.subcategories.length} Items</Badge>
                        </CardTitle>
                        {cat.description && (
                          <p className="text-[10px] text-gray-400 line-clamp-1 mb-1 italic">{cat.description}</p>
                        )}
                        <CardDescription className="text-[9px] uppercase tracking-widest text-primary/60 font-medium">SLUG: {cat.slug}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="flex items-center gap-2" onClick={() => openEditMain(cat)}>
                          <Edit2 className="w-4 h-4" /> Full Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600" onClick={() => handleDeleteCategory(cat._id)}>
                          <Trash2 className="w-4 h-4" /> Delete Entire Category
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="p-0 border-t border-gray-100">
                    <div className="bg-gray-50/50 p-2">
                      <AnimatePresence>
                        {cat.subcategories.map((sub) => (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            key={sub._id}
                            className="flex items-center justify-between py-2 px-4 hover:bg-white transition-colors border-l-4 border-transparent hover:border-primary"
                          >
                            <div className="flex items-center gap-3">
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                              {sub.image ? (
                                <div className="h-6 w-8 relative border border-gray-200">
                                  <Image src={sub.image.url} alt={sub.name} fill className="object-cover" />
                                </div>
                              ) : (
                                <div className="h-6 w-8 bg-gray-200 flex items-center justify-center text-[8px] text-gray-400 italic">No Pic</div>
                              )}
                              <div>
                                <span className="text-sm font-bold text-[#0c2340]">{sub.name}</span>
                                {sub.description && <span className="text-[10px] text-gray-400 ml-2 italic line-clamp-1 hidden md:inline">• {sub.description}</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-primary" onClick={() => openEditSub(cat._id, sub)}>
                                <Edit2 className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-600" onClick={() => handleDeleteSubcategory(cat._id, sub._id)}>
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {cat.subcategories.length === 0 && (
                        <p className="p-4 text-xs text-center text-gray-400 italic">No sub-categories yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Stats Panel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-gray-900 bg-gray-900 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" /> Structure Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end border-b border-gray-800 pb-4">
                <span className="text-gray-400 text-sm italic">Total Main Categories</span>
                <span className="text-3xl font-bold text-primary">{categories.length}</span>
              </div>
              <div className="flex justify-between items-end border-b border-gray-800 pb-4">
                <span className="text-gray-400 text-sm italic">Total Sub Categories</span>
                <span className="text-3xl font-bold">{categories.reduce((acc, c) => acc + c.subcategories.length, 0)}</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-500 leading-relaxed italic">All data is persisted to MongoDB Atlas. Deleting a main category also removes all its sub-items permanently.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 border-dashed bg-gray-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs space-y-3 text-gray-600 italic">
                <li>• Use clear, descriptive names for main categories.</li>
                <li>• Keep sub-categories focused and distinct.</li>
                <li>• Avoid overly deep hierarchies for better SEO.</li>
                <li>• Slugs are auto-generated from name.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
