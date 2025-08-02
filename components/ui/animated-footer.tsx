"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Instagram, Youtube, PhoneIcon as Whatsapp } from "lucide-react" // Added imports for social media icons

interface FooterProps {
  copyrightText: string
  barCount?: number
}

const Footer: React.FC<FooterProps> = ({ copyrightText, barCount = 23 }) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([])
  const footerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    if (footerRef.current) {
      observer.observe(footerRef.current)
    }
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    let t = 0
    const animateWave = () => {
      const waveElements = waveRefs.current
      let offset = 0
      waveElements.forEach((element, index) => {
        if (element) {
          offset += Math.max(0, 20 * Math.sin((t + index) * 0.3))
          element.style.transform = `translateY(${index + offset}px)`
        }
      })
      t += 0.1
      animationFrameRef.current = requestAnimationFrame(animateWave)
    }
    if (isVisible) {
      animateWave()
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isVisible])

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white relative flex flex-col w-full h-full justify-between select-none"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between w-full gap-4 px-4 pb-0 pt-0 items-center">
        <div className="space-y-2 text-center">
          <p className="text-sm">{copyrightText}</p>
        </div>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://www.instagram.com/taher_max_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
              aria-label="WhatsApp"
            >
              <Whatsapp className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>
      <div id="waveContainer" aria-hidden="true" style={{ overflow: "hidden", height: 200 }}>
        <div style={{ marginTop: 0 }}>
          {Array.from({ length: barCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                waveRefs.current[index] = el
              }}
              className="wave-segment"
              style={{
                height: `${index + 1}px`,
                backgroundColor: "rgb(255, 255, 255)",
                transition: "transform 0.1s ease",
                willChange: "transform",
                marginTop: "0px", // Adjusted to 0
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
