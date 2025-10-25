import React from "react"

import Questions from "./components/questions"

const FAQ = () => {
  return (
    <div className="flex items-center mb-10">
      <div className="flex-1">
        <Questions />
      </div>
      <div className="flex-1"></div>
    </div>
  )
}

export default FAQ
