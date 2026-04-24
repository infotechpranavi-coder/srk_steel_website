"use client"

import { motion } from "framer-motion"
import { Award, Globe, Shield, Target, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/PageHero"

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "Every product meets rigorous international standards and undergoes comprehensive testing.",
    },
    {
      icon: Target,
      title: "Customer Focus",
      description: "Your project success is our priority. We provide tailored solutions for your unique needs.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously adopting modern manufacturing techniques and sustainable practices.",
    },
    {
      icon: Globe,
      title: "Reliability",
      description: "Trusted partner for major infrastructure and construction projects across the nation.",
    },
  ]

  const milestones = [
    { year: "1998", title: "Founded", desc: "SRK Steel established with a vision to serve the construction industry" },
    { year: "2005", title: "ISO Certified", desc: "Received ISO 9001:2015 certification for quality management" },
    { year: "2012", title: "Expansion", desc: "Expanded operations with state-of-the-art manufacturing facility" },
    { year: "2020", title: "Global Distribution Network", desc: "Established distribution network covering all major cities" },
    { year: "2024", title: "10,000+ Projects", desc: "Proud to have contributed to over 10,000 successful projects" },
  ]

  return (
    <div>
      <PageHero 
        title="Our Mission"
        subtitle="Strength isn't just about steel. It's about reliability, integrity, and building a foundation that lasts for generations."
        backgroundImage="/rolled-steel-metal-sheets-factory.jpg"
        stats={[{ label: "25+ YEARS EXPERIENCE" }, { label: "INNOVATION DRIVEN" }, { label: "GLOBAL FOOTPRINT" }]}
      />

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square bg-gray-200 overflow-hidden"
            >
              <Image
                src="/steel-worker-welding-industrial-factory.jpg"
                alt="SRK Steel factory"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Forged by <span className="text-primary">Experience</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 1998, SRK Steel began with a simple mission: to provide the construction and manufacturing
                industries with steel products that meet the highest standards of quality and reliability.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we've grown into one of the region's most trusted steel suppliers, serving thousands of projects
                ranging from residential construction to large-scale infrastructure developments.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our success is built on three pillars: uncompromising quality, customer-first service, and continuous
                innovation in metallurgy and supply chain management.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What Drives Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-muted text-primary flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Milestones</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-8 mb-12 last:mb-0 relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && <div className="w-[2px] h-full bg-gray-200 mt-4" />}
                </div>
                <div className="pb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with Glassmorphism Effect */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/abstract-steel-texture-dark-metal.jpg" 
            alt="Industrial Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0c2340]/90 backdrop-blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10 px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">
              Certified Excellence
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto italic">
              Our commitment to quality is backed by international certifications and industry recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "ISO 9001:2015" },
              { icon: Shield, title: "ISI Marked" },
              { icon: Award, title: "BIS Certified" },
              { icon: Shield, title: "Quality Assured" },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-10 text-center border border-white/10 hover:border-primary/50 transition-all duration-500 group"
              >
                <div className="mb-6 relative">
                  <cert.icon className="w-16 h-16 text-primary mx-auto relative z-10 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform" />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-sm">{cert.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Thousands of Satisfied Customers</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Experience the SRK Steel difference. Let's build something great together.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-none h-14 px-10">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  )
}

