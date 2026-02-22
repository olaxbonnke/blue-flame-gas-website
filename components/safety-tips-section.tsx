import { createClient } from "@/utils/supabase/server"
import { ShieldAlert, Wind, Power, Wrench, Flame, BadgeCheck, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const iconMap: Record<string, any> = {
  'shield-alert': ShieldAlert,
  'wind': Wind,
  'power': Power,
  'wrench': Wrench,
  'flame': Flame,
  'badge-check': BadgeCheck,
}

export async function SafetyTipsSection() {
  const supabase = await createClient()
  
  const { data: tips } = await supabase
    .from("safety_tips")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  return (
    <section id="safety" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[100px]"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Shield className="mr-2 h-4 w-4" /> Safety First
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Gas Safety Tips
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Your safety is our priority. Follow these guidelines to ensure safe handling of cooking gas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips?.map((tip) => {
            const Icon = iconMap[tip.icon_name || 'shield-alert'] || ShieldAlert
            return (
              <Card key={tip.id} className="bg-card/50 backdrop-blur-sm border border-muted hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
