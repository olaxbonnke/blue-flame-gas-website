import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { SafetyTipsSection } from "@/components/safety-tips-section"
import { LocationsSection } from "@/components/locations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Flame, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <HeroSection />
      <ProductsSection />
      <SafetyTipsSection />
      <LocationsSection />
      <TestimonialsSection />
      <NewsletterSection />
      
      <footer id="contact" className="bg-slate-900 border-t border-slate-700 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-50">BlueFlame Gas</span>
              </Link>
              <p className="text-slate-400 text-sm">
                Reliable, safe, and affordable cooking gas delivery service. We ensure you never run out of gas when you need it most.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="#products" className="hover:text-blue-400 transition-colors">Order Gas</Link></li>
                <li><Link href="#safety" className="hover:text-blue-400 transition-colors">Safety Tips</Link></li>
                <li><Link href="#locations" className="hover:text-blue-400 transition-colors">Locations</Link></li>
                <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Home Delivery</li>
                <li>Industrial Supply</li>
                <li>Gas Accessories</li>
                <li>Cylinder Maintenance</li>
                <li>Safety Consulting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>+234 801 234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>support@blueflamegas.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm text-slate-400 md:text-left">
              © 2025 BlueFlame Gas. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
