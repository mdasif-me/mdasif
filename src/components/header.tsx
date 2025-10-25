const Header = ({ name }: { name: string }) => {
  return (
    <article className="flex w-full h-[100px] py-3 px-6 items-center rounded-xl bg-secondary-foreground">
      <p className="header-text">{name}</p>
    </article>
  )
}

export default Header
