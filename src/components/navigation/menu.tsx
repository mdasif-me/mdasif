"use client"

import Link from "next/link"
import { useIsActivePath } from "@/utils"

import styles from "@/styles/navigation.module.css"

import { TMenus } from "../types"

export const Menu = ({ menu }: { menu: TMenus }) => {
  const isActive = useIsActivePath(menu.href)
  return (
    <Link
      className={`${styles.menu_button} ${isActive ? "cursor-default" : "cursor-pointer"} group`}
      href={menu.href}
    >
      <li
        className={`${isActive ? styles.active : styles.menu} transition-all ease-out duration-300 group-hover:!text-[#A7BEB466]`}
      >
        {menu.name}
      </li>
    </Link>
  )
}
