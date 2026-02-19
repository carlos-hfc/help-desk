import { TrashIcon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { TableCell, TableRow } from "@/components/table"

import { DialogDeleteClient } from "./dialog-delete-client"

export function ClientsTableRow() {
  return (
    <Dialog>
      <TableRow>
        <TableCell>
          <Avatar alt="Carlos Faustino">Carlos Faustino</Avatar>
        </TableCell>
        <TableCell>email@email.com</TableCell>
        <TableCell>
          <DialogTrigger asChild>
            <Button
              variant="link"
              size="sm"
              icon
            >
              <TrashIcon className="text-feedback-danger" />
            </Button>
          </DialogTrigger>
        </TableCell>
      </TableRow>

      <DialogDeleteClient />
    </Dialog>
  )
}
