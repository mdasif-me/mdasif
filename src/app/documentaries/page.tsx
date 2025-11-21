import { Metadata } from "next"

import { DocumentaryList } from "@/features/documentaries"

export const metadata: Metadata = {
  title: "Documentaries | Md. Asif",
  description:
    "Explore in-depth documentaries and tutorials on web development, design, and technology.",
}

export default function DocumentariesPage() {
  return (
    <section className="space-y-8 py-12">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">📚 Documentaries</h1>
        <p className="text-lg text-gray-600">
          Explore in-depth articles, guides, and tutorials on web development,
          design patterns, and modern technologies.
        </p>
      </div>
      <DocumentaryList />
    </section>
  )
}
