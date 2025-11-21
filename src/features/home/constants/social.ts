import {
  Facebook01Icon,
  Github01Icon,
  Linkedin01Icon,
  RedditIcon,
} from "@hugeicons-pro/core-stroke-standard"
import { IconSvgElement } from "@hugeicons/react"

export type TSocial = {
  name: string
  href: string
  label: string
  icon?: IconSvgElement
  description?: string
}
export const SOCIALS = [
  {
    name: "GitHub",
    href: "https://github.com/mdasif-me",
    label: "https://github.com/mdasif-me",
    icon: Github01Icon,
    description: "Find detailed presentations for my projects.",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mdasif-me",
    label: "https://linkedin.com/in/mdasif-me",
    icon: Linkedin01Icon,
    description: "Have a feel of my professional outlook and contributions.",
  },
  {
    name: "Reddit",
    href: "https://reddit.com/mdasif-me",
    label: "https://reddit.com/mdasif-me",
    icon: RedditIcon,
    description: "Join me in engaging discussions and sharing insights.",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/mdasif.me",
    label: "https://facebook.com/mdasif.me",
    icon: Facebook01Icon,
    description: "Experience visual snippets of my life outside code.",
  },
]
