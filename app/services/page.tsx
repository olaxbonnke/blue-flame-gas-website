'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { ArrowRight, Wrench, Zap, Paintbrush, Truck, Settings, CheckCircle } from 'lucide-react'

const serviceIcons: { [key: string]: React.ReactNode } = {
  'Gas Cooker Repairs': <Wrench className="h-8 w-8" />,
  'Gas Cooker Installation': <Zap className="h-8 w-8" />,
  'Cylinder Repainting': <Paintbrush className="h-8 w-8" />,
  'Home Delivery': <Truck className="h-8 w-8" />,
  'Pressure Regulator Installation': <Settings className="h-8 w-8" />,
  'Safety Inspection': <CheckCircle className="h-8 w-8" />,
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  image_url?: string
  icon_name?: string
  in_stock: boolean
  display_order: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('in_stock', true)
          .order('display_order', { ascending: true })

        if (error) throw error
        setServices(data || [])
      } catch (error) {
        console.log('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/10 to-slate-900"></div>
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Our Services
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From repairs and installations to maintenance and delivery, we provide comprehensive gas solutions
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 border-t border-slate-700">
        <div className="container px-4 md:px-6">
          {loading ? (
            <div className="text-center text-slate-400">Loading services...</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all overflow-hidden group"
                >
                  {service.image_url && (
                    <div className="relative h-48 overflow-hidden bg-slate-700">
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400">{serviceIcons[service.name] || <Wrench className="h-8 w-8" />}</div>
                      <h3 className="text-xl font-bold text-white">{service.name}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <span className="text-2xl font-bold text-blue-400">₦{service.price?.toLocaleString()}</span>
                      <Button size="sm" asChild>
                        <Link href="#contact">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-blue-500/10 border-t border-slate-700">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Need a Custom Service?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Contact us for specialized services not listed above. We're here to help with all your gas-related needs.
          </p>
          <Button size="lg" asChild>
            <Link href="tel:+234801234567">Call Us Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
