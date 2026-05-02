import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.company ? `Inquiry from ${formData.company}` : "General Inquiry",
          message: formData.message
        })
      })

      const json = await res.json()
      if (json.success) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", message: "" })
      } else {
        toast.error(json.error || "Failed to send message.")
      }
    } catch (e) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div>

      <PageHero 
        title="Contact Us"
        subtitle="Have a project in mind? Our team is ready to help you find the perfect steel solution."
        backgroundImage="/metal-angles-steel-profiles-warehouse.jpg"
        stats={[{ label: "GET IN TOUCH" }, { label: "EXPERT ADVICE" }, { label: "QUICK RESPONSE" }]}
      />

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase tracking-tight italic">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 leading-relaxed italic border-l-2 border-primary/20 pl-6">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">First Name *</label>
                    <Input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" className="rounded-none border-gray-100 bg-gray-50 h-14 focus:border-primary italic transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Last Name *</label>
                    <Input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" className="rounded-none border-gray-100 bg-gray-50 h-14 focus:border-primary italic transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Email Address *</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="rounded-none border-gray-100 bg-gray-50 h-14 focus:border-primary italic transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Phone Number *</label>
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 123-4567" className="rounded-none border-gray-100 bg-gray-50 h-14 focus:border-primary italic transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Company (Optional)</label>
                  <Input name="company" value={formData.company} onChange={handleChange} placeholder="Your Company Name" className="rounded-none border-gray-100 bg-gray-50 h-14 focus:border-primary italic transition-all" />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Project Details *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project requirements..."
                    className="rounded-none border-gray-100 bg-gray-50 min-h-[150px] resize-none focus:border-primary italic transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-neutral-900 text-white rounded-none h-16 text-lg font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary/20"
                >
                  {loading ? "PROCESSING..." : "SUBMIT REQUEST"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  Whether you need a quote, technical consultation, or have questions about our products, we're here to
                  help.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-tight">Phone Interaction</h4>
                    <p className="text-gray-500 font-medium text-sm">+1 (555) 123-4567</p>
                    <p className="text-gray-500 font-medium text-sm">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-tight">Email Channels</h4>
                    <p className="text-gray-500 font-medium text-sm">sales@srksteel.com</p>
                    <p className="text-gray-500 font-medium text-sm">support@srksteel.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-tight">Headquarters</h4>
                    <p className="text-gray-500 font-medium text-sm">123 Industrial Area, Phase 4</p>
                    <p className="text-gray-500 font-medium text-sm">Steel City, SC 54321</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-6 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <Clock className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 uppercase tracking-tight">Operating Hours</h4>
                    <p className="text-gray-500 font-medium text-sm">Mon - Fri: 09:00 - 18:00 EST</p>
                    <p className="text-gray-500 font-medium text-sm">Sat: 09:00 - 14:00 EST</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0c2340] p-10 text-white border-t-4 border-primary shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-5">
                  <Phone className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-primary flex-shrink-0 animate-pulse" />
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">Priority Channels</span>
                  </div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Need Immediate Response?</h3>
                  <p className="mb-8 text-gray-400 font-medium">Our tactical sales team is available 24/7 for critical material requests and urgent project timelines.</p>
                  <Button className="bg-primary hover:bg-white hover:text-black text-white rounded-none w-full h-14 font-black uppercase tracking-[0.2em] text-xs transition-colors shadow-lg shadow-black/20">
                    Call Now: +1 (555) 123-4567
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Map Integration Available</p>
            <p className="text-gray-500 text-sm">Add your Google Maps embed code here</p>
          </div>
        </div>
      </section>
    </div>
  )
}

