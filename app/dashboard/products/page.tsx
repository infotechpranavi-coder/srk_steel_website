"use client"

import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, ExternalLink, Upload, ArrowRight, Loader2
} from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

type SubCategory = { _id: string; name: string; slug: string }
type Category = { _id: string; name: string; slug: string; subcategories: SubCategory[] }
type Product = {
  _id: string; slug: string; title: string
  mainCategory: string; subCategory: string
  specs: string; stock: string; price: string; status: string
  image?: { url: string; publicId: string }
}

export default function DashboardProducts() {
  // List data
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formTitle, setFormTitle] = useState("")
  const [selectedMainCategory, setSelectedMainCategory] = useState("")
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [formSpecs, setFormSpecs] = useState("")
  const [formPrice, setFormPrice] = useState("")
  const [formStock, setFormStock] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formShowInFooter, setFormShowInFooter] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Fetch categories and products
  const fetchAll = useCallback(async () => {
    setLoadingProducts(true)
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/products"),
      ])
      const catJson = await catRes.json()
      const prodJson = await prodRes.json()
      if (catJson.success) setCategories(catJson.data)
      if (prodJson.success) setProducts(prodJson.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingProducts(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

    const resetForm = () => {
    setFormTitle(""); setFormSpecs(""); setFormDescription("")
    setFormPrice(""); setFormStock("")
    setSelectedMainCategory(""); setSelectedSubCategory("")
    setFormShowInFooter(false)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleSubmit = async () => {
    if (!formTitle || !selectedMainCategory) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("title", formTitle)
      fd.append("mainCategory", selectedMainCategory)
      fd.append("subCategory", selectedSubCategory)
      fd.append("specs", formSpecs)
      fd.append("description", formDescription)
      fd.append("price", formPrice)
      fd.append("stock", formStock)
      fd.append("showInFooter", formShowInFooter.toString())
      if (fileRef.current?.files?.[0]) fd.append("image", fileRef.current.files[0])

      const res = await fetch("/api/products", { method: "POST", body: fd })
      const json = await res.json()
      if (json.success) {
        setProducts(prev => [json.data, ...prev])
        setIsDialogOpen(false)
        resetForm()
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this product permanently?")) return
    await fetch(`/api/products/${slug}`, { method: "DELETE" })
    setProducts(prev => prev.filter(p => p.slug !== slug))
  }

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mainCategory.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedCatSubcategories = categories.find(c => c.name === selectedMainCategory)?.subcategories || []

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Product Management</h1>
          <p className="text-gray-500 mt-1">Add, edit and manage your industrial steel catalogue. Data stored in MongoDB.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm() }}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-red-700 text-white rounded-none h-12 px-6 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Upload New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] border-none rounded-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add New Industrial Product</DialogTitle>
              <DialogDescription>
                Data is saved to MongoDB. Images are uploaded to Cloudinary.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Row 1: Title + Main Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input id="title" value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="e.g. High Tensile TMT Bars" className="rounded-none border-gray-200" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Main Category *</Label>
                    <Link href="/dashboard/categories" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-tight">Manage →</Link>
                  </div>
                  <Select value={selectedMainCategory} onValueChange={(val) => { setSelectedMainCategory(val); setSelectedSubCategory("") }}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Select main category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto rounded-none border-gray-200">
                      {categories.map(cat => (
                        <SelectItem key={cat._id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Sub Category + Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sub Category</Label>
                  <Select disabled={!selectedMainCategory} value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder={selectedMainCategory ? "Select sub category" : "Pick main category first"} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto rounded-none border-gray-200">
                      {selectedCatSubcategories.map(sub => (
                        <SelectItem key={sub._id} value={sub.name}>{sub.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Base Price</Label>
                  <Input id="price" value={formPrice} onChange={e => setFormPrice(e.target.value)} placeholder="e.g. ₹55,000/Ton" className="rounded-none border-gray-200" />
                </div>
              </div>

              {/* Row 3: Specs + Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specs">Technical Specifications</Label>
                  <Input id="specs" value={formSpecs} onChange={e => setFormSpecs(e.target.value)} placeholder="e.g. Grade: IS 2062 | Size: 10mm" className="rounded-none border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Level</Label>
                  <Input id="stock" value={formStock} onChange={e => setFormStock(e.target.value)} placeholder="e.g. 500 Tons" className="rounded-none border-gray-200" />
                </div>
              </div>

              {/* Description & Footer Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea id="description" value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Describe the industrial applications and metallurgical properties..." className="rounded-none border-gray-200 min-h-[100px]" />
                </div>
                <div className="space-y-2 pt-6">
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 border border-gray-100">
                    <Checkbox id="showInFooter" checked={formShowInFooter} onCheckedChange={(c) => setFormShowInFooter(c as boolean)} />
                    <Label htmlFor="showInFooter" className="font-medium cursor-pointer">
                      Show in Footer
                    </Label>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-1 pl-2">If checked, this product will be highlighted under "Industrial Products" in the footer.</p>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Image → Cloudinary</Label>
                <div
                  className="border-2 border-dashed border-gray-200 p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => fileRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative h-36 w-full">
                      <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                      <p className="text-sm text-gray-600 font-medium tracking-tight">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 uppercase tracking-widest">JPG, PNG, WEBP up to 10MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-none border-gray-200" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-red-700 text-white rounded-none px-8"
                disabled={saving || !formTitle || !selectedMainCategory}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Save to MongoDB
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters & Search */}
      <Card className="rounded-none border-gray-100 shadow-sm bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by product name or category..."
                className="pl-10 h-11 rounded-none border-gray-200 focus-visible:ring-primary w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-none border-gray-200 flex items-center gap-2 h-11 px-4">
                <Filter className="w-4 h-4" /> Category
              </Button>
              <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-none border-gray-200 h-11 px-4 text-gray-400">
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="rounded-none border-gray-100 shadow-sm overflow-hidden bg-white">
        {loadingProducts ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-100">
                <TableHead className="w-[80px] font-bold text-gray-900">ID</TableHead>
                <TableHead className="font-bold text-gray-900">Product</TableHead>
                <TableHead className="font-bold text-gray-900">Category</TableHead>
                <TableHead className="font-bold text-gray-900">Stock Level</TableHead>
                <TableHead className="font-bold text-gray-900 text-right">Price</TableHead>
                <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-gray-400 italic">
                    No products found. Upload your first product above.
                  </TableCell>
                </TableRow>
              ) : filteredProducts.map((product) => (
                <TableRow key={product._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                  <TableCell className="font-mono text-xs text-gray-500 uppercase tracking-tighter">
                    {product._id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        <Image
                          src={product.image?.url || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{product.title}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">{product.specs}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-900 text-[10px] font-bold uppercase tracking-widest w-fit">
                        {product.mainCategory}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium italic">
                        {product.subCategory}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-900">{product.stock}</span>
                      <span className={`text-[10px] font-bold uppercase flex items-center gap-1 ${
                        product.status === "Active" ? "text-green-600" :
                        product.status === "Low Stock" ? "text-yellow-600" : "text-primary"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          product.status === "Active" ? "bg-green-600" :
                          product.status === "Low Stock" ? "bg-yellow-600" : "bg-primary"
                        }`} />
                        {product.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900">
                    {product.price}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-red-600 transition-colors" onClick={() => handleDelete(product.slug)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none border-gray-200">
                          <DropdownMenuLabel>Product Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2" asChild>
                            <Link href={`/package/${product.slug}`} target="_blank">
                              <ExternalLink className="w-4 h-4" /> View on Site
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product.slug)}>Discontinue</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <div>Showing {filteredProducts.length} of {products.length} products</div>
          <div className="flex gap-2">
            <Button variant="outline" disabled size="sm" className="rounded-none border-gray-200">Previous</Button>
            <Button variant="outline" size="sm" className="rounded-none border-gray-200">Next</Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions Footer */}
      <div className="py-8 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-primary text-white space-y-3">
            <h3 className="font-bold text-lg uppercase tracking-wider">Bulk Import</h3>
            <p className="text-white/80 text-sm">Upload CSV or Excel files to update multiple product prices or stocks instantly.</p>
            <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-primary rounded-none w-full h-11 font-bold">
              Open Bulk Tool
            </Button>
          </div>
          <div className="p-6 bg-gray-900 text-white space-y-3">
            <h3 className="font-bold text-lg uppercase tracking-wider">Sync Inventory</h3>
            <p className="text-white/80 text-sm">Last synced: Today. Connect your ERP systems for automated updates.</p>
            <Button variant="outline" className="bg-transparent border-gray-700 hover:bg-gray-800 rounded-none w-full h-11 font-bold text-white">
              Run Manual Sync
            </Button>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-sm space-y-3">
            <h3 className="font-bold text-lg uppercase tracking-wider text-gray-900">Site Status</h3>
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              LIVE CATALOGUE ACTIVE
            </div>
            <p className="text-gray-500 text-sm">Changes made here reflect on the public website.</p>
            <Button variant="link" className="p-0 text-primary h-auto font-bold group" asChild>
              <Link href="/products">
                Visit Website <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
