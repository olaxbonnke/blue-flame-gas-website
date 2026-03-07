import { createClient } from "@/utils/supabase/server"
import { ProductCard } from "@/components/product-card"

export async function ProductsSection() {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("price", { ascending: true })

  const cylinders = products?.filter(p => p.category === 'cylinder') || []
  const accessories = products?.filter(p => p.category === 'accessory') || []

  return (
    <section id="products" className="py-20 bg-slate-800/50 border-t border-slate-700">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            Our Products
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Order Your Gas & Accessories
          </h2>
          <p className="max-w-[700px] text-slate-400 md:text-xl">
            Choose from our range of cylinder sizes and accessories. We deliver straight to your doorstep.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="h-8 w-1 bg-primary rounded-full"></span>
              Gas Refills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cylinders.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="h-8 w-1 bg-primary rounded-full"></span>
              Accessories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {accessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
