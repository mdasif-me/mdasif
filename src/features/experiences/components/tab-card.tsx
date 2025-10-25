import styles from "../styles/experience.module.css"

const TabCard = ({ content, title }: { content: string; title: string }) => {
  return (
    <div className={`${styles.card} h-full`}>
      <h1 className="title">{title}</h1>
      <p className="description">{content}</p>
    </div>
  )
}

export default TabCard
