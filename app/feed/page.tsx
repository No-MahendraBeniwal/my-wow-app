"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ImageViewer } from "./image-viewer"
import { ReadModal } from "./read-modal"

interface FeedItem {
  id: number
  title: string
  image: string
  description: string
  explore_more: string
  planYourVisit: string
}

export default function FeedPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedRead, setSelectedRead] = useState<FeedItem | null>(null)

  // Array of 12 unique items for the feed grid
  const feedItems: FeedItem[] = [
    {
      id: 1,
      title: "Custom Branded T-Shirts",
      image: "/Feed-1.png",
      description: "Transform your brand into wearable art with our premium custom branded T-shirts. Utilizing advanced digital and screen-printing techniques, we ensure your logo or design appears vibrant, sharp, and durable, even after countless washes. Crafted from high-quality cotton and blended fabrics for ultimate comfort and longevity, these T-shirts are perfect for corporate uniforms, promotional giveaways, team events, or stylish merchandise. Let your message be seen and worn with pride, making a lasting impression wherever you go.",
      explore_more: "Intrigued by our custom apparel? Visit our Jodhpur office to explore a wider range of fabric samples, print finishes, and real-life examples of our diverse T-shirt and apparel projects. Discover even more ways to elevate your brand's presence!",
      planYourVisit: "...",
    },
    {
      id: 2,
      title: "Laser-Cut Signage",
      image: "/Feed-2.png",
      description: "Elevate your space with our exquisitely crafted laser-cut acrylic signage. Whether for elegant office branding, sophisticated retail displays, or intricate decorative panels, our state-of-the-art laser technology precisely cuts acrylic to any shape and design, achieving flawless edges and stunning detail. Available in various thicknesses, colors, and finishes – from clear and frosted to mirror and colored acrylic – these signs offer a modern, polished, and durable solution that adds a touch of class to any environment.",
      explore_more: "Curious about the possibilities of laser cutting? Drop by our Jodhpur office to see more intricate laser-cut designs in various materials like metal, wood, and rexine. Witness the precision firsthand and discuss your custom fabrication ideas!",
      planYourVisit: "...",
    },
    {
      id: 3,
      title: "Personalized Coffee Mugs",
      image: "/Feed-3.png",
      description: "Make every sip a branding opportunity or a cherished memory with our personalized and branded coffee mugs. Using advanced sublimation printing, we ensure your company logo, custom design, or personal message is rendered in vibrant, fade-resistant colors that stand the test of time and washing. Perfect for corporate gifting, employee appreciation, promotional campaigns, or unique souvenirs, our durable ceramic mugs offer both functionality and a powerful visual statement that resonates with your audience.",
      explore_more: "Ready to brew up your own custom mugs? Visit our Jodhpur office to browse a wider selection of mug styles, colors, and see various successful branding examples. We can help you design the perfect mug for your next promotion or special occasion!",
      planYourVisit: "...",
    },
    {
      id: 4,
      title: " LED Sign Boards",
      image: "/Feed-4.png",
      description: "Command attention day and night with our dynamic LED sign boards. Designed for maximum visibility and energy efficiency, these modern signs bring your message to life with bright, even illumination and sharp, clear graphics. Ideal for storefronts, directional signage, event promotions, or adding a contemporary touch to any facade, our LED boards are custom-built for durability and brilliant performance, ensuring your business stands out in Jodhpur's vibrant landscape.",
      explore_more: "Want to see our LED brilliance up close? Come to our Jodhpur office to experience different LED display options, discuss custom sizes, and view examples of our completed dynamic signage projects. Light up your brand with us!",
      planYourVisit: "...",
    },
    {
      id: 5,
      title: "ID Cards",
      image: "/Feed-5.png",
      description: "Enhance your organization's security and professionalism with our high-quality employee ID card printing services. We produce durable PVC ID cards with crisp, clear printing for photos, names, titles, and company logos, ensuring a polished and consistent brand image. With options for barcodes, QR codes, magnetic stripes, and various security features, our custom ID cards provide both secure identification and a professional look for your entire team.",
      explore_more: "Looking for secure and stylish ID solutions? Visit our Jodhpur office to see samples of our various ID card finishes, security features, and discuss bulk order options for your organization. We offer complete solutions for your identification needs.",
      planYourVisit: "...",
    },
    {
      id: 6,
      title: "Custom Branded Pens",
      image: "/Feed-6.png",
      description: "Keep your brand at your clients' fingertips with our custom branded promotional pens. As a timeless and highly effective marketing tool, these pens offer a practical way to ensure your logo and contact information are consistently visible. We provide a wide array of pen styles – from sleek metallic and durable plastic to eco-friendly options – all featuring precise and long-lasting printing. Perfect for giveaways, events, or corporate stationery, a branded pen serves as a constant reminder of your business.",
      explore_more: "Ready to ink a deal with custom pens? Drop by our Jodhpur office to explore our extensive catalog of promotional pens, see different branding techniques, and get personalized recommendations for your next marketing campaign.",
      planYourVisit: "...",
    },
    {
      id: 7,
      title: "Eco-Friendly Bags",
      image: "/Feed-7.png",
      description: "Champion sustainability while promoting your brand with our eco-friendly custom jute bags. Crafted from durable, natural jute fiber, these reusable bags offer a stylish and practical alternative to single-use plastics. We apply your custom designs and logos with high-quality, vibrant printing, ensuring your brand stands out while aligning with eco-conscious values. Ideal for retail, trade shows, corporate gifting, or grocery shopping, our jute bags provide a lasting and positive brand impression.",
      explore_more: "Discover more sustainable branding solutions! Visit our Jodhpur office to see our range of eco-friendly products, including various sizes and styles of jute bags, and discuss how we can help your brand go green.",
      planYourVisit: "...",
    },
    {
      id: 8,
      title: "Business Cards",
      image: "/Feed-8.png",
      description: "Make an unforgettable first impression with our premium custom business cards. Designed to perfectly embody your brand's unique identity, we offer an extensive selection of luxurious paper stocks, sophisticated finishes like matte, gloss, velvet, and spot UV, and elegant specialty features such as embossing, debossing, and foil stamping. Our commitment to precision printing ensures every detail, from crisp text to vibrant graphics, is flawlessly executed, delivering a tactile and visually stunning card that sets you apart.",
      explore_more: "Elevate your networking game! Come to our Jodhpur office to feel the quality of our premium card stocks, compare different finishes, and discuss bespoke design options that truly reflect your professional image. See the difference quality makes!",
      planYourVisit: "...",
    },
    {
      id: 9,
      title: "Personalized Photo Frames",
      image: "/Feed-9.png",
      description: "Transform cherished memories into timeless keepsakes with our personalized photo frames. We offer custom printing directly onto a variety of frame materials, including elegant wood, modern acrylic, and classic metal, ensuring your favorite photos, meaningful quotes, or custom designs are rendered with vibrant clarity and lasting durability. Ideal for unique gifts, decorative accents for your home or office, or commemorating special events, our personalized frames add a heartfelt and artistic touch to any space.",
      explore_more: "Picture more possibilities! Visit our Jodhpur office to view our full collection of frame styles, explore different customization options, and discuss how we can help you immortalize your precious moments or create unique corporate gifts.",
      planYourVisit: "...",
    },
    {
      id: 10,
      title: "Event & Hoarding Banners",
      image: "/Feed-10.png",
      description: "Ensure your message gets noticed with our vibrant large format event and hoarding banners. Engineered for maximum impact and visibility, these banners are perfect for grand openings, promotional campaigns, trade shows, or large-scale outdoor advertising. We utilize cutting-edge digital printing technology on durable, weather-resistant materials like flex and vinyl, guaranteeing sharp images, brilliant colors, and resilience against the elements. Make a powerful statement that captures attention from a distance.",
      explore_more: "Thinking big for your next event? Come to our Jodhpur office to see material samples, discuss large format printing capabilities, and review our portfolio of successful hoarding and event banner projects. Let's make your vision larger than life!",
      planYourVisit: "...",
    },
    {
      id: 11,
      title: "Elegant Corporate Mementos",
      image: "/Feed-11.png",
      description: "Celebrate milestones, acknowledge achievements, and foster loyalty with our exquisite range of elegant corporate mementos and awards. From gleaming crystal trophies and sophisticated acrylic plaques to custom-engraved metal awards, each piece is meticulously crafted to symbolize excellence and appreciation. We offer bespoke design and precision engraving or printing, ensuring every memento is a unique and prestigious token of recognition that reflects your organization's values and esteemed reputation.",
      explore_more: "Ready to honor excellence? Visit our Jodhpur office to explore our diverse collection of corporate mementos, discuss customization options, and find the perfect way to recognize your team's achievements or commemorate special occasions.",
      planYourVisit: "...",
    },
    {
      id: 12,
      title: "Custom Vinyl Stickers",
      image: "/Feed-12.png",
      description: "Make a bold statement with our durable custom vinyl stickers and decals. Perfect for branding products, decorating vehicles, personalizing gear, or enhancing promotional materials, our high-quality vinyl ensures vibrant colors, crisp lines, and exceptional durability against wear and weather. Available in any shape, size, and finish – from glossy and matte to transparent and die-cut – these stickers are designed to be long-lasting and make an immediate visual impact wherever they are applied.",
      explore_more: "Stick with the best for your custom decals! Drop by our Jodhpur office to see samples of our durable vinyl stickers, explore different finishes and cutting options, and discuss how custom stickers can boost your brand's visibility.",
      planYourVisit: "...",
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative flex items-center justify-center">
            <Link
              href="/"
              className="absolute left-2 top-2 flex items-center justify-center rounded-full p-2 bg-white transition-transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 text-black" /> {/* here there was an hover:text-white and upside hover:bg-gray-800 */}
            </Link>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold tracking-tight text-white">Feed</h1>
              <div className="h-1 w-24 bg-orange-400 mt-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Grid - Adjusted padding-top to account for fixed header */}
      <div className="max-w-6xl mx-auto px-4 pt-32 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                setSelectedImage(item.image)
              }}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
              <button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-8 bg-white text-black hover:bg-gray-100 py-2 text-sm font-medium shadow-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedRead(item)
                }}
              >
                Read
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <ImageViewer
          src={selectedImage || "/placeholder.svg"}
          alt="Selected image"
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Read Modal */}
      {selectedRead && (
        <ReadModal
          image={selectedRead.image}
          title={selectedRead.title}
          description={selectedRead.description}
          explore_more={selectedRead.explore_more}
          planYourVisit={selectedRead.planYourVisit}
          onClose={() => setSelectedRead(null)}
        />
      )}
    </div>
  )
}
