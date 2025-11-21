import { Marquee } from "@/components/ui/marquee"

interface ISkillsProps {
  className?: string
  content: string[]
  duration: string
  is_shadowed?: boolean
  is_vertical?: boolean
  is_reverse?: boolean
}

/**
 * A component that displays a list of skills in a marquee.
 *
 * @param {ISkillsProps} props - The props object.
 * @param {string} [props.className] - The className for the component.
 * @param {string[]} props.content - The list of skills to display.
 * @param {string} [props.duration] - The duration of the animation in CSS format. Defaults to "[--duration:80s]".
 * @param {boolean} [props.is_shadowed] - Whether to display a shadow effect. Defaults to true.
 * @param {boolean} [props.is_vertical] - Whether to display the marquee vertically. Defaults to false.
 * @param {boolean} [props.is_reverse] - Whether to reverse the direction of the marquee. Defaults to false.
 */
function Skills({
  className,
  content: content,
  duration = "[--duration:80s]",
  is_shadowed = true,
  is_vertical = false,
  is_reverse = false,
}: ISkillsProps) {
  return (
    <div className={className}>
      <Marquee reverse={is_reverse} vertical={is_vertical} className={duration}>
        {content.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-5 ${is_vertical ? "[writing-mode:vertical-rl]" : ""}`}
          >
            <p className="text-xl text-[#6F6F6F] uppercase tracking-widest whitespace-nowrap flex items-center">
              {skill}
            </p>
            <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
          </div>
        ))}
      </Marquee>
      {is_shadowed && is_vertical && (
        <>
          <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
        </>
      )}
      {is_shadowed && !is_vertical && (
        <>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </>
      )}
    </div>
  )
}

export default Skills
