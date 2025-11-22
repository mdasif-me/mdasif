import { Metadata } from "next"
import { connectDB } from "@/services/db/connect"
import { MDocumentary } from "@/services/model/documentary.model"

import Documentaries from "@/features/documentaries/documentaries"

export const metadata: Metadata = {
  title: "Documentaries | Md. Asif - Web Development & Tech Stack",
  description:
    "Explore in-depth documentaries and tutorials by Md. Asif. Covering Next.js, React, TypeScript, and modern web development patterns.",
  keywords: [
    "Md. Asif",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Documentaries",
    "Tutorials",
    "Tech Stack",
  ],
}

interface PageProps {
  searchParams: Promise<{
    page?: string
    category?: string
  }>
}

async function getDocumentaries(page: number, category?: string) {
  await connectDB()
  const limit = 10
  const skip = (page - 1) * limit

  const filter: Record<string, unknown> = { isPublished: true }
  if (category) {
    filter.category = category
  }

  const total = await MDocumentary.countDocuments(filter)
  const documentaries = await MDocumentary.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()

  // Serialize MongoDB documents to plain objects to avoid serialization warnings
  const serializedDocumentaries = JSON.parse(JSON.stringify(documentaries))

  return {
    documentaries: serializedDocumentaries,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}

export default async function DocumentariesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || "1")
  const category = resolvedSearchParams.category

  const { documentaries, pagination } = await getDocumentaries(page, category)

  return (
    <section className="space-y-8 py-12 mt-40">
      <Documentaries
        initialDocumentaries={documentaries}
        totalPages={pagination.pages}
        currentPage={page}
        category={category}
      />
    </section>
  )
}
