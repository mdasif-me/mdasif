import Quote from "./ui/quote"

const Header = ({
  name,
  isQuote = false,
}: {
  name: string
  isQuote?: boolean
}) => {
  return (
    <article className="flex w-full md:min-h-[100px] h-fit justify-between flex-wrap md:py-3 py-6 px-6 items-center rounded-xl bg-secondary-foreground">
      <p className="header-text">{name}</p>
      {isQuote && <Quote isBordered text="View All" />}
    </article>
  )
}

export default Header
