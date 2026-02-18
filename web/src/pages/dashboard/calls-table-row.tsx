import { PenLineIcon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { TableCell, TableRow } from "@/components/table"

export function CallsTableRow() {
  return (
    <TableRow>
      <TableCell className="text-xs">13/04/25 20:20</TableCell>
      <TableCell className="text-xs font-bold hidden lg:table-cell">
        0003
      </TableCell>
      <TableCell>
        <span className="block font-bold">Rede lenta</span>
        <span className="block text-xs">Instacao de rede</span>
      </TableCell>
      <TableCell className="hidden lg:table-cell">R$ 180,00</TableCell>
      <TableCell className="hidden lg:table-cell">
        <Avatar name="Carlos Faustino" />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Avatar name="Carlos Faustino" />
      </TableCell>
      <TableCell>
        <CallStatus status="OPEN" />
      </TableCell>
      <TableCell>
        <Button
          variant="secondary"
          size="sm"
          icon
        >
          <PenLineIcon className="text-gray-200" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
