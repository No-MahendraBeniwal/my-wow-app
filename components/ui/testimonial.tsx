"use client"

import * as React from "react"

import { motion, type PanInfo } from "framer-motion"

import { cn } from "@/lib/utils"

interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, showArrows = true, showDots = true, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (Math.abs(info.offset.x) > 50) {
        // Threshold for a significant drag
        setExitX(info.offset.x)
        setTimeout(() => {
          if (info.offset.x < 0) {
            // Dragged left, go to next
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          } else {
            // Dragged right, go to previous
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
          }
          setExitX(0)
        }, 200)
      } else {
        setExitX(0) // Snap back if drag not significant
      }
    }

    const goToNext = () => {
      setExitX(-200) // Simulate a left drag
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setExitX(0)
      }, 200)
    }

    const goToPrev = () => {
      setExitX(200) // Simulate a right drag
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        setExitX(0)
      }, 200)
    }

    return (
      <div ref={ref} className={cn("h-72 w-full flex items-center justify-center", className)} {...props}>
        <div className="relative w-80 h-64">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard = index === (currentIndex + 1) % testimonials.length
            const isNextCard = index === (currentIndex + 2) % testimonials.length
            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing border-white border-[0.5px]",
                  "bg-black shadow-xl",
                  "dark:bg-black dark:shadow-[2px_2px_4px_rgba(0,0,0,0.4),-1px_-1px_3px_rgba(255,255,255,0.1)]",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4">
                    <span
                      className="text-2xl select-none cursor-pointer text-white hover:text-gray-300"
                      onClick={goToPrev}
                    >
                      &larr;
                    </span>
                    <span
                      className="text-2xl select-none cursor-pointer text-white hover:text-gray-300"
                      onClick={goToNext}
                    >
                      &rarr;
                    </span>
                  </div>
                )}
                <div className="p-6 flex flex-col items-center gap-4">
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-center text-sm text-gray-400">
                    {testimonial.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex ? "bg-white" : "bg-gray-500",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial }
