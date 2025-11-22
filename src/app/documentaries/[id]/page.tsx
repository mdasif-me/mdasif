import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { connectDB } from "@/services/db/connect"
import { MDocumentary } from "@/services/model/documentary.model"

import Documentary from "../../../features/documentaries/documentary"

interface DocumentaryPageProps {
  params: Promise<{ id: string }>
}

async function getDocumentary(id: string) {
  await connectDB()
  const documentary = await MDocumentary.findById(id).lean()
  if (!documentary) return null
  return JSON.parse(JSON.stringify(documentary))
}

export async function generateMetadata({
  params,
}: DocumentaryPageProps): Promise<Metadata> {
  const { id } = await params
  const documentary = await getDocumentary(id)

  if (!documentary) {
    return {
      title: "Documentary Not Found | Md. Asif",
    }
  }

  return {
    title: `${documentary.title} | Md. Asif`,
    description: documentary.description,
    openGraph: {
      title: documentary.title,
      description: documentary.description,
      images: [
        {
          url: documentary.thumbnail,
          width: 1200,
          height: 630,
          alt: documentary.title,
        },
      ],
    },
  }
}

export default async function DocumentaryPage({
  params,
}: DocumentaryPageProps) {
  const { id } = await params
  const documentary = await getDocumentary(id)

  if (!documentary) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: documentary.title,
    description: documentary.description,
    image: documentary.thumbnail,
    datePublished: documentary.createdAt,
    dateModified: documentary.updatedAt,
    author: {
      "@type": "Person",
      name: "Md. Asif",
      url: "https://muhammadasif.me",
    },
  }

  return (
    <section className="space-y-8 py-12 mt-48">
      <Script
        id="documentary-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense>
        <Documentary initialDocumentary={documentary} />
      </Suspense>
    </section>
  )
}
