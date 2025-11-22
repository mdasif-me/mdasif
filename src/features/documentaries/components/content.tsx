import Image from "next/image"

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
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </article>
  )
}
