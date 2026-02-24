import { Skeleton } from "@/components/skeleton"
import { TableCell, TableRow } from "@/components/table"

export function CallsTableSkeleton() {
  return (
    <TableRow>
      <TableCell className="text-xs">
        <Skeleton />
      </TableCell>
      <TableCell className="text-xs font-bold hidden lg:table-cell">
        <Skeleton />
      </TableCell>
      <TableCell className="space-y-1">
        <span className="block font-bold">
          <Skeleton className="w-42" />
        </span>
        <span className="block text-xs">
          <Skeleton className="w-32" />
        </span>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Skeleton />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Skeleton />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton className="size-6" />
      </TableCell>
    </TableRow>
  )
}
