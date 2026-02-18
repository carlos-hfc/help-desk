import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"

import { CallsTableHead } from "./calls-table-head"
import { CallsTableRow } from "./calls-table-row"

export function Dashboard() {
  return (
    <>
      <PageTitle title="Chamados" />

      <Table>
        <CallsTableHead />

        <TableBody className="[&_tr:last-child]:border-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <CallsTableRow key={i} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
