import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { SiteWrapper } from "@/components/SiteWrapper"
import connectDB from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let categories = []
  try {
    await connectDB()
    const rawCategories = await Category.find({}).sort({ name: 1 }).lean()
    categories = JSON.parse(JSON.stringify(rawCategories))
  } catch (error) {
    console.error("Failed to fetch global categories:", error)
  }

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteWrapper categories={categories}>
          {children}
          <Analytics />
        </SiteWrapper>
      </body>
    </html>
  )
}
