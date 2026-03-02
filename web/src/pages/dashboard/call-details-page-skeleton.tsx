import { Skeleton } from "@/components/skeleton"
import { useAuth } from "@/contexts/auth"

export function CallDetailsPageSkeleton() {
  const { IS_TECHNICIAN, IS_CLIENT } = useAuth()

  return (
    <div className="grid gap-4 lg:gap-x-6 lg:grid-cols-[auto_320px] text-gray-200">
      <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 lg:row-start-1 lg:row-end-3 lg:col-1">
        <header className="font-bold">
          <div className="flex items-center justify-between">
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-20 rounded-full" />
          </div>

          <Skeleton className="w-2/3" />
        </header>

        <div className="space-y-1">
          <Skeleton className="w-18" />

          <div className="space-y-0.5">
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>

        <div className="space-y-1">
          <Skeleton className="w-20" />
          <Skeleton className="w-48" />
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="w-full space-y-1">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
          <div className="w-full space-y-1">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>

        {!IS_CLIENT && (
          <div className="space-y-1">
            <Skeleton className="w-18 h-4" />

            <div className="flex gap-2 items-center">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="w-20" />
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-8 h-full lg:row-span-1 lg:col-2">
        <div className="space-y-1">
          <Skeleton className="w-18 h-4" />

          <div className="flex gap-2 items-center">
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="w-36" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <Skeleton className="w-18 h-4" />

            <div className="flex justify-between">
              <Skeleton className="w-18 h-4" />

              <Skeleton className="w-14 h-4" />
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <Skeleton className="w-18 h-4" />
            <div>
              <div className="flex justify-between">
                <Skeleton className="w-18 h-4" />
                <Skeleton className="w-14 h-4" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-500 text-sm font-bold flex justify-between">
            <Skeleton className="w-18 h-5" />
            <Skeleton className="w-16 h-5" />
          </div>
        </div>
      </div>

      {IS_TECHNICIAN && (
        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-4 h-full text-xs lg:col-1">
          <div className="flex justify-between items-center">
            <Skeleton className="w-18 h-4" />

            <Skeleton className="size-7" />
          </div>

          <div className="divide-y divide-gray-500">
            <div className="flex justify-between items-center gap-6 py-1">
              <Skeleton className="w-32 h-4" />

              <Skeleton className="ml-auto w-14 h-4" />
              <Skeleton className="size-6" />
            </div>

            <div className="flex justify-between items-center gap-6 py-1">
              <Skeleton className="w-32 h-4" />

              <Skeleton className="ml-auto w-14 h-4" />
              <Skeleton className="size-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
