import { createClient } from "@/utils/supabase/server"
import { redirect } from 'next/navigation'
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductsManagement } from "@/components/admin/products-management"

export default async function ProductsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminHeader />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-muted-foreground">Manage your gas cylinders and accessories</p>
        </div>
        <ProductsManagement products={products || []} />
      </main>
    </div>
  )
}
