import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router"
import z from "zod"

import { Button } from "@/components/button"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog"
import {
  Select,
  SelectContent,
  SelectFormLabel,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import { Skeleton } from "@/components/skeleton"
import { addAdditionalService } from "@/http/add-additional-service"
import type { GetCallResponse } from "@/http/get-call"
import type { ListCallsResponse } from "@/http/list-calls"
import { listServices } from "@/http/list-services"
import { queryClient } from "@/lib/react-query"

const addAdditionalServiceSchema = z.object({
  serviceId: z.uuid(),
})

type AddAdditionalServiceSchema = z.infer<typeof addAdditionalServiceSchema>

interface DialogAdditionalServiceProps {
  selectedServices: string[]
  open: boolean
  onOpenChange(open: boolean): void
}

export function DialogAdditionalService({
  selectedServices,
  open,
  onOpenChange,
}: DialogAdditionalServiceProps) {
  const { id } = useParams<"id">()

  const { control, handleSubmit } = useForm<AddAdditionalServiceSchema>({
    resolver: zodResolver(addAdditionalServiceSchema),
  })

  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: listServices,
    enabled: open,
  })

  const { mutateAsync: addAdditionalServiceFn, isPending } = useMutation({
    mutationFn: addAdditionalService,
    onSuccess(_, { callId, serviceId }) {
      const callsListCache = queryClient.getQueriesData<
        ListCallsResponse | GetCallResponse
      >({
        queryKey: ["calls"],
      })

      const selectedService = data?.services.find(
        service => service.id === serviceId,
      )

      callsListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) return

        if ("calls" in cacheData) {
          queryClient.setQueryData<ListCallsResponse>(cacheKey, {
            ...cacheData,
            calls: cacheData.calls.map(call => {
              if (call.id === callId) {
                return {
                  ...call,
                  updatedAt: new Date().toISOString(),
                  totalValue: call.totalValue + (selectedService?.price ?? 0),
                }
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
              updatedAt: new Date().toISOString(),
              totalValue:
                cacheData.call.totalValue + (selectedService?.price ?? 0),
              services: [
                ...cacheData.call.services,
                {
                  createdBy: "TECHNICIAN",
                  id: serviceId,
                  name: selectedService?.name ?? "",
                  price: selectedService?.price ?? 0,
                  isActive: true,
                },
              ],
            },
          })
        }
      })

      onOpenChange(false)
    },
  })

  async function handleAddService({ serviceId }: AddAdditionalServiceSchema) {
    await addAdditionalServiceFn({
      callId: String(id),
      serviceId,
    })
  }

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Serviço adicional</DialogTitle>
      </DialogHeader>

      <DialogBody>
        <Controller
          name="serviceId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
            >
              <SelectFormLabel>Serviço</SelectFormLabel>

              <SelectTrigger>
                {isLoading ? (
                  <Skeleton className="lg:w-60" />
                ) : (
                  <SelectValue placeholder="Selecione o serviço" />
                )}
              </SelectTrigger>

              <SelectContent>
                <SelectLabel>Opções</SelectLabel>

                {data?.services
                  .filter(service => !selectedServices.includes(service.id))
                  .map(service => (
                    <SelectItem
                      key={service.id}
                      value={service.id}
                    >
                      {service.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        />
      </DialogBody>

      <DialogFooter>
        <Button
          onClick={handleSubmit(handleAddService)}
          disabled={isPending}
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
