"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useGesture } from "@use-gesture/react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageViewerProps {
  src: string
  alt: string
  onClose: () => void
}

export function ImageViewer({ src, alt, onClose }: ImageViewerProps) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const bind = useGesture(
    {
      onDrag: ({ offset: [x, y] }) => {
        setPosition({ x, y })
      },
      onPinch: ({ offset: [d] }) => {
        setScale(Math.min(Math.max(1, d / 200 + 1), 4))
      },
      onDoubleClick: () => {
        setScale(scale === 1 ? 2 : 1)
        setPosition({ x: 0, y: 0 })
      },
    },
    {
      drag: {
        from: () => [position.x, position.y],
      },
    },
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <button
        onClick={onClose}
        className="absolute left-6 md:left-8 top-6 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105" 
      >
      <ArrowLeft className="h-5 w-5 text-black" /> {/* here h-5 and w-5 are the size of the arrow icon and the upper given h-9 and w-9 are the size of the button */}
      </button>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden" {...bind()} style={{ touchAction: 'none' }}>
        <motion.img
          src={src}
          alt={alt}
          style={{
            scale,
            x: position.x,
            y: position.y,
          }}
          className="max-h-[85vh] w-auto object-contain"
          draggable={false}
        />
      </div>
    </motion.div>
  )
}
