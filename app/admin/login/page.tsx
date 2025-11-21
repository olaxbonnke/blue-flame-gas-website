import { LoginForm } from "@/components/admin/login-form"
import { Flame } from 'lucide-react'
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Flame className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">BlueFlame Gas</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to access the dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
