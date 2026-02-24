import { useQuery } from "@tanstack/react-query"

import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"
import { listCalls } from "@/http/list-calls"

import { CallsTableHead } from "./calls-table-head"
import { CallsTableRow } from "./calls-table-row"
import { CallsTableSkeleton } from "./calls-table-skeleton"

export function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["calls"],
    queryFn: listCalls,
  })

  return (
    <>
      <PageTitle title="Chamados" />

      <Table>
        <CallsTableHead />

        <TableBody>
          {isLoading && <CallsTableSkeleton />}

          {data?.calls.map(call => (
            <CallsTableRow
              key={call.id}
              call={call}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
