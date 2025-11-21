import QuestionForm from "./components/form"
import Questions from "./components/questions"

const FAQ = () => {
  return (
    <div className="flex xl:flex-row gap-5 flex-col items-stretch mb-10">
      <div className="flex-1">
        <Questions />
      </div>
      <div className="flex-1">
        <QuestionForm />
      </div>
    </div>
  )
}

export default FAQ
