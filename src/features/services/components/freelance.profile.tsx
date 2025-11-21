"use client"

import { CircleIcon } from "@hugeicons-pro/core-solid-rounded"
import { HugeiconsIcon } from "@hugeicons/react"

import { CONTACT_EMAIL } from "../../../../config"

function FreelanceProfile() {
  return (
    <div>
      <h3 className="text-[#A7BEB4] text-3xl font-semibold leading-12">
        Freelance
      </h3>
      <article className="my-10">
        <p className="md:text-xl leading-8 text-[#E1EAE5]">
          <span className="text-[#FFF066]">Best</span> for startups, individual
          clients, and established companies seeking the confidence that comes
          from dedicated,{" "}
          <span className="text-[#FFF066]">expert freelance</span> software
          development and modern frontend solutions for a{" "}
          <span className="text-[#FFF066]">one-time project</span>.
        </p>
      </article>
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-2 items-center gap-10 w-full">
        <div>
          <button
            type="button"
            onClick={() => (window.location.href = `mailto:${CONTACT_EMAIL}`)}
            aria-label="Send me an email"
            className={`button !w-full flex justify-center items-center mx-auto`}
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
          </button>
        </div>
        <div>
          <ul className="space-y-3">
            <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
              <HugeiconsIcon
                icon={CircleIcon}
                size={16}
                color="#6F6F6F"
                className="shrink-0 mt-[3.4px]"
              />
              <p>Custom pricing</p>
            </li>
            <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
              <HugeiconsIcon
                icon={CircleIcon}
                size={16}
                color="#6F6F6F"
                className="shrink-0 mt-[3.4px]"
              />
              <p>At least 3 revisions</p>
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-3">
            <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
              <HugeiconsIcon
                icon={CircleIcon}
                size={16}
                color="#6F6F6F"
                className="shrink-0 mt-[3.4px]"
              />
              <p>Development System</p>
            </li>
            <li className="text-[#F3F6F5] text-start flex items-start gap-2 text-base">
              <HugeiconsIcon
                icon={CircleIcon}
                size={16}
                color="#6F6F6F"
                className="shrink-0 mt-[3.4px]"
              />
              <p>Fast delivery</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FreelanceProfile
