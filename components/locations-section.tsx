import { createClient } from "@/utils/supabase/server"
import { MapPin, Phone, Navigation } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export async function LocationsSection() {
  const supabase = await createClient()
  
  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true })

  return (
    <section id="locations" className="py-20 bg-slate-800/50 border-t border-slate-700">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            <MapPin className="mr-2 h-4 w-4" /> Find Us
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Our Stations
          </h2>
          <p className="max-w-[700px] text-slate-400 md:text-xl">
            Visit any of our stations for quick refills or pickup. We are strategically located to serve you better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations?.map((location) => (
            <Card key={location.id} className="overflow-hidden border border-muted bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl">{location.name}</CardTitle>
                      <p className="text-sm text-primary font-medium">{location.city}, {location.state}</p>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                    </CardContent>
                  </div>
                  <div className="mt-6 pt-6 border-t border-muted">
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={location.google_maps_url || "#"} target="_blank">
                        <Navigation className="mr-2 h-4 w-4" /> Get Directions
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="bg-muted/50 min-h-[200px] relative">
                  {/* Placeholder for map - in a real app this would be a Google Maps embed */}
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <MapPin className="h-12 w-12 text-muted-foreground/50" />
                    <span className="sr-only">Map placeholder</span>
                  </div>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, opacity: 0.6, filter: 'grayscale(100%) invert(90%)' }}
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location.address + ', ' + location.city)}`}
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
