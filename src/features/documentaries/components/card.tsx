import Image from "next/image"
import Link from "next/link"

interface DocumentaryCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  _id: string
}

export default function Card({
  imageSrc,
  imageAlt,
  title,
  description,
  _id,
}: DocumentaryCardProps) {
  return (
    <Link href={`/documentaries/${_id}`}>
      <div className="bg-secondary-foreground text-secondary overflow-hidden rounded-2xl border-border/10 border">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={225}
          className="h-48 w-full object-cover"
        />
        <div className="grid gap-2 p-4">
          <h3 className="text-lg leading-tight font-semibold">{title}</h3>
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
