"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface AboutModalProps {
  onClose: () => void
}

export function AboutModal({ onClose }: AboutModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl max-h-[90vh] rounded-[32px] bg-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white pt-6 px-6 md:px-8 rounded-t-[32px]">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="absolute left-6 md:left-6 top-6 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Title */}
          <div className="mb-6 mt-4 flex flex-col items-center">
            <motion.h2 initial={{ y: -20 }} animate={{ y: 0 }} className="text-4xl font-bold tracking-tight text-black">
              About
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.2 }}
              className="mt-0.5 h-1 bg-orange-400"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 md:px-8 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Profile Image */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-6 w-full max-w-[350px] overflow-hidden rounded-[24px]"
          >
            <Image
              src="/placeholder.svg?height=350&width=350"
              alt="Profile"
              width={350}
              height={350}
              className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </motion.div>

          {/* Name and Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-center"
          >
            <h3 className="mb-2 text-3xl font-bold text-black">Bhanwara Ram Jat</h3>
            <p className="text-xl text-gray-600">CEO & Founder</p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-xl leading-relaxed text-gray-800">
              Established in 2003, Wow Graphics has grown to become a leading name in printing and graphic design solutions in Jodhpur, Rajasthan. From our humble beginnings, we've remained committed to transforming ideas into vibrant, high-quality prints that make a lasting impression. We pride ourselves on building strong relationships with our clients, understanding their unique needs, and delivering results that consistently exceed expectations. Our journey is defined by innovation, precision, and an unwavering dedication to customer satisfaction.
            </p>
          </motion.div>

          {/* Additional Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <h4 className="text-2xl font-semibold mb-4 text-black">Our Mission</h4>
            <p className="text-lg leading-relaxed text-gray-800">
              Our mission at Wow Graphics is to empower businesses and individuals with exceptional visual communication. We strive to be the premier partner for all printing and design needs in Jodhpur, by consistently delivering superior quality, innovative solutions, and unparalleled customer service. We aim to bring every client's vision to life with precision, creativity, and efficiency, contributing to their success.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <h4 className="text-2xl font-semibold mb-4 text-black">Our Vision</h4>
            <p className="text-lg leading-relaxed text-gray-800">
              We envision a future where Wow Graphics is synonymous with innovative and reliable printing across Rajasthan and beyond. We aim to continuously evolve with cutting-edge technology and sustainable practices, setting new benchmarks in quality and service. Our vision is to be the trusted creative and printing hub that helps every client achieve their marketing and branding aspirations with impactful and visually stunning results.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
