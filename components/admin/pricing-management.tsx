"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface Pricing {
  id: string
  price_per_kg: string
  updated_at: string
}

interface Cylinder {
  id: string
  name: string
  cylinder_size_kg: number
  price: string
}

export function PricingManagement({ pricing, cylinders }: { pricing: Pricing | null, cylinders: Cylinder[] }) {
  const [pricePerKg, setPricePerKg] = useState(pricing?.price_per_kg || "1000")
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleUpdatePricing = async () => {
    setIsUpdating(true)
    const supabase = createClient()

    try {
      // Update the gas pricing
      const { error: pricingError } = await supabase
        .from("gas_pricing")
        .update({ 
          price_per_kg: parseFloat(pricePerKg),
          updated_at: new Date().toISOString()
        })
        .eq("id", pricing?.id)

      if (pricingError) throw pricingError

      // Update all cylinder prices based on new price per kg
      for (const cylinder of cylinders) {
        const newPrice = parseFloat(pricePerKg) * cylinder.cylinder_size_kg
        await supabase
          .from("products")
          .update({ price: newPrice })
          .eq("id", cylinder.id)
      }

      router.refresh()
      alert("Pricing updated successfully!")
    } catch (error) {
      console.error("Error updating pricing:", error)
      alert("Failed to update pricing")
    } finally {
      setIsUpdating(false)
    }
  }

  const calculatedPrices = cylinders.map(cylinder => ({
    ...cylinder,
    calculatedPrice: parseFloat(pricePerKg) * cylinder.cylinder_size_kg
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Price Per Kilogram</CardTitle>
          <CardDescription>
            Set the base price per kg. Cylinder prices will be calculated automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price per kg (₦)</Label>
            <Input
              id="price"
              type="number"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              placeholder="1000"
              min="0"
              step="0.01"
            />
          </div>
          <Button 
            onClick={handleUpdatePricing} 
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Pricing"
            )}
          </Button>
          {pricing?.updated_at && (
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(pricing.updated_at).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calculated Prices Preview</CardTitle>
          <CardDescription>
            Preview how cylinder prices will change
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calculatedPrices.map(cylinder => (
              <div key={cylinder.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{cylinder.name}</p>
                  <p className="text-sm text-muted-foreground">{cylinder.cylinder_size_kg}kg</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₦{cylinder.calculatedPrice.toLocaleString()}</p>
                  {parseFloat(cylinder.price) !== cylinder.calculatedPrice && (
                    <p className="text-xs text-muted-foreground line-through">
                      ₦{parseFloat(cylinder.price).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
