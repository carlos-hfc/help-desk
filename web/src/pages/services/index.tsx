import { PlusIcon } from "lucide-react"

import { Button } from "@/components/button"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"

import { ServicesTableHead } from "./services-table-head"
import { ServicesTableRow } from "./services-table-row"

export function Services() {
  return (
    <>
      <PageTitle
        title="Serviços"
        className="flex-row"
      >
        <Button>
          <PlusIcon />
          Novo
        </Button>
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
