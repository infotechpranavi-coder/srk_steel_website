"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Package, Shield, TrendingUp, Truck, Users, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/PageHero"

export default function ServicesPage() {
  const services = [
    {
      icon: Package,
      title: "Custom Cutting & Fabrication",
      description:
        "Precision cutting and fabrication services tailored to your exact specifications. We work with your blueprints to deliver custom steel solutions.",
      features: ["CNC Plasma Cutting", "Laser Cutting", "Water Jet Cutting", "Custom Welding"],
    },
    {
      icon: Truck,
      title: "Fast Delivery & Logistics",
      description:
        "Extensive global delivery network ensuring your materials reach you on time, every time. Just-in-time delivery for project efficiency.",
      features: ["Same-Day Dispatch", "Real-Time Tracking", "Bulk Order Management", "Global Coverage"],
    },
    {
      icon: Shield,
      title: "Quality Testing & Certification",
      description:
        "All products undergo rigorous quality testing and come with full certification to meet national and international standards.",
      features: ["Material Test Reports", "ISO 9001:2015 Certified", "Third-Party Inspection", "Quality Guarantee"],
    },
    {
      icon: Users,
      title: "Technical Consultation",
      description:
        "Expert engineering support to help you choose the right materials and specifications for your construction or manufacturing project.",
      features: ["Material Selection Guidance", "Load Calculation Support", "Cost Optimization", "Project Planning"],
    },
    {
      icon: Wrench,
      title: "Installation Support",
      description:
        "On-site installation guidance and support from our experienced technical team to ensure proper implementation.",
      features: ["Site Visits", "Installation Training", "Technical Documentation", "After-Sales Support"],
    },
    {
      icon: TrendingUp,
      title: "Inventory Management",
      description:
        "Dedicated inventory management solutions for large contractors and builders to streamline your supply chain.",
      features: ["Vendor Managed Inventory", "Stock Monitoring", "Automated Reordering", "Usage Analytics"],
    },
  ]

  return (
    <div>

      <PageHero 
        title="Industrial Services"
        subtitle="Beyond supply, we provide end-to-end solutions to support your projects from planning to completion."
        backgroundImage="/steel-worker-welding-industrial-factory.jpg"
        stats={[{ label: "24/7 SUPPORT" }, { label: "GLOBAL LOGISTICS" }, { label: "ISO CERTIFIED" }]}
      />

      {/* Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border-l-4 border-primary hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-red-50 text-primary flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined process designed to deliver excellence at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: "01", title: "Consultation", desc: "Understand your requirements and project specifications" },
              { step: "02", title: "Quotation", desc: "Receive detailed pricing and material recommendations" },
              { step: "03", title: "Processing", desc: "Custom fabrication, cutting, and quality testing" },
              { step: "04", title: "Delivery", desc: "On-time delivery with installation support if needed" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-primary text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">24/7</h3>
              <p className="text-white/80">Customer Support</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">98%</h3>
              <p className="text-white/80">On-Time Delivery</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">5000+</h3>
              <p className="text-white/80">Tons Monthly Capacity</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">100%</h3>
              <p className="text-white/80">Quality Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how our services can support your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none h-14 px-10">
              Request a Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-gray-600 text-white hover:bg-white hover:text-gray-900 rounded-none h-14 px-10"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
