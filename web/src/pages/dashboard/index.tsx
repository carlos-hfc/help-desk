import { useQuery } from "@tanstack/react-query"

import { CallStatus } from "@/components/call-status"
import { PageTitle } from "@/components/page-title"
import { Table, TableBody } from "@/components/table"
import { useAuth } from "@/contexts/auth"
import { listCalls } from "@/http/list-calls"

import { CallCard } from "./call-card"
import { CallCardSkeleton } from "./call-card-skeleton"
import { CallsTableHead } from "./calls-table-head"
import { CallsTableRow } from "./calls-table-row"
import { CallsTableSkeleton } from "./calls-table-skeleton"

export function Dashboard() {
  const { IS_TECHNICIAN, IS_ADMIN } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ["calls"],
    queryFn: listCalls,
  })

  const callsOpen = data?.calls.filter(call => call.status === "OPEN")
  const callsInProgress = data?.calls.filter(
    call => call.status === "IN_PROGRESS",
  )
  const callsClosed = data?.calls.filter(call => call.status === "CLOSED")

  return (
    <>
      <PageTitle title={IS_ADMIN ? "Chamados" : "Meus chamados"} />

      {IS_TECHNICIAN ? (
        <div className="grid gap-6">
          <div
            className="grid gap-4 [&_span]:*:first:inline"
            hidden={
              !isLoading && callsInProgress && callsInProgress?.length <= 0
            }
          >
            <CallStatus status="IN_PROGRESS" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <CallCardSkeleton />
              ) : (
                callsInProgress?.map(call => (
                  <CallCard
                    key={call.id}
                    call={call}
                  />
                ))
              )}
            </div>
          </div>

          <div
            className="grid gap-4 [&_span]:*:first:inline"
            hidden={!isLoading && callsOpen && callsOpen?.length <= 0}
          >
            <CallStatus status="OPEN" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <CallCardSkeleton />
              ) : (
                callsOpen?.map(call => (
                  <CallCard
                    key={call.id}
                    call={call}
                  />
                ))
              )}
            </div>
          </div>

          <div
            className="grid gap-4 [&_span]:*:first:inline"
            hidden={!isLoading && callsClosed && callsClosed?.length <= 0}
          >
            <CallStatus status="CLOSED" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <CallCardSkeleton />
              ) : (
                callsClosed?.map(call => (
                  <CallCard
                    key={call.id}
                    call={call}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  )
}
