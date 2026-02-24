import { cn } from "@/utils/cn"

export function Skeleton({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      tabIndex={-1}
      inert
      className={cn(
        "bg-gray-500 rounded-md animate-pulse block w-full h-6",
        className,
      )}
      {...props}
    />
  )
}
