import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Button } from "@/components/button"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"

import { TechniciansTableHead } from "./technicians-table-head"
import { TechniciansTableRow } from "./technicians-table-row"

export function Technicians() {
  const navigate = useNavigate()

  return (
    <>
      <PageTitle
        title="Técnicos"
        className="flex-row"
      >
        <Button onClick={() => navigate("/register-technician")}>
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
