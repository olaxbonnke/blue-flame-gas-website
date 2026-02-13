import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css"
import { CartProvider } from "@/context/cart-context"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "BlueFlame Gas | Reliable Cooking Gas Delivery",
  description: "Fast, safe, and reliable cooking gas delivery service in Nigeria.",
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
