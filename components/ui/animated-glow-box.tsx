// AnimatedGlowBox.tsx
import React, { ReactNode } from 'react';

interface AnimatedGlowBoxProps {
  children: ReactNode;
  className?: string;
}

const AnimatedGlowBox: React.FC<AnimatedGlowBoxProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* 1-to-1 copy of the search-bar’s outer glow */}
      <div
        className="
          absolute -inset-0.5 rounded-xl overflow-hidden blur-[3px]
          before:absolute before:content-['']
          before:w-[999px] before:h-[999px]
          before:bg-no-repeat
          before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
          before:bg-[conic-gradient(#000,#402fb5_5%,#000_38%,#000_50%,#cf30aa_60%,#000_87%)]
          before:rotate-60
          before:transition-transform before:duration-[3000ms] before:ease-[cubic-bezier(.4,0,.2,1)]
          group-hover:before:rotate-[-120deg]
          group-hover:before:duration-[6000ms]
          group-hover:before:ease-[cubic-bezier(.4,0,.2,1)]
          group-focus-within:before:rotate-[420deg]
          group-focus-within:before:duration-[6000ms]
          group-focus-within:before:ease-[cubic-bezier(.4,0,.2,1)]
          rounded-xl
        "
      />

      {/* Content box stays untouched */}
      <div className="relative bg-black/90 rounded-xl p-px">
        <div className="bg-black/90 rounded-xl p-1">{children}</div>
      </div>
    </div>
  );
};

export default AnimatedGlowBox;