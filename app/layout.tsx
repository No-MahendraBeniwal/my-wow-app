import type React from "react"
import { ScrollToTop } from "./components/ScrollToTop"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
  title: 'Wow Graphics - Premium Printing & Branding Solutions',
  description: 'Transform your brand with Wow Graphics - Your one-stop solution for all printing, branding, and design needs in Jodhpur.',
  generator: 'Mahendra Beniwal'
};
