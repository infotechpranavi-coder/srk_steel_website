"use client"

import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Mail, Phone, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/PageHero"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug

  // In a real app, you'd fetch this from a database or API
  const products = [
    {
      slug: "i-beams-h-beams",
      title: "I-Beams & H-Beams",
      category: "Structural Steel",
      specs: "Sizes: 100mm to 900mm | Grade: IS 2062",
      image: "/steel-beams-construction-metal-stack.jpg",
      description: "High-strength structural beams for heavy construction and infrastructure projects. Engineered to withstand massive loads and provide superior structural integrity.",
      features: ["Premium Grade IS 2062", "Corrosion Resistant Coating", "Custom Lengths Available", "Structural Certification Included"],
      technicalSpecs: [
        { label: "Material", value: "Mild Steel" },
        { label: "Standard", value: "IS 2062 / ASTM A36" },
        { label: "Yield Strength", value: "250 MPa min." },
        { label: "Application", value: "High-rise Buildings, Bridges, Industrial Structures" }
      ]
    },
    {
      slug: "tmt-rebars-fe-500d",
      title: "TMT Rebars Fe 500D",
      category: "TMT Bars",
      specs: "Dia: 8mm to 32mm | Grade: Fe 500D, Fe 550D",
      image: "/tmt-steel-bars-rust-orange-construction.jpg",
      description: "Thermo-mechanically treated rebars with superior strength, ductility and weldability. Perfectly balanced for earthquake-resistant structures.",
      features: ["FE 500D Grade", "High Ductility", "Superior Bond Strength", "Earthquake Resistant"],
      technicalSpecs: [
        { label: "Diameter Range", value: "8mm - 32mm" },
        { label: "Grade", value: "Fe 500D" },
        { label: "Elongation", value: "16% min." },
        { label: "Carbon Content", value: "0.25% max." }
      ]
    },
    {
      slug: "ms-seamless-pipes",
      title: "MS Seamless Pipes",
      category: "Pipes & Tubes",
      specs: "Dia: 15mm to 300mm | Standard: IS 1239",
      image: "/steel-pipes-round-metal-stack-industrial.jpg",
      description: "High-pressure seamless pipes for industrial, plumbing and structural applications. Manufactured using state-of-the-art extrusion processes.",
      features: ["Leak Proof", "High Pressure Tolerance", "Smooth Internal Finish", "Standard Lengths"],
      technicalSpecs: [
        { label: "Schedule", value: "SCH 40, SCH 80" },
        { label: "Standard", value: "IS 1239 / ASTM A106" },
        { label: "Surface Finish", value: "Black / Galvanized" },
        { label: "End Finish", value: "Plain / Beveled / Threaded" }
      ]
    },
    {
      slug: "hot-rolled-sheets",
      title: "Hot Rolled Sheets",
      category: "Sheets & Plates",
      specs: "Thickness: 2mm to 40mm | Width: up to 2500mm",
      image: "/rolled-steel-metal-sheets-factory.jpg",
      description: "Premium quality hot rolled sheets for manufacturing, fabrication and heavy equipment production.",
      features: ["Flat & Uniform Surface", "Easy to Weld", "High Formability", "Wide Widths Available"],
      technicalSpecs: [
        { label: "Thickness", value: "2mm - 40mm" },
        { label: "Grade", value: "ST 37 / ST 52" },
        { label: "Finish", value: "Dry / Pickled & Oiled" },
        { label: "Form", value: "Coils / Cut-to-length Sheets" }
      ]
    },
    {
      slug: "binding-wire",
      title: "Binding Wire",
      category: "Wire Products",
      specs: "Gauge: 18 to 22 | Type: Black Annealed",
      image: "/steel-wire-coils-industrial-factory.jpg",
      description: "Flexible binding wire for construction reinforcement tying. Annealed for maximum softness and strength.",
      features: ["High Softness", "Low Snapping Rate", "Uniform Gauge", "Protective Oiling"],
      technicalSpecs: [
        { label: "Gauge", value: "18 BWG - 22 BWG" },
        { label: "Material", value: "Annealed Mild Steel" },
        { label: "Packaging", value: "25kg Coils / 50kg Coils" },
        { label: "Surface", value: "Black / Galvanized" }
      ]
    },
    {
      slug: "steel-channels",
      title: "Steel Channels",
      category: "Structural Steel",
      specs: "Sizes: 75mm to 400mm | Standard: IS 2062",
      image: "/steel-beams-construction-metal-stack.jpg",
      description: "C-channels and U-channels for structural framing, support systems and automotive body construction.",
      features: ["High Structural Stability", "Clean Finish", "Precise Dimensional Tolerance", "Ready to Fabricate"],
      technicalSpecs: [
        { label: "Type", value: "C-Channels / U-Channels" },
        { label: "Standard", value: "IS 2062" },
        { label: "Lengths", value: "6m / 12m or Custom" },
        { label: "Strength", value: "High Tensile" }
      ]
    },
  ]

  const product = products.find(p => p.slug === slug) || products[0]

  return (
    <div>
      <main className="flex-grow pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Catalogue
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative aspect-square bg-gray-100 overflow-hidden border border-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-square bg-gray-100 border border-gray-100 cursor-pointer hover:border-primary transition-colors">
                    <Image
                      src={product.image}
                      alt={`${product.title} angle ${i}`}
                      fill
                      className="object-cover opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <div className="mb-8">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{product.title}</h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                   <div className="px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700">
                      ID: {product.slug.toUpperCase()}
                   </div>
                   <div className="px-4 py-2 bg-red-50 border border-red-100 text-sm font-bold text-primary italic">
                      In Stock
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm border-b pb-2">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm border-b pb-2">Technical Specs</h3>
                  <div className="space-y-3">
                    {product.technicalSpecs.map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="font-medium text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-6">
                <div className="p-6 bg-gray-900 text-white rounded-none">
                  <div className="flex items-start gap-4 mb-6">
                    <ShieldCheck className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-1">Authenticity Guaranteed</h4>
                      <p className="text-xs text-gray-400">Every batch is tested and certified for structural safety and compliance.</p>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-red-700 text-white rounded-none h-14 text-lg font-bold">
                    REQUEST FOR QUOTE
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border border-gray-100">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium">+1 (555) 123-4567</span>
                  </div>
                   <div className="flex items-center gap-3 p-4 border border-gray-100">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium">sales@srksteel.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
