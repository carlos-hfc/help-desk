import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"

import { ClientsTableHead } from "./clients-table-head"
import { ClientsTableRow } from "./clients-table-row"

export function Clients() {
  return (
    <>
      <PageTitle
        title="Clientes"
        className="flex-row"
      />

      <Table>
        <ClientsTableHead />

        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <ClientsTableRow key={i} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
