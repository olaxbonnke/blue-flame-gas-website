"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { Flame, Plus } from 'lucide-react'
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  price: number
  cylinder_size_kg?: number | null
  image_url?: string | null
  description?: string | null
  in_stock: boolean
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image_url: product.image_url,
    })
  }

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="aspect-square relative bg-muted/20 flex items-center justify-center p-6">
        {product.image_url ? (
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="relative h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
            <Flame className="h-16 w-16 text-primary/50" />
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
          {product.description || "High quality gas product for your home."}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">
            ₦{product.price.toLocaleString()}
          </span>
          {product.cylinder_size_kg && (
            <span className="text-sm text-muted-foreground">
              / {product.cylinder_size_kg}kg
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          disabled={!product.in_stock}
        >
          <Plus className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
