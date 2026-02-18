import { cn } from "@/utils/cn"

interface TableProps extends React.ComponentProps<"table"> {
  containerClassName?: string
}

export function Table({ containerClassName, className, ...props }: TableProps) {
  return (
    <div
      className={cn(
        "w-full relative overflow-x-auto border border-gray-500 rounded-xl [&_tr]:border-b [&_tr]:border-gray-500",
        containerClassName,
      )}
    >
      <table
        {...props}
        className={cn("w-full", className)}
      />
    </div>
  )
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      {...props}
      className={cn("[&_tr:last-child]:border-0", className)}
    />
  )
}
