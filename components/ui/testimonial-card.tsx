import { cn } from "@/lib/utils"
import { Clock, Shield, Zap, Users, Leaf, Headset } from "lucide-react"
import { GlowCard } from "@/components/ui/spotlight-card" // Import GlowCard

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

function getServiceIcon(serviceName: string) {
  switch (serviceName) {
    case "Expert Guidance":
      return <Users className="h-6 w-6 text-white" />
    case "Customer Satisfaction":
      return <Shield className="h-6 w-6 text-white" />
    case "Cutting-Edge Tech":
      return <Zap className="h-6 w-6 text-white" />
    case "Timely Delivery":
      return <Clock className="h-6 w-6 text-white" />
    case "24/7 Support":
      return <Headset className="h-6 w-6 text-white" />
    case "Superior Quality":
      return <Leaf className="h-6 w-6 text-white" />
    default:
      return <Users className="h-6 w-6 text-white" />
  }
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "div"

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "relative flex flex-col", // Removed rounded-lg, bg-gray-800, p-4, gap-4, shadow, backdrop-filter
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className,
      )}
    >
      <GlowCard glowColor="orange" customSize={true} className="h-full w-full">
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 bg-transparent">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
              {getServiceIcon(author.name)}
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-md font-semibold leading-none">{author.name}</h3>
            </div>
          </div>
          <p className="sm:text-md mt-4 text-sm text-muted-foreground">{text}</p>
        </div>
      </GlowCard>
    </Card>
  )
}
