import { Skeleton } from "@/components/skeleton"

export function CallCardSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <div
      key={i}
      className="border border-gray-500 bg-gray-600 rounded-xl p-5 grid gap-4 relative"
    >
      <div className="absolute top-3 right-3 flex gap-1">
        <Skeleton className="h-7 w-12" />
        <Skeleton className="h-7 w-12" />
      </div>

      <header className="space-y-1">
        <Skeleton className="block h-4 w-12" />
        <Skeleton className="block w-42" />
        <Skeleton className="block h-4 w-24" />
      </header>

      <div className="flex items-center justify-between gap-1 border-b border-gray-500 pb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-18" />
      </div>

      <div className="flex items-center justify-between gap-1">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="w-32 mr-auto h-4" />

        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  ))
}
