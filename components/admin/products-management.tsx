"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  category: string
  price: string
  cylinder_size_kg?: number
  description?: string
  in_stock: boolean
  created_at: string
}

export function ProductsManagement({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const router = useRouter()

  const handleToggleStock = async (productId: string, currentStatus: boolean) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("products")
      .update({ in_stock: !currentStatus })
      .eq("id", productId)

    if (error) {
      console.error("Error updating product:", error)
      return
    }

    setProducts(products.map(product => 
      product.id === productId ? { ...product, in_stock: !currentStatus } : product
    ))
    router.refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Size (kg)</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">₦{parseFloat(product.price).toLocaleString()}</TableCell>
                  <TableCell>{product.cylinder_size_kg || "-"}</TableCell>
                  <TableCell>
                    <Switch
                      checked={product.in_stock}
                      onCheckedChange={() => handleToggleStock(product.id, product.in_stock)}
                    />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(product.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
