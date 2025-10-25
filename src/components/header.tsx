import Quote from "./ui/quote"

const Header = ({
  name,
  isQuote = false,
}: {
  name: string
  isQuote?: boolean
}) => {
  return (
    <article className="flex w-full h-[100px] justify-between flex-wrap py-3 px-6 items-center rounded-xl bg-secondary-foreground">
      <p className="header-text">{name}</p>
      {isQuote && <Quote isBordered text="View All" />}
    </article>
  )
}

export default Header
