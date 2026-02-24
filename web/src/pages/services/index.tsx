import { useQuery } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"
import { listServices } from "@/http/list-services"

import { DialogService } from "./dialog-service"
import { ServicesTableHead } from "./services-table-head"
import { ServicesTableRow } from "./services-table-row"
import { ServicesTableSkeleton } from "./services-table-skeleton"

export function Services() {
  const { data, isLoading } = useQuery({
    queryKey: ["service"],
    queryFn: listServices,
  })

  return (
    <>
      <PageTitle
        title="Serviços"
        className="flex-row"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Novo
            </Button>
          </DialogTrigger>

          <DialogService />
        </Dialog>
      </PageTitle>

      <Table>
        <ServicesTableHead />

        <TableBody>
          {isLoading && <ServicesTableSkeleton />}

          {data?.services.map(service => (
            <ServicesTableRow
              key={service.id}
              service={service}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
