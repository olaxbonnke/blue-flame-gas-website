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

  // Default safety tips if none from database
  const defaultTips = [
    {
      id: '1',
      title: 'Check for Leaks',
      description: 'Use a soapy water solution to check for leaks in pipes and connections. Bubbles indicate a leak. Seek professional help immediately.',
      icon_name: 'wind'
    },
    {
      id: '2',
      title: 'Proper Ventilation',
      description: 'Always ensure your kitchen is properly ventilated. Keep windows open during and after cooking to allow gas combustion byproducts to escape.',
      icon_name: 'power'
    },
    {
      id: '3',
      title: 'Regular Inspections',
      description: 'Have your gas system professionally inspected at least once a year. Check hoses for cracks or discoloration and replace if damaged.',
      icon_name: 'wrench'
    },
    {
      id: '4',
      title: 'Safe Usage',
      description: 'Never use gas stoves for heating. Light the stove before turning on the gas. Always use cookware with flat bottoms to prevent tipping.',
      icon_name: 'flame'
    },
    {
      id: '5',
      title: 'Child & Pet Safety',
      description: 'Keep children and pets away from cooking areas. Install safety gates if needed. Educate family members about gas dangers.',
      icon_name: 'badge-check'
    },
    {
      id: '6',
      title: 'Emergency Response',
      description: 'If you smell gas, leave immediately and call emergency services from outside. Do not use electrical switches or phone inside. Never investigate alone.',
      icon_name: 'shield-alert'
    }
  ]

  const safetyTips = tips && tips.length > 0 ? tips : defaultTips

  return (
    <section id="safety" className="py-20 bg-slate-900 relative overflow-hidden border-t border-slate-700">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px] -z-10"></div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            <Shield className="mr-2 h-4 w-4" /> Safety First
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Gas Safety Tips
          </h2>
          <p className="max-w-[700px] text-slate-400 md:text-xl">
            Your safety is our priority. Follow these guidelines to ensure safe handling of cooking gas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyTips?.map((tip: any) => {
            const Icon = iconMap[tip.icon_name || 'shield-alert'] || ShieldAlert
            return (
              <Card key={tip.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all group">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg text-white">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
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
