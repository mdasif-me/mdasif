"use client"

import { usePathname } from "next/navigation"

export const useIsActivePath = (path: string): boolean => {
  const pathname = usePathname()
  return pathname === path
}
