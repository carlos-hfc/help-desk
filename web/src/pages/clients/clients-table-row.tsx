import { TrashIcon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { TableCell, TableRow } from "@/components/table"

export function ClientsTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Avatar name="Carlos Faustino" />
      </TableCell>
      <TableCell>email@email.com</TableCell>
      <TableCell>
        <Button
          variant="secondary"
          size="sm"
          icon
        >
          <TrashIcon className="text-feedback-danger" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
