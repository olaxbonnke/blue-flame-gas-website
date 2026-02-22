"use client"

import Link from "next/link"
import { Flame, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from 'next/navigation'

export function AdminHeader() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-muted bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <Flame className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">BlueFlame Admin</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/admin" className="text-foreground/80 hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/products" className="text-foreground/80 hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/admin/pricing" className="text-foreground/80 hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
            View Site
          </Link>
        </nav>

        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  )
}
