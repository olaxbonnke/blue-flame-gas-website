import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import { AdminHeader } from "@/components/admin/admin-header"
import { PricingManagement } from "@/components/admin/pricing-management"

export default async function PricingPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  const { data: pricing } = await supabase
    .from("gas_pricing")
    .select("*")
    .single()

  const { data: cylinders } = await supabase
    .from("products")
    .select("*")
    .eq("category", "cylinder")
    .order("cylinder_size_kg", { ascending: true })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminHeader />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <p className="text-muted-foreground">Update gas prices per kilogram</p>
        </div>
        <PricingManagement pricing={pricing} cylinders={cylinders || []} />
      </main>
    </div>
  )
}
