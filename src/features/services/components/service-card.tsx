import { useEffect, useRef } from "react"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

interface ServiceCardProps {
  icon: IconSvgElement
  title: string
  description: string
  index: number
  gsapLoaded?: boolean
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  index,
  gsapLoaded,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const card = cardRef.current
    const content = contentRef.current

    if (!card || !content || !window.gsap || !gsapLoaded) return

    // hover animations
    const handleMouseEnter = () => {
      window.gsap.to(card, {
        scale: 1.02,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      })

      window.gsap.to(content, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      window.gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      window.gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [index, gsapLoaded])

  return (
    <div ref={cardRef} className="relative group cursor-default">
      <div className="relative border border-[#27272766] rounded-2xl p-6 h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div ref={contentRef} className="relative z-10">
          <div className="mb-4 relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <HugeiconsIcon
                icon={Icon}
                className="w-7 h-7 text-primary-foreground"
                strokeWidth={2}
              />
            </div>

            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="description leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
