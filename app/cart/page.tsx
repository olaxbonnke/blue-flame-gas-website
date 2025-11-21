"use client"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { createClient } from "@/utils/supabase/client"
import { ArrowLeft, Minus, Plus, Trash2, Loader2 } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { z } from "zod"

const orderSchema = z.object({
  name: z.string().min(3, "Please enter your full name."),
  phone: z.string().min(10, "Enter a valid phone number."),
  whatsapp: z.string().optional(),
  address: z.string().min(10, "Delivery address is required."),
})

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    try {
      if (items.length === 0) {
        setOrderError("Add at least one product to your cart before placing an order.")
        return
      }

      const parsed = orderSchema.parse({
        name: (formData.get("name") as string)?.trim(),
        phone: (formData.get("phone") as string)?.trim(),
        whatsapp: (formData.get("whatsapp") as string)?.trim() || undefined,
        address: (formData.get("address") as string)?.trim(),
      })

      const supabase = createClient()
      
      const { error } = await supabase.from("orders").insert({
        customer_name: parsed.name,
        customer_phone: parsed.phone,
        customer_whatsapp: parsed.whatsapp ?? null,
        customer_address: parsed.address,
        items: items,
        total_amount: total,
        status: "pending"
      })

      if (error) throw error

      setOrderError(null)
      setOrderSuccess(true)
      clearCart()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setOrderError(error.issues[0]?.message ?? "Please check the form and try again.")
      } else {
        console.error("Error placing order:", error)
        setOrderError("Failed to place order. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 container py-20 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <div className="h-10 w-10 rounded-full bg-green-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Thank you for your order. We will contact you shortly to confirm delivery details.
          </p>
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 container py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>

        {orderError && (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {orderError}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button asChild>
              <Link href="/#products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg bg-card/50">
                  <div className="h-20 w-20 bg-muted/30 rounded-md flex items-center justify-center flex-shrink-0">
                    {item.image_url ? (
                      <img src={item.image_url || "/placeholder.svg"} alt={item.name} className="h-full w-full object-contain p-2" />
                    ) : (
                      <Flame className="h-8 w-8 text-primary/50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center p-4 border-t border-border">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">₦{total.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" required placeholder="Enter your full name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" required placeholder="080..." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp (Optional)</Label>
                        <Input id="whatsapp" name="whatsapp" placeholder="080..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Textarea 
                        id="address" 
                        name="address" 
                        required 
                        placeholder="Enter your full delivery address"
                        className="min-h-[100px]"
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    form="checkout-form" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Order...
                      </>
                    ) : (
                      `Place Order (₦${total.toLocaleString()})`
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
