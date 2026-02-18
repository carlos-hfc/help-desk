import { BanIcon, PenLineIcon } from "lucide-react"

import { Button } from "@/components/button"
import { Status } from "@/components/status"
import { TableCell, TableRow } from "@/components/table"

export function ServicesTableRow() {
  return (
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
            variant="secondary"
            size="sm"
            icon
          >
            <BanIcon />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon
          >
            <PenLineIcon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
