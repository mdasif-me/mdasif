import { ArrowRight02Icon } from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

interface IQuoteProps {
  text?: string
  onClick?: () => void
  className?: string
  iconColor?: string
  isWrapper?: boolean
  isBordered?: boolean
  isBackground?: boolean
  isText?: boolean
  disabled?: boolean
}

/**
 * A Quote component that displays a quote and an arrow icon.
 * @param {string} text - The text to be displayed.
 * @param {function} onClick - The function to be called when the quote is clicked.
 * @param {string} className - The className to be applied to the quote container.
 * @param {string} iconColor - The color of the arrow icon.
 * @param {boolean} disabled - Whether the quote is disabled or not.
 * @param {boolean} isWrapper - Whether the quote is wrapped in a container or not.
 * @param {boolean} isBordered - Whether the background of the quote is bordered or not.
 * @param {boolean} isBackground - Whether the background of the quote is filled or not.
 * @param {boolean} isText - Whether the text of the quote is displayed or not.
 * @returns {JSX.Element} The Quote component.
 */
const Quote = ({
  text = "GET A QUOTE",
  onClick,
  className,
  disabled = false,
  isWrapper = false,
  isBordered = false,
  isBackground = false,
  isText = true,
  iconColor,
}: IQuoteProps) => {
  const finalIconColor =
    iconColor ??
    (isBordered || isBackground ? "rgba(225, 234, 229, 0.5)" : "#0F0F0F")

  return (
    <div className={cn("quote_container group -ml-3", className)}>
      <div
        className={cn(
          isWrapper ? "quote_wrapper" : "quote_wrapper_without_border",
          "cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onClick={disabled ? undefined : onClick}
      >
        <button
          className={cn(
            "cursor-pointer",
            isBordered
              ? "quote_circle_bordered"
              : isBackground
                ? "quote_circle bg-[#E1EAE5]!"
                : "quote_circle"
          )}
          disabled={disabled}
          aria-label={text}
        >
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            className="quote_arrow"
            strokeWidth={2}
            color={finalIconColor}
          />
        </button>
      </div>
      {isText && (
        <p
          className={cn(
            "quote_text truncate",
            (isBordered || isBackground) && "text-[#F3F6F5]!"
          )}
        >
          {text}
        </p>
      )}
    </div>
  )
}

export default Quote
