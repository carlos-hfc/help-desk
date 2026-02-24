import { useQuery } from "@tanstack/react-query"

import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"
import { listClients } from "@/http/list-clients"

import { ClientsTableHead } from "./clients-table-head"
import { ClientsTableRow } from "./clients-table-row"
import { ClientsTableSkeleton } from "./clients-table-skeleton"

export function Clients() {
  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: listClients,
  })

  return (
    <>
      <PageTitle
        title="Clientes"
        className="flex-row"
      />

      <Table>
        <ClientsTableHead />

        <TableBody>
          {isLoading && <ClientsTableSkeleton />}

          {data?.clients.map(client => (
            <ClientsTableRow
              key={client.id}
              client={client}
            />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
