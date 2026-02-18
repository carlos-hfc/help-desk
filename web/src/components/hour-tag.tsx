import { cn } from "@/utils/cn"

export function TagTime({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={cn(
        "rounded-full w-max border border-gray-500 text-gray-400 font-bold text-xs px-3 py-1.5",
        className,
      )}
    />
  )
}
