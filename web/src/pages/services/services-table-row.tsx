import { BanIcon, PenLineIcon } from "lucide-react"

import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { Status } from "@/components/status"
import { TableCell, TableRow } from "@/components/table"

import { DialogService } from "./dialog-service"

export function ServicesTableRow() {
  return (
    <Dialog>
      <TableRow>
        <TableCell className="font-bold">
          <span className="line-clamp-1">Instalacao de rede</span>
        </TableCell>
        <TableCell className="truncate">R$ 180.00</TableCell>
        <TableCell>
          <Status />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              variant="link"
              size="sm"
              icon
            >
              <BanIcon />
            </Button>
            <DialogTrigger asChild>
              <Button
                variant="link"
                size="sm"
                icon
              >
                <PenLineIcon />
              </Button>
            </DialogTrigger>
          </div>
        </TableCell>
      </TableRow>

      <DialogService />
    </Dialog>
  )
}
