"use client"

import Link from "next/link"
import { Flame, ShoppingCart, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"

export function SiteHeader() {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
              <Flame className="h-5 w-5 text-blue-400 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-50">BlueFlame Gas</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-slate-300 hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-slate-300 hover:text-blue-400 transition-colors">
            Services
          </Link>
          <Link href="/#products" className="text-slate-300 hover:text-blue-400 transition-colors">
            Order Gas
          </Link>
          <Link href="/#safety" className="text-slate-300 hover:text-blue-400 transition-colors">
            Safety Tips
          </Link>
          <Link href="/#locations" className="text-slate-300 hover:text-blue-400 transition-colors">
            Locations
          </Link>
          <Link href="/#contact" className="text-slate-300 hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-slate-900">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/#products">Order Now</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-blue-400">
                  Home
                </Link>
                <Link href="/#products" className="text-lg font-medium hover:text-primary">
                  Order Gas
                </Link>
                <Link href="/#safety" className="text-lg font-medium hover:text-primary">
                  Safety Tips
                </Link>
                <Link href="/#locations" className="text-lg font-medium hover:text-primary">
                  Locations
                </Link>
                <Link href="/#contact" className="text-lg font-medium hover:text-primary">
                  Contact
                </Link>
                <Button className="mt-4 w-full" asChild>
                  <Link href="/#products">Order Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
