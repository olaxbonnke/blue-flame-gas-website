'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BarChart3, Package, Mail, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleLogout = () => {
    // Clear auth state and redirect
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 border-r border-slate-700 p-6">
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-400 text-sm">BlueFlame Gas</p>
            </div>

            <nav className="space-y-2">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-blue-400">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/pricing-dual">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-blue-400">
                  <Settings className="mr-2 h-5 w-5" />
                  Gas Pricing
                </Button>
              </Link>
              <Link href="/admin/manage-products">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-blue-400">
                  <Package className="mr-2 h-5 w-5" />
                  Products & Services
                </Button>
              </Link>
              <Link href="/admin/newsletter">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-blue-400">
                  <Mail className="mr-2 h-5 w-5" />
                  Newsletter
                </Button>
              </Link>
            </nav>

            <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
