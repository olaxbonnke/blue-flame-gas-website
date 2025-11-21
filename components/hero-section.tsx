import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Flame, ShieldCheck, Truck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] opacity-50"></div>
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px] opacity-30"></div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Fastest Delivery in Town
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Cooking Gas Delivered <br />
                <span className="text-primary">Straight to Your Door</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Reliable, safe, and affordable cooking gas delivery service. We ensure you never run out of gas when you
                need it most.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="#products">
                  Order Gas Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="#locations">Find a Station</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Safety Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-primary" />
                <span>Full Weight</span>
              </div>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] lg:h-[500px] lg:w-[500px]">
              {/* Abstract representation of a gas cylinder/flame since we don't have an image yet */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-blue-600/30 blur-3xl animate-pulse"></div>
              <div className="relative h-full w-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                <div className="z-20 text-center space-y-6">
                  <div className="relative mx-auto h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center">
                    <Flame className="h-20 w-20 text-primary animate-bounce duration-[3000ms]" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-20"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Current Price</h3>
                    <div className="text-4xl font-bold text-primary">₦1,000<span className="text-lg text-muted-foreground font-normal">/kg</span></div>
                    <p className="text-sm text-muted-foreground">Updated today</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs mx-auto pt-4">
                    <div className="rounded-lg bg-background/50 p-3 border border-border/50">
                      <div className="text-xs text-muted-foreground">12.5kg</div>
                      <div className="font-bold">₦12,500</div>
                    </div>
                    <div className="rounded-lg bg-background/50 p-3 border border-border/50">
                      <div className="text-xs text-muted-foreground">6kg</div>
                      <div className="font-bold">₦6,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
