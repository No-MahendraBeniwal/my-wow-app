"use client"

import { useState, useRef } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Typewriter } from "@/components/ui/typewriter"
{/*import { FallingTextDemo } from "@/components/ui/falling-text-demo"*/}
import { ParticleButton } from "@/components/ui/particle-button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { TestimonialCarousel, type Testimonial } from "@/components/ui/testimonial"
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"
import { StarBorder } from "@/components/ui/star-border"
import { Quote } from "@/components/ui/demo"
import AnimatedFooter from "@/components/ui/animated-footer"
import { HandWrittenTitle } from "@/components/ui/hand-writing-text"
import { AboutModal } from "./components/about-modal"
import AnimatedGlowBox from "@/components/ui/animated-glow-box"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const hoverScale: { [key: string]: any } = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
}

interface ImageWithHoverProps {
  src: string;
  alt: string;
  className: string;
  children?: React.ReactNode;
  priority?: boolean;
}

const ImageWithHover = ({
  src,
  alt,
  className,
  children,
  priority = false,
  ...props
}: ImageWithHoverProps) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <motion.div
      animate={isActive ? { scale: 1.05 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      className={`relative ${className}`} // Ensure relative positioning for Image fill
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill // Use fill prop
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={priority}
        {...props}
      />
      {children}
    </motion.div>
  )
}

const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Unrivaled Quality",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "At Wow Graphics, quality is our foundation. We use the finest materials and state-of-the-art printing and laser cutting to ensure every product delivers exceptional clarity, vibrant colors, and superior durability. Your vision, perfectly realized.",
  },
  {
    id: 2,
    name: "Customer-First",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Your satisfaction drives us. Our team listens to your needs, offers personalized advice, and provides seamless support from concept to delivery. We're not just printing; we're partnering with you for your perfect outcome.",
  },
  {
    id: 3,
    name: "Prompt Delivery",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "We get that deadlines are crucial. That's why Wow Graphics prioritizes efficient workflows to ensure your orders are not only precise but also delivered promptly and reliably, every time. Get your prints when you need them, without compromise.",
  },
  {
    id: 4,
    name: "Advanced Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "To stay ahead, we embrace innovation. We constantly invest in the latest digital printing presses, high-precision laser cutting machines, and advanced design software. This commitment to technology lets us offer superior results, handle complex projects, and provide solutions that truly stand out.",
  },
  {
    id: 5,
    name: "Great Service",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "Wow Graphics is your single-stop solution for all printing and design needs. We offer an all-encompassing suite of services, from large-format banners and laser-cut designs to corporate gifts and office stationery, serving individuals, small businesses, and large corporations alike.",
  },
  {
    id: 6,
    name: "Exceptional Value",
    avatar: "/placeholder.svg?height=100&width=100",
    description: "At Wow Graphics, we believe in affordable quality. We offer the most competitive rates in Jodhpur without compromising on materials or service excellence. Get premium, affordable results and the best value for your investment.",
  },
]

const QUALITY_DATA = [
  {
    author: {
      name: "Expert Guidance",
      handle: "@planning",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    text: "Our seasoned team brings years of industry experience, ensuring your projects are handled with expert precision from concept to completion.",
  },
  {
    author: {
      name: "Client Satisfaction",
      handle: "@satisfaction",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    text: "Your complete satisfaction is our priority. We work closely with you to understand your needs and exceed your expectations.",
  },
  {
    author: {
      name: "Cutting-Edge Tech",
      handle: "@technology",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    text: "We leverage advanced printing and laser cutting technologies to deliver high-precision, vibrant, and efficient results.",
  },
  {
    author: {
      name: "Timely Delivery",
      handle: "@safety",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    text: "We understand deadlines. Our streamlined processes ensure your orders are completed and delivered promptly, every time.",
  },
  {
    author: {
      name: "24/7 Support",
      handle: "@support",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    text: "Our team is always ready to assist you, offering personalized guidance and quick responses to all your printing and design inquiries.",
  },
  {
    author: {
      name: "Superior Quality",
      handle: "@quality",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    text: "We ensure every product meets the highest standards of quality, using premium materials and meticulous attention to detail.",
  },
]

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)
  const modernCampRef = useRef<HTMLElement>(null)

  // Dark mode is set via the dark class on html element

  const handleScrollClick = (): void => {
    if (modernCampRef.current) {
      const startPosition = window.scrollY
      const targetPosition = modernCampRef.current.getBoundingClientRect().top + window.scrollY
      const distance = targetPosition - startPosition

      const duration = 1000
      let startTime: number | null = null

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animation = (currentTime: number): void => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + distance * easedProgress)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  // Social media links are now directly managed in the AnimatedFooter component

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black"
      > {/*For transparent background:- className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/60 backdrop-blur-md" */}
        <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {/* Enhanced logo with Link and responsive text sizing /

          <Link href="/" className="flex items-center h-12">
            <img 
              src="/image.svg" 
              alt="WoW Graphics Logo" 
              className="h-full w-auto object-contain"
              style={{ maxWidth: '225px' }}
            />
          </Link> */}
          <Link href="/" className="flex items-center h-10">
            <Image 
              src="/imagecopy.png" 
              alt="WoW Graphics Logo" 
              width={240}
              height={64}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </motion.div>
        <div className="space-x-4 flex items-center">
          <div className="flex items-center gap-3">
            <Link href="/feed" scroll={false} className="inline-flex">
              <StarBorder className="text-xs font-medium">
                Feed
              </StarBorder>
            </Link>
            <StarBorder 
              className="text-xs font-medium cursor-pointer"
              onClick={() => setShowAbout(true)}
            >
              About
            </StarBorder>
          </div>
        </div>
      </motion.nav>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* Hero Section */}
      <motion.section initial="initial" animate="animate" variants={staggerChildren} className="relative pt-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ImageWithHover
              src="/wow-first-10.png?height=600&width=800"
              alt="Modern Transport"
              className="aspect-[4/3] order-1 rounded-2xl overflow-hidden"
              priority
            />
            <motion.div variants={staggerChildren} className="space-y-6 order-2">
              <motion.h1 variants={fadeInUp} className="text-5xl font-bold leading-tight" whileHover={{ scale: 1.02 }}>
                Bringing Your{' '}
                <span className="text-yellow-400">
                  <Typewriter
                    text={["Ideas", "Work", "Lead"]}
                    speed={70}
                    waitTime={1500}
                    deleteSpeed={40}
                    loop={true}
                  />
                </span>{''}
                to Life, In Vibrant Color.
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-gray-300">
                From vivid banners to corporate gifts, we ensure unparalleled quality and timely delivery for every project.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <ParticleButton
                  className="rounded-full px-8 group relative overflow-hidden"
                  variant="default"
                  onClick={handleScrollClick}
                  successDuration={1000}
                >
                  Scroll down
                </ParticleButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Modern Camp Section */}
      <motion.section
        ref={modernCampRef}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 scroll-mt-20"
        id="modern-camp"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div variants={staggerChildren}>
              <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-4">
                {/* Comprehensive Printing Solutions */}
              </motion.h2>
              <div className="space-y-4">
                <motion.h3 variants={fadeInUp} className="text-3xl font-bold" whileHover={{ scale: 1.02 }}>
                  Complete branding solutions
                </motion.h3>
                <motion.p variants={fadeInUp} className="text-gray-300">
                  Rest assured that your project is in expert hands. We are committed to delivering excellence and ensuring your complete satisfaction.
                </motion.p>
                <div className="inline-block mx-auto">
                  <AnimatedGlowBox>
                    <HandWrittenTitle
                      title="Explore the future of designing with us"
                      className="
                        inline-flex items-center justify-center
                        py-1 px-2
                        text-sm font-medium
                        border-10
                        backdrop-filter backdrop-blur-sm
                        bg-transparent text-white
                        relative overflow-visible
                        w-full
                      "
                      titleClassName="text-sm font-medium text-center w-full"
                    />
                  </AnimatedGlowBox>
                </div>
              </div>
            </motion.div>
            <ImageWithHover
              src="/wow-second.png?height=400&width=600"
              alt="Modern Camp"
              className="aspect-[16/9] rounded-2xl overflow-hidden"
            />
          </div>
        </div>
      </motion.section>

      {/* Quote Section */}
      <Quote />

      {/* Our Core Services Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Our Core Services</h2>
          <motion.p variants={fadeInUp} className="text-gray-300 mb-8">
            We offer a range of services to help you achieve your goals.
          </motion.p>
          <motion.div variants={staggerChildren} className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Digital Printing", image: "/core-1.png" },
              { name: "Precision Laser Cutting", image: "/core-2.png" },
              { name: "Corporate Gifts & Promotions", image: "/core-3.png" }
            ].map((vehicle) => (
              <ImageWithHover
                key={vehicle.name}
                src={vehicle.image}
                alt={vehicle.name}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <motion.p className="absolute bottom-4 left-4 text-white bg-black/50 font-medium px-2 rounded-lg" whileHover={{ scale: 1.1 }}>
                  {vehicle.name}
                </motion.p>
              </ImageWithHover>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Popular Tours Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <motion.p variants={fadeInUp} className="text-gray-300 mb-8">
            Discover our most requested services and unique offerings.
          </motion.p>
          <motion.div variants={staggerChildren} className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sign Boards & Hoardings", image: "/f1.png" },
              { name: "Office & Marketing Prints", image: "/f2.png" },
              { name: "Graphic Design Services", image: "/f3.png" }
            ].map((tour) => (
              <ImageWithHover
                key={tour.name}
                src={tour.image}
                alt={tour.name}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <motion.p className="text-white bg-black/50 font-medium px-2 rounded-lg" whileHover={{ scale: 1.1 }}>
                    {tour.name}
                  </motion.p>
                  {/*<Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Small icon"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />*/}
                </div>
              </ImageWithHover>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* What Do We Do Section */}
      {/* <FallingTextDemo /> */}

      {/* Testimonials Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-16 px-6"
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-12 text-center" whileHover={{ scale: 1.02 }}>
          Reviews
        </motion.h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <motion.div
            variants={fadeInUp}
            className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-600 p-2 md:rounded-[1.5rem] md:p-3"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              movementDuration={0.2} // Adjusted for smoother and more responsive animation
            />
            <div className="testimonial-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-black shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="testimonial-content">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/M1.png?height=40&width=40"
                    alt="Mahendra Beniwal"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-white">Mahendra Beniwal</p>
                    <p className="text-sm text-gray-400">Tech Enthusiast</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  Wow Graphics team is a pleasure to work with, always understanding our vision and delivering stunning prints on time.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-600 p-2 md:rounded-[1.5rem] md:p-3"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              movementDuration={0.2} // Adjusted for smoother and more responsive animation
            />
            <div className="testimonial-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-black shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="testimonial-content">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/M2.png?height=40&width=40"
                    alt="Rajesh Gupta"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-white">Rajesh Gupta</p>
                    <p className="text-sm text-gray-400">Event Organizer</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  We rely on Wow Graphics for all our event signage and promotional materials. Their vibrant prints and quick delivery are unmatched.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-600 p-2 md:rounded-[1.5rem] md:p-3"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              movementDuration={0.2} // Adjusted for smoother and more responsive animation
            />
            <div className="testimonial-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-black shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="testimonial-content">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/M5.png?height=40&width=40"
                    alt="Aisha Khan"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-white">Aisha Khan</p>
                    <p className="text-sm text-gray-400">Entrepreneur</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  Wow Graphics has been a game-changer for our business. Their services helped us to transformed our vague ideas into professional-looking marketing materials.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-600 p-2 md:rounded-[1.5rem] md:p-3"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              movementDuration={0.2} // Adjusted for smoother and more responsive animation
            />
            <div className="testimonial-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-black shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="testimonial-content">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/M3.png?height=40&width=40"
                    alt="Vikram Singh"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-white">Vikram Singh</p>
                    <p className="text-sm text-gray-400">Institute Director</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  For all our institute's ID cards, certificates, and prospectus printing, Wow Graphics is our trusted partner. Their reliability is unmatched.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-600 p-2 md:rounded-[1.5rem] md:p-3"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              movementDuration={0.2} // Adjusted for smoother and more responsive animation
            />
            <div className="testimonial-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-black shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="testimonial-content">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/M4.png?height=40&width=40"
                    alt="Sneha Patel"
                    width={40}
                    height={40}
                    className="rounded-full flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-white">Sneha Patel</p>
                    <p className="text-sm text-gray-400">Fashion Designer</p>
                  </div>
                </div>
                <p className="testimonial-text">
                  The custom printed tags and packaging Wow Graphics created for our boutique are perfect. They truly understand branding.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-600 p-2 md:rounded-[1.5rem] md:p-3"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
              movementDuration={0.2} // Adjusted for smoother and more responsive animation
            />
            <div className="testimonial-card relative flex h-full flex-col justify-between overflow-hidden rounded-xl border-[0.75px] bg-black shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
              <div className="relative flex flex-1 flex-col justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/M6.png?height=40&width=40"
                    alt="Aditya Danga"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">Aditya Danga</p>
                    <p className="text-sm text-gray-300">Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  Needed urgent business cards and a banner for a client meeting. Wow Graphics delivered quickly and the quality was excellent.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Quality Section with Horizontal Scrolling */}
      <TestimonialsSection
        title="Our Quality"
        description="Discover what makes our services exceptional"
        testimonials={QUALITY_DATA}
        className="bg-black text-white"
      />

      {/* Why Us Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12 text-center" whileHover={{ scale: 1.02 }}>
            Why Us?
          </motion.h2>
          <TestimonialCarousel testimonials={TESTIMONIAL_DATA} className="max-w-2xl mx-auto" />
        </div>
      </motion.section>

      {/* Location Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-6 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8" whileHover={{ scale: 1.02 }}>
            Our Location
          </motion.h2>
          <motion.div variants={staggerChildren} className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4">Office Address</h3>
              <p className="text-gray-300 mb-2">Opposite Ajmer Line Ganesh Hotel, Banar Road</p>
              <p className="text-gray-300 mb-2">Jodhpur, Rajasthan 342001</p>
              <p className="text-gray-300 mb-2">India</p>
              <p className="text-300 mb-4">Phone: +91 98290 12345</p>
              <motion.div whileHover={hoverScale} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="rounded-full text-white border-white bg-transparent"
                  onClick={() => window.open('https://maps.app.goo.gl/LZDpGR9cu6gUCVV68', '_blank')}
                >
                  Get Directions
                </Button>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeInUp} className="aspect-video rounded-xl overflow-hidden" whileHover={{ scale: 1.02 }}>
              <iframe
                src="https://maps.google.com/maps?q=Wow%20Graphics,%20Opposite%20Ajmer%20Line%20Ganesh%20Hotel,%20Banar%20Road,%20Jodhpur,%20Rajasthan&hl=en&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <AnimatedFooter
        copyrightText="Wow Graphics™ 2025. All Rights Reserved"
        barCount={23}
      />
    </div>
  )
}
