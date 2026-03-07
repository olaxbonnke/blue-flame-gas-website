'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price?: number
  cylinder_size_kg?: number
  description?: string
  image_url?: string
  in_stock: boolean
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'cylinder',
    price: '',
    cylinder_size_kg: '',
    description: '',
  })
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, servicesRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('display_order', { ascending: true }),
      ])

      if (productsRes.error) throw productsRes.error
      if (servicesRes.error) throw servicesRes.error

      setProducts(productsRes.data || [])
      setServices(servicesRes.data || [])
    } catch (error) {
      console.log('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async () => {
    if (!newProduct.name) return

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          category: newProduct.category,
          price: newProduct.price ? parseFloat(newProduct.price) : null,
          cylinder_size_kg: newProduct.cylinder_size_kg ? parseFloat(newProduct.cylinder_size_kg) : null,
          description: newProduct.description,
        },
      ])

      if (error) throw error
      setNewProduct({ name: '', category: 'cylinder', price: '', cylinder_size_kg: '', description: '' })
      setShowAddForm(false)
      fetchData()
    } catch (error) {
      console.log('Error adding product:', error)
    }
  }

  const handleToggleStock = async (id: string, currentStock: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !currentStock })
        .eq('id', id)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.log('Error updating stock:', error)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.log('Error deleting product:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Products & Services Management</h1>
          <p className="text-slate-400 mt-2">Manage gas products, cylinders, and services</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-slate-800 border-slate-700 p-6">
          <div className="space-y-4">
            <h3 className="font-bold text-white">Add New Product</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
              >
                <option value="cylinder">Cylinder</option>
                <option value="accessory">Accessory</option>
              </select>
              <Input
                placeholder="Price (₦)"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Cylinder size (kg)"
                type="number"
                value={newProduct.cylinder_size_kg}
                onChange={(e) => setNewProduct({ ...newProduct, cylinder_size_kg: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white md:col-span-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddProduct}>Save Product</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="text-center text-slate-400">Loading products...</div>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Gas Cylinders & Refills</h2>
            <div className="grid gap-4">
              {products
                .filter((p) => p.category === 'cylinder')
                .map((product) => (
                  <Card key={product.id} className="bg-slate-800 border-slate-700 p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-bold text-white">{product.name}</h3>
                        {product.cylinder_size_kg && (
                          <p className="text-slate-400 text-sm">{product.cylinder_size_kg}kg</p>
                        )}
                        <p className="text-blue-400 font-semibold">₦{product.price?.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={product.in_stock ? 'default' : 'outline'}
                          onClick={() => handleToggleStock(product.id, product.in_stock)}
                        >
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Accessories</h2>
            <div className="grid gap-4">
              {products
                .filter((p) => p.category === 'accessory')
                .map((product) => (
                  <Card key={product.id} className="bg-slate-800 border-slate-700 p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-bold text-white">{product.name}</h3>
                        <p className="text-slate-400 text-sm">{product.description}</p>
                        <p className="text-blue-400 font-semibold">₦{product.price?.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={product.in_stock ? 'default' : 'outline'}
                          onClick={() => handleToggleStock(product.id, product.in_stock)}
                        >
                          {product.in_stock ? 'In Stock' : 'Out of Stock'}
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Services</h2>
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="bg-slate-800 border-slate-700 p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-bold text-white">{service.name}</h3>
                      <p className="text-slate-400 text-sm">{service.description}</p>
                      <p className="text-blue-400 font-semibold">₦{service.price?.toLocaleString()}</p>
                    </div>
                    <Button
                      size="sm"
                      variant={service.in_stock ? 'default' : 'outline'}
                      onClick={() =>
                        supabase.from('services').update({ in_stock: !service.in_stock }).eq('id', service.id)
                      }
                    >
                      {service.in_stock ? 'Available' : 'Unavailable'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
