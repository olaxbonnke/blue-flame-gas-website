'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { createClient } from '@/utils/supabase/client'
import { AlertCircle, Check } from 'lucide-react'

interface GasPricingType {
  id: string
  gas_type: string
  price_per_kg: number
  updated_at: string
}

export default function PricingDualPage() {
  const [pricing, setPricing] = useState<GasPricingType[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchPricing()
  }, [])

  const fetchPricing = async () => {
    try {
      const { data, error } = await supabase
        .from('gas_pricing_types')
        .select('*')
        .order('gas_type', { ascending: true })

      if (error) throw error
      setPricing(data || [])
    } catch (error) {
      console.log('Error fetching pricing:', error)
      setMessage('Error loading pricing data')
    } finally {
      setLoading(false)
    }
  }

  const handlePriceUpdate = async (id: string, newPrice: number) => {
    setUpdating(true)
    try {
      const { error } = await supabase
        .from('gas_pricing_types')
        .update({ price_per_kg: newPrice, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      setMessage('Price updated successfully')
      fetchPricing()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.log('Error updating price:', error)
      setMessage('Error updating price')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Gas Pricing Management</h1>
        <p className="text-slate-400 mt-2">Manage prices for cooking and industrial gas</p>
      </div>

      {message && (
        <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-4 flex items-center gap-2 text-blue-400">
          <Check className="h-5 w-5" />
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center text-slate-400">Loading pricing data...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {pricing.map((item) => (
            <Card key={item.id} className="bg-slate-800 border-slate-700 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white capitalize">{item.gas_type} Gas</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Last updated: {new Date(item.updated_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Price per kg (₦)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      defaultValue={item.price_per_kg}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter price"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const value = parseFloat((e.target as HTMLInputElement).value)
                          if (!isNaN(value)) {
                            handlePriceUpdate(item.id, value)
                          }
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        const input = document.querySelector(`input[data-id="${item.id}"]`) as HTMLInputElement
                        if (input) {
                          const value = parseFloat(input.value)
                          if (!isNaN(value)) {
                            handlePriceUpdate(item.id, value)
                          }
                        }
                      }}
                      disabled={updating}
                    >
                      Update
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded p-3">
                  <p className="text-slate-300 text-sm">Current Price</p>
                  <p className="text-2xl font-bold text-blue-400">₦{item.price_per_kg.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
