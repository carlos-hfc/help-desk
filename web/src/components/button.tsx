import { cn } from "@/utils/cn"

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "link"
  size?: "md" | "sm"
  icon?: boolean
}

export function Button({
  variant = "primary",
  size = "md",
  icon = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-sm flex items-center justify-center gap-2 font-bold text-sm",
        variant === "primary" && "bg-gray-200 text-gray-600 hover:bg-gray-100",
        variant === "secondary" &&
          "bg-gray-500 text-gray-200 hover:bg-gray-400 hover:text-gray-100",
        variant === "link" &&
          "bg-white text-gray-300 hover:bg-gray-500 hover:text-gray-100",
        size === "md" && "px-4 h-10",
        size === "sm" && "px-2 h-7",
        icon && size === "md" && "p-0 size-10",
        icon && size === "sm" && "p-0 size-7",
        className,
      )}
    />
  )
}
