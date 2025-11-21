"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import gsap from "gsap"

import { TSocial } from "../../features/home/constants"
import { TMenus } from "../types"

const StaggeredMenu = ({
  menus: data,
  socials,
}: {
  menus: TMenus[]
  socials?: TSocial[]
}) => {
  const menus = [
    ...data,
    { name: "Contact", href: "/contact", label: "Contact" },
  ]

  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    menuItemsRef.current = menuItemsRef.current.slice(0, menus.length)
  }, [menus.length])

  const openMenu = () => {
    if (!menuRef.current || !overlayRef.current) return

    const tl = gsap.timeline()

    tl.set(overlayRef.current, { display: "block" })
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        menuRef.current,
        {
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        menuItemsRef.current,
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )

    setIsMenuOpen(true)
  }

  // Close menu animation
  const closeMenu = () => {
    if (!menuRef.current || !overlayRef.current) return

    const tl = gsap.timeline()

    // Animate menu items out
    tl.to(menuItemsRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.2,
      ease: "power2.in",
    })
      // Slide out menu to right
      .to(
        menuRef.current,
        {
          x: "100%",
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.1"
      )
      // Hide overlay
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      .set(overlayRef.current, { display: "none" })

    setIsMenuOpen(false)
  }

  // Toggle menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  // Close menu on ESC key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      <button
        ref={toggleButtonRef}
        onClick={toggleMenu}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary active:text-primary transition-colors duration-200 cursor-pointer"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all cursor-pointer duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
            }`}
          />
        </div>
      </button>

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-background/30 backdrop-blur-xs z-40 opacity-0 hidden md:hidden"
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-[90%] h-full bg-background/70 backdrop-blur shadow-2xl z-50 transform translate-x-full md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <button
            onClick={closeMenu}
            className="p-6 rounded-md text-foreground cursor-pointer hover:text-primary transition-colors duration-200 w-fit"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Menu Items */}
          <nav className="flex-1 p-6">
            <ul className="space-y-4">
              {menus.map((item, index) => {
                const isActive = pathname === item.href

                return (
                  <li
                    key={item.name + index}
                    ref={(el) => {
                      menuItemsRef.current[index] = el
                    }}
                    aria-label={item.label}
                    className="opacity-0 group transform translate-y-8 w-fit"
                  >
                    <Link
                      href={item.href}
                      className="group relative block sm:text-[4rem] text-[3rem] font-medium text-foreground rounded-lg transition-colors duration-200 overflow-hidden"
                      onClick={closeMenu}
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                    <div
                      className={`${isActive ? "w-full" : "w-0"} group-hover:w-full h-1 bg-foreground duration-300 ease-in`}
                    />
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Menu Footer */}
          <div className="p-6">
            {socials && (
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="hover:text-foreground/70 transition-colors duration-300"
                  >
                    <span className="sr-only">{social.label}</span>
                    {social.name}
                  </Link>
                ))}
              </div>
            )}
            <div className="text-center text-foreground/30 text-sm">
              © 2022 Muhammad Asif
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StaggeredMenu
