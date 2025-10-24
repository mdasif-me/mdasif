import styles from "@/styles/home.module.css"

import { headline, subtitle, title } from "./constants"

const AnimatedTitle = () => {
  return (
    <article className={styles.animated_wrapper}>
      <h1 className={`${styles.animated_headline}`}>{headline}</h1>
      <h1 className={`${styles.animated_title}`}>{title}</h1>
      <h1 className={`${styles.animated_subtitle}`}>{subtitle}</h1>
    </article>
  )
}

export default AnimatedTitle
