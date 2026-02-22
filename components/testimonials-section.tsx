import { createClient } from "@/utils/supabase/server"
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function TestimonialsSection() {
  const supabase = await createClient()
  
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .limit(3)

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Customers Say
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Don't just take our word for it. Here's what our satisfied customers have to say about our service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials?.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card/50 border border-muted relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/10">
                <Quote className="h-24 w-24 rotate-180" />
              </div>
              <CardContent className="pt-6 relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < (testimonial.rating || 5) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.customer_name}`} />
                    <AvatarFallback>{testimonial.customer_name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.customer_location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
