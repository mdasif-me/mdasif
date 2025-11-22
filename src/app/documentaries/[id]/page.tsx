import { Suspense } from "react"
import { Metadata } from "next"

import Documentary from "../../../features/documentaries/documentary"

interface DocumentaryPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: DocumentaryPageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/documentaries/${id}`
    )
    const data = await response.json()

    return {
      title: `${data.documentary?.title} | Md. Asif`,
      description: data.documentary?.description || "Documentary",
    }
  } catch {
    return {
      title: "Documentary | Md. Asif",
    }
  }
}

export default async function DocumentaryPage({
  params,
}: DocumentaryPageProps) {
  const { id } = await params
  return (
    <section className="space-y-8 py-12 mt-48">
      <Suspense>
        <Documentary documentaryId={id} />
      </Suspense>
    </section>
  )
}
