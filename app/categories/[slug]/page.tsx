import { notFound } from "next/navigation"
import connectDB from "@/lib/mongodb"
import { Category } from "@/lib/models/Category"

// Required for Next.js 14 dynamic routes params
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB()
  const { slug } = await params
  const category = await Category.findOne({ slug }).lean()
  if (!category) return { title: "Category Not Found" }
  return { title: `${category.name} | SRK Steel`, description: category.description }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // We need a client component to handle the filtering interactivity.
  // So this server component fetches initial data and passes it to the client.
  const { slug } = await params
  
  return <CategoryClientPage slug={slug} />
}

import CategoryClientPage from "./CategoryClientPage"
