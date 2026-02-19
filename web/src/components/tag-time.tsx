import { XIcon } from "lucide-react"

import { cn } from "@/utils/cn"

interface TagTimeProps extends React.ComponentProps<"span"> {
  selected?: boolean
}

export function TagTime({
  className,
  selected = false,
  children,
  ...props
}: TagTimeProps) {
  return (
    <span
      {...props}
      data-selected={selected}
      className={cn(
        "rounded-full w-max border text-gray-200 border-gray-400 flex items-center gap-1.5 font-bold text-xs px-3 py-1.5 aria-disabled:border-gray-500 aria-disabled:text-gray-400 aria-disabled:pointer-events-none hover:not-[data-selected=true]:bg-gray-500 data-[selected=true]:pe-1.5 data-[selected=true]:bg-blue-base data-[selected=true]:border-blue-base data-[selected=true]:text-gray-600 data-[selected=true]:[&>svg]:block",
        className,
      )}
    >
      {children}
      <XIcon className="size-4 hidden" />
    </span>
  )
}
