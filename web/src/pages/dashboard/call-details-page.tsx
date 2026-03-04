import { useMutation, useQuery } from "@tanstack/react-query"
import { CheckCircleIcon, Clock2Icon, PlusIcon, TrashIcon } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { Dialog, DialogTrigger } from "@/components/dialog"
import { PageTitle } from "@/components/page-title"
import { useAuth } from "@/contexts/auth"
import { getCall, type GetCallResponse } from "@/http/get-call"
import type { CallStatusType, ListCallsResponse } from "@/http/list-calls"
import { startService } from "@/http/start-service"
import { queryClient } from "@/lib/react-query"
import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"

import { CallDetailsPageSkeleton } from "./call-details-page-skeleton"
import { DialogAdditionalService } from "./dialog-additional-service"

export function CallDetailsPage() {
  const [isOpenAdditionalServices, setIsOpenAdditionalServices] =
    useState(false)

  const { IS_CLIENT, IS_TECHNICIAN } = useAuth()

  const { id } = useParams<"id">()

  const { data, isLoading } = useQuery({
    queryKey: ["calls", id],
    queryFn: () => getCall({ id: String(id) }),
  })

  const serviceCreatedByClient = data?.call.services.find(
    service => service.createdBy === "CLIENT",
  )
  const servicesCreatedByTechnician = data?.call.services.filter(
    service => service.createdBy === "TECHNICIAN",
  )

  const selectedServices = [
    ...(servicesCreatedByTechnician?.map(service => service.id) ?? ""),
    serviceCreatedByClient?.id ?? "",
  ]

  const { mutateAsync: startServiceFn, isPending: isPendingStartService } =
    useMutation({
      mutationFn: startService,
      onSuccess(_, { id }) {
        const callsListCache = queryClient.getQueriesData<
          ListCallsResponse | GetCallResponse
        >({
          queryKey: ["calls"],
        })

        const payload = {
          status: "IN_PROGRESS" as CallStatusType,
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
      },
    })

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
      <PageTitle
        title="Chamado detalhado"
        backButton
      >
        {!IS_CLIENT && (
          <>
            {data?.call.status === "OPEN" && (
              <Button
                disabled={isPendingStartService}
                onClick={() => startServiceFn({ id: String(id) })}
              >
                <Clock2Icon />
                Iniciar atendimento
              </Button>
            )}
            {data?.call.status === "IN_PROGRESS" && (
              <Button variant="secondary">
                <CheckCircleIcon />
                Encerrar
              </Button>
            )}
          </>
        )}
      </PageTitle>

      {isLoading ? (
        <CallDetailsPageSkeleton />
      ) : (
        <div className="grid gap-4 lg:gap-x-6 lg:grid-cols-[auto_320px] text-gray-200">
          <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 lg:row-span-3 h-fit lg:col-1">
            <header className="font-bold">
              <div className="flex items-center justify-between">
                <span className="block text-gray-300 text-xs">
                  {data?.call.protocol}
                </span>
                <CallStatus status={data?.call.status ?? "OPEN"} />
              </div>

              <h2>{data?.call.title}</h2>
            </header>

            <div>
              <span className="text-gray-400 font-bold text-xs">Descricao</span>
              <p className="text-sm">{data?.call.description}</p>
            </div>

            <div>
              <span className="text-gray-400 font-bold text-xs">Categoria</span>
              <p className="text-sm">{serviceCreatedByClient?.name}</p>
            </div>

            <div className="flex items-center justify-between gap-8">
              <div className="w-full">
                <span className="text-gray-400 font-bold text-xs">
                  Criado em
                </span>
                <p className="text-sm">
                  {formatDate(data?.call.createdAt ?? "")}
                </p>
              </div>
              <div className="w-full">
                <span className="text-gray-400 font-bold text-xs">
                  Atualizado em
                </span>
                <p className="text-sm">
                  {formatDate(data?.call.updatedAt ?? "")}
                </p>
              </div>
            </div>

            {!IS_CLIENT && (
              <div>
                <span className="text-gray-400 font-bold text-xs mb-2 block">
                  Cliente
                </span>
                <Avatar alt="Carlos Faustino">Carlos Faustino</Avatar>
              </div>
            )}
          </div>

          <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-8 h-full lg:row-span-1 lg:col-2">
            <div>
              <span className="text-gray-400 font-bold text-xs mb-2 block">
                Tecnico responsavel
              </span>
              <Avatar
                avatar={data?.call.technician.image}
                alt={data?.call.technician.name ?? ""}
              >
                <div>
                  <span className="block">
                    {data?.call.technician.name ?? ""}
                  </span>
                  <span className="block text-gray-400 text-xs">
                    {data?.call.technician.email ?? ""}
                  </span>
                </div>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 text-xs">
                <span className="block text-gray-400 font-bold">Valores</span>
                <div className="flex justify-between">
                  <p>Preço base</p>
                  <p>{formatCurrency(serviceCreatedByClient?.price ?? 0)}</p>
                </div>
              </div>

              {servicesCreatedByTechnician &&
                servicesCreatedByTechnician?.length > 0 && (
                  <div className="space-y-2 text-xs">
                    <span className="block text-gray-400 font-bold">
                      Adicionais
                    </span>
                    <div>
                      {servicesCreatedByTechnician?.map(service => (
                        <div
                          key={service.id}
                          className="flex justify-between"
                        >
                          <p>{service.name}</p>
                          <p>{formatCurrency(service.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              <div className="pt-3 border-t border-gray-500 text-sm font-bold flex justify-between">
                <p>Total</p>
                <p>{formatCurrency(data?.call.totalValue ?? 0)}</p>
              </div>
            </div>
          </div>

          {IS_TECHNICIAN && data?.call.status !== "OPEN" && (
            <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-4 h-full text-xs lg:col-1">
              <div className="flex justify-between items-center">
                <span className="block text-gray-400 font-bold">
                  Serviços adicionais
                </span>

                <Dialog
                  open={isOpenAdditionalServices}
                  onOpenChange={setIsOpenAdditionalServices}
                >
                  <DialogTrigger asChild>
                    <Button
                      icon
                      size="sm"
                      aria-label="Adicionar serviço"
                      disabled={data?.call.status === "CLOSED"}
                    >
                      <PlusIcon />
                    </Button>
                  </DialogTrigger>

                  <DialogAdditionalService
                    open={isOpenAdditionalServices}
                    onOpenChange={setIsOpenAdditionalServices}
                    selectedServices={selectedServices}
                  />
                </Dialog>
              </div>

              {servicesCreatedByTechnician &&
                servicesCreatedByTechnician.length > 0 && (
                  <div className="divide-y divide-gray-500">
                    {servicesCreatedByTechnician.map(service => (
                      <div
                        key={service.id}
                        className="flex justify-between items-center gap-6 py-1"
                      >
                        <span className="block font-bold">{service.name}</span>

                        <span className="ml-auto">
                          {formatCurrency(service.price)}
                        </span>
                        <Button
                          icon
                          size="sm"
                          variant="link"
                          disabled={data?.call.status === "CLOSED"}
                          aria-label="Remover serviço"
                        >
                          <TrashIcon className="text-feedback-danger" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
