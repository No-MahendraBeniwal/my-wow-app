"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ForwardedRef } from "react"

const openGoogleMapsDirections = (address: string) => {
  const encodedAddress = encodeURIComponent(address)
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost"
  address?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  type = "button",
  variant = "default",
  address,
  onClick,
  ...props
}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (address) {
      e.preventDefault()
      openGoogleMapsDirections(address)
    }
    onClick?.(e)
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center py-1.5 px-4 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full border border-transparent backdrop-filter backdrop-blur-sm shadow-lg",
        variant === "default" && "bg-white text-black hover:bg-gray-100",
        variant === "secondary" && "bg-secondary/80 text-black hover:bg-secondary",
        variant === "outline" &&
          "border-white text-white bg-transparent hover:border-gray-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
        variant === "ghost" && "hover:bg-accent hover:text-black",
        className,
      )}
      type={type}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export { Button }
