import { Skeleton } from "@/components/skeleton"
import { TableCell, TableRow } from "@/components/table"

export function ClientsTableSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
      <TableCell>
        <Skeleton />
      </TableCell>
    </TableRow>
  )
}
