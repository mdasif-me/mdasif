import { useState } from "react"
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

  const date = new Date(publishedDate)
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
            className={`gap-2 flex items-center`}
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
            className={`gap-2 flex items-center`}
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
            <div className="bg-secondary-foreground border-border/10 absolute top-full right-0 z-50 mt-2 w-64 rounded-xl border p-4 shadow-2xl">
              <p className="text-foreground mb-2 text-sm font-medium">
                Verify you are human
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {captcha.question} =
                </span>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="border-border/10 focus:border-primary w-16 rounded-md border p-1 text-center text-sm outline-none"
                />
                <Button size="sm" onClick={handleCaptchaSubmit}>
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
          <Button variant="default" size="icon" className="rounded-full">
            <HugeiconsIcon icon={TwitterIcon} size={20} className="size-5" />
          </Button>
          <Button variant="default" size="icon" className="rounded-full">
            <HugeiconsIcon icon={FacebookIcon} size={20} className="size-5" />
          </Button>
          <Button variant="default" size="icon" className="rounded-full">
            <HugeiconsIcon icon={LinkedinIcon} size={20} className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
