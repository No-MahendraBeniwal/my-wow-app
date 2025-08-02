"use client";

import { cn } from "@/lib/utils";
import { TestimonialCard, type TestimonialAuthor } from "@/components/ui/testimonial-card";
import { useEffect, useRef, useCallback } from "react";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const speed = 1.4; // px / frame  (≈ 40 s loop on 1440 px list)

  const animate = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const oneWidth = track.dataset.width ? Number(track.dataset.width) : 0;
    offsetRef.current -= speed;
    if (Math.abs(offsetRef.current) >= oneWidth) offsetRef.current += oneWidth;
    track.style.transform = `translateX(${offsetRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const start = useCallback(() => {
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // clone once (we already have two copies in the markup)
    const measure = () => {
      const list = track.querySelector("div");
      if (!list) return;
      const w = list.offsetWidth;
      track.dataset.width = String(w);
      offsetRef.current = 0;
    };
    measure();
    start();
    return stop;
  }, [testimonials, start, stop]);

  /* ---------- render ---------- */
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-0",
        className
      )}
    >
      <div className="w-full flex flex-col items-center gap-4 text-center sm:gap-16">
        <div className="w-full flex flex-col items-center gap-4 sm:gap-8">
          <h2 className="w-full text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight px-4">{title}</h2>
          <p className="w-full text-md font-medium text-muted-foreground sm:text-xl px-4">{description}</p>
        </div>

        {/* overflow wrapper */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="group inline-flex p-2 [--gap:1rem] [gap:var(--gap)]"
            style={{ willChange: "transform" }}
            onMouseEnter={stop}
            onMouseLeave={start}
            onTouchStart={stop}
            onTouchEnd={start}
          >
            {/* original list */}
            <div className="flex shrink-0 [gap:var(--gap)] flex-row">
              {testimonials.map((t, i) => {
                // Create a unique key using index and a prefix
                const uniqueKey = `set-1-${i}-${t.author.name}-${t.text.substring(0, 20)}`;
                return <TestimonialCard key={uniqueKey} {...t} />;
              })}
            </div>
            {/* duplicate for seamless join */}
            <div className="flex shrink-0 [gap:var(--gap)] flex-row">
              {testimonials.map((t, i) => {
                // Create a different unique key for the duplicate set
                const uniqueKey = `set-2-${i}-${t.author.name}-${t.text.substring(0, 20)}`;
                return <TestimonialCard key={uniqueKey} {...t} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}