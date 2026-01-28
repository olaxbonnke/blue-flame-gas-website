import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import { AdminHeader } from "@/components/admin/admin-header"
import { OrdersTable } from "@/components/admin/orders-table"
import { StatsCards } from "@/components/admin/stats-cards"

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0
  const totalOrders = orders?.length || 0
  const totalProducts = products?.length || 0
  const totalRevenue = orders?.reduce((sum, o) => sum + parseFloat(o.total_amount), 0) || 0

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminHeader />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your BlueFlame Gas business</p>
        </div>

        <StatsCards 
          pendingOrders={pendingOrders}
          totalOrders={totalOrders}
          totalProducts={totalProducts}
          totalRevenue={totalRevenue}
        />

        <div className="mt-8">
          <OrdersTable orders={orders || []} />
        </div>
      </main>
    </div>
  )
}
