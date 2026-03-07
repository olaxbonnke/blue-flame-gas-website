"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import { Loader2, Mail, CheckCircle2 } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email })

      if (error) {
        if (error.code === '23505') { // Unique violation
          setStatus("success") // Treat duplicate as success to not leak info
        } else {
          throw error
        }
      } else {
        setStatus("success")
      }
      setEmail("")
    } catch (error) {
      console.error("Newsletter error:", error)
      setStatus("error")
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-y border-slate-700">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Stay Updated
          </h2>
          <p className="max-w-[600px] text-slate-400 md:text-lg">
            Subscribe to our newsletter for the latest gas pricing, safety tips, and promotions.
          </p>
          </div>
          
          <div className="w-full max-w-md">
            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-green-500/20 text-green-500 border border-green-500/30">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="pl-10 h-12 bg-slate-800 text-white border-slate-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <Button type="submit" size="lg" className="h-12" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive mt-2 text-center lg:text-left">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
