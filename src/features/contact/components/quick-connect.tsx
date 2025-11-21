"use client"

import Footer from "@/components/footer"

import { CONTACT_EMAIL, CONTACT_PHONE } from "../../../../config"
import styles from "../styles/contact.module.css"

const QuickConnect = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="card p-6 w-full h-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="space-y-12 w-full">
              <article className="text-center space-y-2">
                <h1 className={styles.header}>{`Let's work together`}</h1>
                <p className="description text-xl!">{`Let’s make magic together!`}</p>
              </article>
              <div className="flex justify-center">
                <div className="md:space-y-9 space-y-3 w-auto flex gap-1 sm:flex-col flex-row">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label="Send me an email"
                    className={`button w-full md:min-w-96 flex justify-center items-center mx-auto`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <g clipPath="url(#clip0_5132_1826)">
                        <path
                          d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                          fill="#DCE5E1"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_5132_1826">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Email me</p>
                  </a>
                  <button
                    className={`bg-[#0F0F0F]! button w-full md:min-w-96 flex justify-center items-center mx-auto`}
                    type="button"
                    aria-label="Contact me on WhatsApp"
                    onClick={() => {
                      const cleanPhone = CONTACT_PHONE.replace(/\D/g, "")
                      window.location.href = `https://wa.me/${cleanPhone}`
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"
                        fill="#DCE5E1"
                      />
                    </svg>
                    <p>Call me</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default QuickConnect
