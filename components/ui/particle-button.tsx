"use client" 

import * as React from "react"
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { MousePointerClick } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  address?: string;
}

interface ParticleButtonProps extends Omit<ButtonProps, 'onClick'> {
  onSuccess?: () => void;
  successDuration?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

function SuccessParticles({
    buttonRef,
}: {
    buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
        <AnimatePresence>
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg"
                    style={{ 
                        left: centerX, 
                        top: centerY,
                        boxShadow: '0 0 10px rgba(192, 132, 252, 0.8)'
                    }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                        opacity: 0.8
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
                        y: [0, -Math.random() * 50 - 20],
                        opacity: [0.8, 1, 0]
                    }}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

const ParticleButton = React.forwardRef<HTMLButtonElement, ParticleButtonProps>(({
  children,
  onClick,
  onSuccess,
  successDuration = 1000,
  className,
  ...props
}, ref) => {
  const [showParticles, setShowParticles] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Combine forwarded ref with local ref
  const setRefs = (element: HTMLButtonElement | null) => {
    buttonRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowParticles(true);
    onClick?.(e);

    setTimeout(() => {
      setShowParticles(false);
      onSuccess?.();
    }, successDuration);
  };

  return (
    <>
      {showParticles && buttonRef.current && <SuccessParticles buttonRef={buttonRef} />}
      <Button
        ref={setRefs}
        onClick={handleClick}
        className={cn(
          "relative",
          showParticles && "scale-95",
          "transition-transform duration-100",
          className
        )}
        {...props}
      >
        {children}
        <MousePointerClick className="h-4 w-4 ml-2" />
      </Button>
    </>
  );
});

ParticleButton.displayName = 'ParticleButton';

export { ParticleButton };
