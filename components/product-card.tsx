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
    <Card className="overflow-hidden bg-slate-800 backdrop-blur-sm transition-all border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="aspect-square relative bg-slate-700/20 flex items-center justify-center p-6">
        {product.image_url ? (
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="relative h-32 w-32 rounded-full bg-blue-500/10 flex items-center justify-center">
            <Flame className="h-16 w-16 text-blue-400/50" />
          </div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-white">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-400 line-clamp-2 h-10 mb-4">
          {product.description || "High quality gas product for your home."}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-blue-400">
            ₦{product.price ? product.price.toLocaleString() : "Contact for price"}
          </span>
          {product.cylinder_size_kg && (
            <span className="text-sm text-slate-400">
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
