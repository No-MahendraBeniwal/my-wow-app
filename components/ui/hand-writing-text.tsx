"use client"

import { cn } from "@/lib/utils"
// Removed import for GlowingEffect

interface HandWrittenTitleProps {
  title?: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle = "",
  className,
  titleClassName,
  subtitleClassName,
}: HandWrittenTitleProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Removed GlowingEffect */}
      <div className="relative text-center z-10 flex flex-col items-center justify-center">
        <h1 className={cn("text-white dark:text-white tracking-normal leading-relaxed flex items-center gap-2", titleClassName)}>
          {title}
        </h1>
        {subtitle && <p className={cn("text-white/80 dark:text-white/80", subtitleClassName)}>{subtitle}</p>}
      </div>
    </div>
  )
}

export { HandWrittenTitle }
