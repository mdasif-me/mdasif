import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
  _id: string
  imageSrc: string
  imageAlt: string
  title: string
}

export default function Sidebar({
  _id,
  imageSrc,
  imageAlt,
  title,
}: SidebarProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt}
        width={64}
        height={64}
        className="aspect-square rounded-md object-cover"
      />
      <Link href={`/documentaries/${_id}`}>
        <h4 className="text-sm leading-snug font-medium hover:underline">
          {title}
        </h4>
      </Link>
    </div>
  )
}
