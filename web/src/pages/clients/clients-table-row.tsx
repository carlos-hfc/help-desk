import { TrashIcon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { TableCell, TableRow } from "@/components/table"
import type { Client } from "@/http/list-clients"

import { DialogDeleteClient } from "./dialog-delete-client"

interface ClientsTableRowProps {
  client: Client
}

export function ClientsTableRow({ client }: ClientsTableRowProps) {
  return (
    <Dialog>
      <TableRow>
        <TableCell>
          <Avatar
            avatar={client.image}
            alt={client.name}
          >
            {client.name}
          </Avatar>
        </TableCell>
        <TableCell>{client.email}</TableCell>
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

      <DialogDeleteClient client={client} />
    </Dialog>
  )
}
