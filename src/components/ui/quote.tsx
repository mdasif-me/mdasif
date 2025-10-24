import { ArrowRight02Icon } from "@hugeicons-pro/core-stroke-standard"
import { HugeiconsIcon } from "@hugeicons/react"

interface IQuoteProps {
  text?: string
  onClick?: () => void
  className?: string
  iconColor?: string
  isWrapper?: boolean
  isBordered?: boolean
  isBackground?: boolean
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
 * @returns {JSX.Element} The Quote component.
 */
/** */
const Quote = ({
  text = "GET A QUOTE",
  onClick,
  className = "",
  disabled = false,
  isWrapper = false,
  isBordered = false,
  isBackground = false,
  iconColor = `${isBordered ? "rgba(225, 234, 229, 0.5)" : "#0F0F0F"}`,
}: IQuoteProps) => {
  return (
    <div className={`quote_container ${className}`}>
      <div
        className={`${isWrapper ? "quote_wrapper" : "quote_wrapper_without_border"} cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={disabled ? undefined : onClick}
      >
        <button
          className={`${isBordered ? "quote_circle_bordered" : isBackground ? "quote_circle !bg-[#E1EAE5]" : "quote_circle"} cursor-pointer`}
          disabled={disabled}
        >
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            className="quote_arrow"
            strokeWidth={2}
            color={iconColor}
          />
        </button>
      </div>
      <p
        className={`${isBordered || isBackground ? "!text-[#F3F6F5] quote_text !pt-6" : "quote_text"} `}
      >
        {text}
      </p>
    </div>
  )
}

export default Quote
