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
      
      <footer id="contact" className="bg-background border-t border-border/40 pt-16 pb-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">BlueFlame Gas</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Reliable, safe, and affordable cooking gas delivery service. We ensure you never run out of gas when you need it most.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="#products" className="hover:text-primary transition-colors">Order Gas</Link></li>
                <li><Link href="#safety" className="hover:text-primary transition-colors">Safety Tips</Link></li>
                <li><Link href="#locations" className="hover:text-primary transition-colors">Locations</Link></li>
                <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Home Delivery</li>
                <li>Industrial Supply</li>
                <li>Gas Accessories</li>
                <li>Cylinder Maintenance</li>
                <li>Safety Consulting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>+234 801 234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>support@blueflamegas.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2025 BlueFlame Gas. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
