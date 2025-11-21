import { IQuestion } from "../interface"
import styles from "../styles/faq.module.css"

const Question = ({ question }: { question: IQuestion }) => {
  return (
    <div className="flex h-full min-h-80 bg-background rounded-2xl md:p-5 p-3 flex-col items-center justify-center gap-5 mx-auto">
      <h3 className={`${styles["gradient-text"]} text-center`}>
        {question.question}
      </h3>
      <p className="description leading-relaxed tracking-wider text-center">
        {question.answer}
      </p>
    </div>
  )
}

export default Question
