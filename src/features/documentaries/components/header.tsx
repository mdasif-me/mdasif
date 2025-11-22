import { useCallback, useEffect, useRef, useState } from "react"
import {
  EyeIcon,
  ThumbsDownIcon as ThumbsDownIconFilled,
  ThumbsUpIcon as ThumbsUpIconFilled,
} from "@hugeicons-pro/core-solid-rounded"
import {
  ArrowLeftIcon,
  FacebookIcon,
  LinkedinIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TwitterIcon,
} from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"

import { Badge } from "../../../components/ui/badge"
import { IEngagementStats } from "../interface"

interface BlogHeaderProps {
  category: string
  title: string
  badge: string
  publishedDate: string
  views: number
  onBack: () => void
  engagementStats: IEngagementStats
  onEngagement: (type: "like" | "dislike") => void
}

export const Header = ({
  category,
  title,
  publishedDate,
  badge,
  views,
  onBack,
  engagementStats,
  onEngagement,
}: BlogHeaderProps) => {
  const [isVerified, setIsVerified] = useState(false)
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 })
  const [userAnswer, setUserAnswer] = useState("")
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [pendingAction, setPendingAction] = useState<"like" | "dislike" | null>(
    null
  )

  const captchaInputRef = useRef<HTMLInputElement>(null)
  const captchaModalRef = useRef<HTMLDivElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const date = new Date(publishedDate)
  if (isNaN(date.getTime())) {
    console.error("Invalid date provided:", publishedDate)
    // Handle error appropriately
  }
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptcha({
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
    })
    setUserAnswer("")
  }

  const handleEngagementClick = (type: "like" | "dislike") => {
    if (isVerified) {
      onEngagement(type)
    } else {
      setPendingAction(type)
      generateCaptcha()
      setShowCaptcha(true)
    }
  }

  const closeCaptcha = useCallback(() => {
    setShowCaptcha(false)
    setPendingAction(null)
    setUserAnswer("")
  }, [])

  const handleCaptchaSubmit = () => {
    if (parseInt(userAnswer) === captcha.answer) {
      setIsVerified(true)
      setShowCaptcha(false)
      if (pendingAction) {
        onEngagement(pendingAction)
        setPendingAction(null)
      }
    } else {
      alert("Incorrect answer, please try again.")
      generateCaptcha()
    }
  }

  // Auto-focus input when CAPTCHA opens
  useEffect(() => {
    if (showCaptcha && captchaInputRef.current) {
      captchaInputRef.current.focus()
    }
  }, [showCaptcha])

  // Focus trap implementation
  useEffect(() => {
    if (!showCaptcha) return

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      const focusableElements = [
        captchaInputRef.current,
        submitButtonRef.current,
      ].filter(Boolean) as HTMLElement[]

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener("keydown", handleTabKey)
    return () => document.removeEventListener("keydown", handleTabKey)
  }, [showCaptcha])

  // Escape key handler
  useEffect(() => {
    if (!showCaptcha) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCaptcha()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [showCaptcha, closeCaptcha])

  // Click outside handler
  useEffect(() => {
    if (!showCaptcha) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        captchaModalRef.current &&
        !captchaModalRef.current.contains(e.target as Node)
      ) {
        closeCaptcha()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCaptcha, closeCaptcha])

  // Share functionality
  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""
    const shareText = `Check out this documentary: ${title}`

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
        break
    }

    if (shareUrl) {
      if (typeof window !== "undefined") {
        window.open(
          shareUrl,
          "_blank",
          "noopener,noreferrer,width=600,height=400"
        )
      }
    }
  }

  return (
    <header className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onBack}>
            <HugeiconsIcon icon={ArrowLeftIcon} />
            Back
          </Button>
          <span className="ml-2 flex items-center gap-1 text-sm text-muted-foreground">
            <HugeiconsIcon icon={EyeIcon} className="h-4 w-4" /> {views} views
          </span>
        </div>
        <div className="relative flex items-center gap-4">
          <Badge variant="default" className="font-thin">
            {category}
          </Badge>

          <button
            onClick={() => handleEngagementClick("like")}
            className="gap-2 flex items-center"
            aria-label={`Like this documentary. Current likes: ${engagementStats.stats.likes}`}
          >
            {engagementStats.userEngagement === "like" ? (
              <HugeiconsIcon icon={ThumbsUpIconFilled} className="h-4 w-4" />
            ) : (
              <HugeiconsIcon icon={ThumbsUpIcon} className="h-4 w-4" />
            )}
            {engagementStats.stats.likes}
          </button>
          <button
            onClick={() => handleEngagementClick("dislike")}
            className="gap-2 flex items-center"
            aria-label={`Dislike this documentary. Current dislikes: ${engagementStats.stats.dislikes}`}
          >
            {engagementStats.userEngagement === "dislike" ? (
              <HugeiconsIcon icon={ThumbsDownIconFilled} className="h-4 w-4" />
            ) : (
              <HugeiconsIcon
                icon={ThumbsDownIcon}
                className="h-4 w-4 text-red-600"
              />
            )}
            {engagementStats.stats.dislikes}
          </button>

          {showCaptcha && (
            <div
              ref={captchaModalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="captcha-title"
              className="bg-secondary-foreground border-border/10 absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border p-4 shadow-2xl"
            >
              <p
                id="captcha-title"
                className="text-foreground mb-2 text-sm font-medium"
              >
                Verify you are human
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {captcha.question} =
                </span>
                <input
                  ref={captchaInputRef}
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCaptchaSubmit()}
                  className="border-border/10 focus:border-primary w-16 rounded-md border p-1 text-center text-sm outline-none"
                  aria-label="Enter the answer to the math question"
                />
                <Button
                  ref={submitButtonRef}
                  size="sm"
                  onClick={handleCaptchaSubmit}
                >
                  OK
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h1 className="gradient-text normal-case! text-4xl! leading-15! font-bold! tracking-tight! md:text-4xl! lg:text-5xl!">
        {title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <p className="text-muted-foreground text-sm">{formattedDate}</p>
            <Badge variant="default" className="font-thin">
              {badge}
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
            Share this
          </span>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            onClick={() => handleShare("twitter")}
            aria-label="Share on Twitter"
          >
            <HugeiconsIcon icon={TwitterIcon} className="size-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            onClick={() => handleShare("facebook")}
            aria-label="Share on Facebook"
          >
            <HugeiconsIcon icon={FacebookIcon} className="size-5" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full"
            onClick={() => handleShare("linkedin")}
            aria-label="Share on LinkedIn"
          >
            <HugeiconsIcon icon={LinkedinIcon} className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
