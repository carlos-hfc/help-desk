import { useMutation } from "@tanstack/react-query"
import { CheckCircleIcon, Clock2Icon, EyeIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { endService } from "@/http/end-service"
import type { GetCallResponse } from "@/http/get-call"
import type { Call, CallStatusType, ListCallsResponse } from "@/http/list-calls"
import { startService } from "@/http/start-service"
import { queryClient } from "@/lib/react-query"
import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"

interface CallCardProps {
  call: Call
}

export function CallCard({ call }: CallCardProps) {
  const navigate = useNavigate()

  function updateServicesOnCache(id: string, status: CallStatusType) {
    const callsListCache = queryClient.getQueriesData<
      ListCallsResponse | GetCallResponse
    >({
      queryKey: ["calls"],
    })

    const payload = {
      status,
      updatedAt: new Date().toISOString(),
    }

    callsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      if ("calls" in cacheData) {
        queryClient.setQueryData<ListCallsResponse>(cacheKey, {
          ...cacheData,
          calls: cacheData.calls.map(call => {
            if (call.id === id) {
              return { ...call, ...payload }
            }

            return call
          }),
        })
      }

      if ("call" in cacheData) {
        queryClient.setQueryData<GetCallResponse>(cacheKey, {
          ...cacheData,
          call: {
            ...cacheData.call,
            ...payload,
          },
        })
      }
    })
  }

  const { mutateAsync: startServiceFn, isPending: isPendingStartService } =
    useMutation({
      mutationFn: startService,
      onSuccess(_, { id }) {
        updateServicesOnCache(id, "IN_PROGRESS")
      },
    })

  const { mutateAsync: endServiceFn, isPending: isPendingEndService } =
    useMutation({
      mutationFn: endService,
      onSuccess(_, { id }) {
        updateServicesOnCache(id, "CLOSED")
      },
    })

  return (
    <div className="border border-gray-500 bg-gray-600 rounded-xl p-5 grid gap-4 relative">
      <div className="absolute top-3 right-3 flex gap-1">
        <Button
          icon
          variant="secondary"
          size="sm"
          aria-label="Visualizar chamado"
          onClick={() => navigate(`/${call.id}`)}
          disabled={isPendingStartService || isPendingEndService}
        >
          <EyeIcon />
        </Button>

        {call.status === "OPEN" && (
          <Button
            size="sm"
            onClick={() => startServiceFn({ id: call.id })}
            disabled={isPendingStartService}
          >
            <Clock2Icon />
            Iniciar
          </Button>
        )}

        {call.status === "IN_PROGRESS" && (
          <Button
            size="sm"
            onClick={() => endServiceFn({ id: call.id })}
            disabled={isPendingEndService}
          >
            <CheckCircleIcon />
            Encerrar
          </Button>
        )}
      </div>

      <header className="leading-none">
        <span className="text-gray-400 font-bold text-xs">{call.protocol}</span>
        <p className="font-bold text-gray-100 line-clamp-1 mt-1">
          {call.title}
        </p>
        <span className="text-xs">{call.service}</span>
      </header>

      <div className="flex items-center justify-between gap-1 border-b border-gray-500 pb-4">
        <p className="text-xs">{formatDate(call.updatedAt)}</p>
        <p className="text-sm">
          <span className="text-xs font-bold">R$</span>
          {formatCurrency(call.totalValue).replace(/[A-Z]\$/g, "")}
        </p>
      </div>

      <div className="flex items-center justify-between gap-1 [&_span]:hidden!">
        <Avatar
          avatar={call.client.image}
          alt={call.client.name}
          containerClassName="text-xs font-bold"
        >
          {call.client.name}
        </Avatar>
        <CallStatus status={call.status} />
      </div>
    </div>
  )
}
