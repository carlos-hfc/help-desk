import { PlusIcon } from "lucide-react"

import { Button } from "@/components/button"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"

import { TechniciansTableHead } from "./technicians-table-head"
import { TechniciansTableRow } from "./technicians-table-row"

export function Technicians() {
  return (
    <>
      <PageTitle
        title="Técnicos"
        className="flex-row"
      >
        <Button>
          <PlusIcon />
          Novo
        </Button>
      </PageTitle>

      <Table>
        <TechniciansTableHead />

        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TechniciansTableRow key={i} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
