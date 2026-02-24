import { Skeleton } from "@/components/skeleton"
import { TableCell, TableRow } from "@/components/table"

export function TechniciansTableSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell className="lg:min-w-40">
        <Skeleton />
      </TableCell>
      <TableCell className="max-lg:hidden lg:min-w-40">
        <Skeleton />
      </TableCell>
      <TableCell className="lg:min-w-40">
        <Skeleton />
      </TableCell>
      <TableCell className="lg:min-w-40">
        <Skeleton />
      </TableCell>
    </TableRow>
  ))
}
