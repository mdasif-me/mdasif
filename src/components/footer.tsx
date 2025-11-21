"use client"
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="card md:p-[50px] sm:p-[30px] py-6 px-2 w-full mt-6">
        <p className="text-center sm:text-base text-sm flex justify-center items-center w-full">
          &copy; Asif{" "}
          {currentYear > 2022 ? `2022 - ${currentYear}` : currentYear}. All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
