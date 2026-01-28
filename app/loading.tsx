import { Flame } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 animate-pulse">
        <Flame className="h-10 w-10 text-primary animate-bounce" />
      </div>
      <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading BlueFlame...</p>
    </div>
  )
}
