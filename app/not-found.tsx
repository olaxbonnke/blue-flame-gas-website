import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mb-6">
        <Flame className="h-10 w-10 text-primary animate-pulse" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! It seems like you've run out of gas. The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
