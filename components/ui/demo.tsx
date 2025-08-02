"use client"

import DotPattern from "@/components/ui/dot-pattern-1"
import { Cursor, CursorFollow, CursorProvider } from './cursor';

export function Quote() {
  return (
    <div className="mx-auto mb-10 w-full max-w-[600px] px-6 md:mb-16">
      <CursorProvider>
        <Cursor>
          <svg
            className="size-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <path
              fill="currentColor"
              d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
            />
          </svg>
        </Cursor>
        <CursorFollow>
          <div className="bg-blue-500 text-white px-2 py-1 rounded-lg text-sm shadow-lg">
            Designers
          </div>
        </CursorFollow>
        <div className="relative flex flex-col items-center border border-red-500">
          <DotPattern width={5} height={5} />

          <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-red-500 text-white" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-red-500 text-white" />

          <div className="relative z-20 w-full p-8">
            <p className="mb-6 text-center text-sm text-red-500">
              We believe
            </p>
            <div className="text-center">
              <div className="text-xl tracking-tight md:text-2xl lg:text-3xl">
                <div className="flex flex-wrap justify-center items-baseline gap-x-2 gap-y-1">
                  <span className="font-semibold">"Design should be</span>
                  <span className="font-thin">easy to</span>
                </div>
                <div className="flex flex-wrap justify-center items-baseline gap-x-2 gap-y-1">
                  <span className="font-thin">understand</span>
                  <span className="font-semibold">because</span>
                  <span className="font-thin">simple</span>
                </div>
                <div className="flex flex-wrap justify-center items-baseline gap-x-2 gap-y-1">
                  <span className="font-thin">ideas</span>
                  <span className="font-semibold">are quicker to</span>
                </div>
                <span className="font-semibold">grasp..."</span>
              </div>
            </div>
          </div>
        </div>
      </CursorProvider>
    </div>
  )
}
