import { useMutation } from "@tanstack/react-query"
import { BanIcon, CheckCircle2Icon, PenLineIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { Status } from "@/components/status"
import { TableCell, TableRow } from "@/components/table"
import type { ListServicesResponse, Service } from "@/http/list-services"
import { updateServiceStatus } from "@/http/update-service-status"
import { queryClient } from "@/lib/react-query"
import { formatCurrency } from "@/utils/format-currency"

import { DialogService } from "./dialog-service"

interface ServicesTableRowProps {
  service: Service
}

export function ServicesTableRow({ service }: ServicesTableRowProps) {
  const { mutateAsync: updateServiceStatusFn, isPending } = useMutation({
    mutationFn: updateServiceStatus,
    onSuccess(_, { id }) {
      toast.success("Serviço atualizado com sucesso!")

      const cached = queryClient.getQueryData<ListServicesResponse>([
        "services",
      ])

      if (cached) {
        const services = cached.services.map(service => {
          if (service.id === id) {
            return { ...service, isActive: !service.isActive }
          }

          return service
        })

        queryClient.setQueryData<ListServicesResponse>(["services"], {
          ...cached,
          services,
        })
      }
    },
    onError() {
      toast.error("Erro ao atualizar serviço. Tente novamente")
    },
  })

  return (
    <Dialog>
      <TableRow
        className="aria-disabled:pointer-events-none aria-disabled:opacity-70"
        aria-disabled={isPending}
      >
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
              onClick={() => updateServiceStatusFn({ id: service.id })}
            >
              {service.isActive ? <BanIcon /> : <CheckCircle2Icon />}
            </Button>
            <DialogTrigger asChild>
              <Button
                variant="link"
                size="sm"
                icon
                aria-label="Editar serviço"
                disabled={!service.isActive}
              >
                <PenLineIcon />
              </Button>
            </DialogTrigger>
          </div>
        </TableCell>
      </TableRow>

      <DialogService service={service} />
    </Dialog>
  )
}
