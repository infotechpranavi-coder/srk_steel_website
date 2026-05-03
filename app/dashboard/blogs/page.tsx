"use client"

import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, ExternalLink, Upload, ArrowRight, Loader2, Calendar, User
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

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  status: string;
  image?: { url: string; publicId: string };
}

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Form state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [saving, setSaving] = useState(false)
  
  // Fields
  const [formTitle, setFormTitle] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formExcerpt, setFormExcerpt] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formCategory, setFormCategory] = useState("")
  const [formAuthor, setFormAuthor] = useState("SRK Admin")
  const [formStatus, setFormStatus] = useState("Published")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/blogs")
      const json = await res.json()
      if (json.success) setBlogs(json.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const resetForm = () => {
    setFormTitle(""); setFormSlug(""); setFormExcerpt(""); setFormContent("")
    setFormCategory(""); setFormAuthor("SRK Admin"); setFormStatus("Published")
    setImagePreview(null); setEditingBlog(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormTitle(blog.title)
    setFormSlug(blog.slug)
    setFormExcerpt(blog.excerpt)
    setFormContent(blog.content)
    setFormCategory(blog.category)
    setFormAuthor(blog.author)
    setFormStatus(blog.status)
    setImagePreview(blog.image?.url || null)
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    if (!formTitle || !formCategory || !formExcerpt || !formContent) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append("title", formTitle)
      fd.append("slug", formSlug || formTitle.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""))
      fd.append("excerpt", formExcerpt)
      fd.append("content", formContent)
      fd.append("category", formCategory)
      fd.append("author", formAuthor)
      fd.append("status", formStatus)
      if (fileRef.current?.files?.[0]) fd.append("image", fileRef.current.files[0])

      const url = editingBlog ? `/api/blogs/id/${editingBlog._id}` : "/api/blogs"
      const method = editingBlog ? "PUT" : "POST"

      const res = await fetch(url, { method, body: fd })
      const json = await res.json()
      if (json.success) {
        if (editingBlog) {
          setBlogs(prev => prev.map(b => b._id === editingBlog._id ? json.data : b))
        } else {
          setBlogs(prev => [json.data, ...prev])
        }
        setIsDialogOpen(false)
        resetForm()
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article permanently?")) return
    const res = await fetch(`/api/blogs/id/${id}`, { method: "DELETE" })
    const json = await res.json()
    if (json.success) {
      setBlogs(prev => prev.filter(b => b._id !== id))
    }
  }

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase italic">Blog Management</h1>
          <p className="text-gray-500 mt-1">Publish technical articles, market updates, and company news.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(o) => { setIsDialogOpen(o); if (!o) resetForm() }}>
          <DialogTrigger asChild>
            <Button className="bg-[#a02222] hover:bg-[#801b1b] text-white rounded-none h-12 px-6 flex items-center gap-2 shadow-lg shadow-[#a02222]/20">
              <Plus className="w-5 h-5" /> Write New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] border-none rounded-none">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold uppercase italic">{editingBlog ? "Edit Article" : "Compose New Article"}</DialogTitle>
              <DialogDescription>
                Fill in the details below. Images are hosted on Cloudinary.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Article Title *</Label>
                  <Input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="e.g. The Future of Steel Construction" className="rounded-none border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formCategory} onValueChange={setFormCategory}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-gray-200">
                      {["Technical", "Compliance", "Hardware", "Sustainability", "Logistics", "Market News"].map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Short Excerpt * (Visible in list)</Label>
                <Textarea value={formExcerpt} onChange={e => setFormExcerpt(e.target.value)} placeholder="A brief summary of the article..." className="rounded-none border-gray-200 h-20" />
              </div>

              <div className="space-y-2">
                <Label>Main Content * (Markdown/HTML supported)</Label>
                <Textarea value={formContent} onChange={e => setFormContent(e.target.value)} placeholder="Write your full article here..." className="rounded-none border-gray-200 min-h-[300px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input value={formAuthor} onChange={e => setFormAuthor(e.target.value)} className="rounded-none border-gray-200" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formStatus} onValueChange={setFormStatus}>
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-gray-200">
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div
                  className="border-2 border-dashed border-gray-200 p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => fileRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative h-48 w-full">
                      <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#a02222] transition-colors" />
                      <p className="text-sm font-bold uppercase tracking-tight">Upload Header Image</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Recommended: 1200x630px</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="rounded-none" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                className="bg-[#a02222] hover:bg-[#801b1b] text-white rounded-none px-8"
                disabled={saving || !formTitle || !formCategory}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {editingBlog ? "Update Article" : "Publish Article"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-none border-gray-100 shadow-sm bg-white">
        <CardContent className="p-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by title or category..."
              className="pl-10 h-11 rounded-none border-gray-200 focus-visible:ring-[#a02222]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-none border-gray-100 shadow-sm overflow-hidden bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#a02222]" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-100">
                <TableHead className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Article</TableHead>
                <TableHead className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Category</TableHead>
                <TableHead className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Author/Date</TableHead>
                <TableHead className="font-bold text-gray-900 uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="font-bold text-gray-900 uppercase tracking-widest text-[10px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-gray-400 italic">
                    No articles found. Start writing today.
                  </TableCell>
                </TableRow>
              ) : filteredBlogs.map((blog) => (
                <TableRow key={blog._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 group">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 relative bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                        <Image
                          src={blog.image?.url || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-[#a02222] transition-colors">{blog.title}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-tighter truncate max-w-[200px]">{blog.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 bg-gray-100 text-[#a02222] text-[10px] font-black uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-900">
                        <User className="w-3 h-3" /> {blog.author}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                        <Calendar className="w-3 h-3" /> {new Date(blog.date).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${
                      blog.status === "Published" ? "text-green-600" : "text-gray-400"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        blog.status === "Published" ? "bg-green-600 animate-pulse" : "bg-gray-400"
                      }`} />
                      {blog.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-1">
                      <Button variant="ghost" size="icon" className="hover:text-[#a02222]" onClick={() => handleEdit(blog)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-[#a02222]" onClick={() => handleDelete(blog._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none border-gray-200">
                          <DropdownMenuItem asChild>
                            <Link href={`/blogs/${blog.slug}`} target="_blank" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" /> View Live
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
