"use client"

import Image from "next/image"
import DOMPurify from "dompurify"

interface BlogContentProps {
  content: string
  coverImage?: string
  description?: string
}

export const Content = ({
  content,
  coverImage,
  description,
}: BlogContentProps) => {
  // Sanitize HTML content to prevent XSS attacks
  // Note: DOMPurify requires a browser environment (window object)
  const sanitizedContent =
    typeof window !== "undefined"
      ? DOMPurify.sanitize(content, {
          ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "em",
            "u",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li",
            "a",
            "blockquote",
            "code",
            "pre",
            "img",
            "div",
            "span",
          ],
          ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
        })
      : content

  return (
    <article className="space-y-8">
      {coverImage && (
        <div className="bg-muted aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={coverImage}
            alt="Documentary cover"
            className="h-full w-full object-cover"
            width={600}
            height={400}
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {description && (
          <p className="description mb-6 leading-relaxed">{description}</p>
        )}
        <div className="description mb-6">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
      </div>
    </article>
  )
}
