import { Skeleton } from "@/components/skeleton"
import { TableCell, TableRow } from "@/components/table"

export function CallsTableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell className="text-xs">
        <Skeleton />
      </TableCell>
      <TableCell className="text-xs font-bold max-lg:hidden">
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
      <TableCell className="max-lg:hidden">
        <Skeleton />
      </TableCell>
      <TableCell className="max-lg:hidden">
        <Skeleton />
      </TableCell>
      <TableCell className="max-lg:hidden">
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton className="w-20" />
      </TableCell>
      <TableCell className="w-6">
        <Skeleton className="size-6" />
      </TableCell>
    </TableRow>
  ))
}
