"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface ReadModalProps {
  image: string
  title: string
  description: string
  explore_more: string
  planYourVisit: string
  onClose: () => void
}

export function ReadModal({ image, title, description, explore_more, planYourVisit, onClose }: ReadModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative w-full max-w-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-h-[90vh] rounded-[32px] bg-white overflow-hidden"
        >
          {/* Fixed Header */}
          <div className="sticky top-0 z-10 bg-white pt-6 px-6 md:px-8 rounded-t-[32px]">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="absolute left-6 md:left-8 top-6 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105" 
            >
            <ArrowLeft className="h-5 w-5" /> {/* here h-5 and w-5 are the size of the arrow icon and the upper given h-9 and w-9 are the size of the button */}
            </button>

            {/* Title */}
            <div className="mb-6 mt-11 flex flex-col items-center justify-center"> {/* mb-6 is the margin bottom (space between the title and the image) and mt-11 (changed from 4 to 8) is the margin top (space between the back button and the title) */}
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold tracking-tight text-black text-center"
              > {/* text-3xl is the size of the title */}
                {title}
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ delay: 0.2 }}
                className="mt-0.5 h-1 bg-orange-400"
              /> {/* mt-0.5 is the margin top (space between the title and the underline) of the underline and the h-1 is the height of the underline */}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 md:px-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Image */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-6 w-full max-w-[400px] overflow-hidden rounded-[24px]"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform hover:scale-105 duration-300"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-xl leading-relaxed text-black">{description}</p> {/* text-xl is the size of the description */}
            </motion.div>

            {/* Additional Content (if needed) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <h4 className="text-2xl font-semibold mb-4 text-black">Explore More</h4> {/* text-2xl is the size of the heading */}
              <p className="text-lg leading-relaxed text-black">{explore_more}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <h4 className="text-2xl font-semibold mb-4 text-black">Visit Our Office</h4> {/* text-2xl is the size of the heading */}
              <p className="text-lg leading-relaxed text-black">{planYourVisit}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
