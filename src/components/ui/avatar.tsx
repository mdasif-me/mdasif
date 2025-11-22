import * as React from "react"
import Image from "next/image"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        default: "h-10 w-10",
        sm: "h-8 w-8",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

// Size mapping for Image component
const sizeMap = {
  sm: 32,
  default: 40,
  lg: 48,
} as const

// Context to pass size from Avatar to AvatarImage
const AvatarSizeContext = React.createContext<keyof typeof sizeMap>("default")

interface AvatarProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<React.ElementRef<"div">, AvatarProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizeValue = size || "default"
    return (
      <AvatarSizeContext.Provider value={sizeValue}>
        <div
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        />
      </AvatarSizeContext.Provider>
    )
  }
)
Avatar.displayName = "Avatar"

// Make alt required by removing it from optional props and requiring it explicitly
interface AvatarImageProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Image>,
    "alt" | "width" | "height"
  > {
  alt: string // Required alt prop
}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof Image>,
  AvatarImageProps
>(({ className, src, alt, ...props }, ref) => {
  const size = React.useContext(AvatarSizeContext)
  const pixelSize = sizeMap[size]

  if (!src) {
    return null
  }

  return (
    <Image
      src={src}
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      alt={alt}
      width={pixelSize}
      height={pixelSize}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<"span">,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback, AvatarImage }
