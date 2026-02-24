import { useQuery } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Button } from "@/components/button"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"
import { listTechnicians } from "@/http/list-technicians"

import { TechniciansTableHead } from "./technicians-table-head"
import { TechniciansTableRow } from "./technicians-table-row"
import { TechniciansTableSkeleton } from "./technicians-table-skeleton"

export function Technicians() {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ["technicians"],
    queryFn: listTechnicians,
  })

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
          {isLoading && <TechniciansTableSkeleton />}

          {data?.technicians.map(technician => (
            <TechniciansTableRow
              key={technician.id}
              technician={technician}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
