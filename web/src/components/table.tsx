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
        className={cn("w-full text-sm text-gray-200", className)}
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

export function TableHead({
  className,
  children,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      {...props}
      className={cn("p-3 text-left", className)}
    >
      {children && <span className="line-clamp-1">{children}</span>}
    </th>
  )
}

export function TableRow(props: React.ComponentProps<"tr">) {
  return <tr {...props} />
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      {...props}
      className={cn("p-3", className)}
    />
  )
}
