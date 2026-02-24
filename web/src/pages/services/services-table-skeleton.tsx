import { Skeleton } from "@/components/skeleton"
import { TableCell, TableRow } from "@/components/table"

export function ServicesTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell className="font-bold">
        <Skeleton />
      </TableCell>
      <TableCell className="truncate">
        <Skeleton className="w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-20" />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Skeleton />
          <Skeleton />
        </div>
      </TableCell>
    </TableRow>
  ))
}
