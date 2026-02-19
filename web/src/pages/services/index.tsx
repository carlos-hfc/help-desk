import { PlusIcon } from "lucide-react"

import { Button } from "@/components/button"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"

import { DialogService } from "./dialog-service"
import { ServicesTableHead } from "./services-table-head"
import { ServicesTableRow } from "./services-table-row"

export function Services() {
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
          {Array.from({ length: 5 }).map((_, i) => (
            <ServicesTableRow key={i} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
