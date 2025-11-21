import { JSX } from "react"
import Link from "next/link"
import { Quote } from "@/components"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

import styles from "../styles/contact.module.css"

interface SocialProps {
  name: string
  href: string
  description: string
  icon: IconSvgElement
  className?: string
  iconWidth?: number
  iconHeight?: number
}

/**
 * @param {SocialProps} props - The properties for the Social component
 * @return {JSX.Element} A JSX element containing the social media link card
 */
const Social = ({
  name,
  href,
  description,
  icon: Icon,
  className = "",
  iconWidth = 34,
  iconHeight = 34,
}: SocialProps): JSX.Element => {
  return (
    <div className={`card p-6 w-full h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between w-full">
        <div className={`${styles["contact-card-logo"]} w-fit`}>
          <HugeiconsIcon
            className="text-primary shrink-0"
            width={iconWidth}
            height={iconHeight}
            icon={Icon}
          />
        </div>
        <Link href={href} aria-label={`Visit ${name}`}>
          <Quote isBordered isText={false} />
        </Link>
      </div>
      <div className="flex-1"></div>
      <article className="flex flex-col gap-3">
        <h1 className={styles.title}>{name}</h1>
        <p className="description">{description}</p>
      </article>
    </div>
  )
}

export default Social
