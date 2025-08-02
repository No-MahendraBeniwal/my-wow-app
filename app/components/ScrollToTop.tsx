"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Use requestAnimationFrame to ensure the scroll happens after the page has rendered
    // This helps prevent the visible jump
    const scrollToTop = () => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant", // Use instant instead of smooth to prevent visible scrolling
        })
      })
    }

    scrollToTop()
  }, [pathname])

  return null
}
