import { BanIcon, CheckCircle2Icon, PenLineIcon } from "lucide-react"

import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { Status } from "@/components/status"
import { TableCell, TableRow } from "@/components/table"
import type { Service } from "@/http/list-services"
import { formatCurrency } from "@/utils/format-currency"

import { DialogService } from "./dialog-service"

interface ServicesTableRowProps {
  service: Service
}

export function ServicesTableRow({ service }: ServicesTableRowProps) {
  return (
    <Dialog>
      <TableRow>
        <TableCell className="font-bold">
          <span className="line-clamp-1">{service.name}</span>
        </TableCell>
        <TableCell className="truncate">
          {formatCurrency(service.price)}
        </TableCell>
        <TableCell>
          <Status active={service.isActive} />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button
              variant="link"
              size="sm"
              icon
              aria-label={
                service.isActive ? "Inativar serviço" : "Ativar serviço"
              }
            >
              {service.isActive ? <BanIcon /> : <CheckCircle2Icon />}
            </Button>
            <DialogTrigger asChild>
              <Button
                variant="link"
                size="sm"
                icon
                aria-label="Editar serviço"
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
