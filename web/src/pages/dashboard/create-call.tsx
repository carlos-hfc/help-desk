import { zodResolver } from "@hookform/resolvers/zod"
import { SelectValue } from "@radix-ui/react-select"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { PageTitle } from "@/components/page-title"
import {
  Select,
  SelectContent,
  SelectFormLabel,
  SelectHelperText,
  SelectItem,
  SelectTrigger,
} from "@/components/select"
import { Skeleton } from "@/components/skeleton"
import { createCall } from "@/http/create-call"
import { getProfile } from "@/http/get-profile"
import type { ListCallsResponse } from "@/http/list-calls"
import { listServices } from "@/http/list-services"
import { listTechnicians } from "@/http/list-technicians"
import { queryClient } from "@/lib/react-query"
import { formatCurrency } from "@/utils/format-currency"

const createCallSchema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatório"),
  serviceId: z.uuid("Categoria do serviço é obrigatória"),
  technicianId: z.uuid("Técnico responsável é obrigatório"),
  hour: z.string("Horário é obrigatório").nonempty("Horário é obrigatório"),
})

type CreateCallSchema = z.infer<typeof createCallSchema>

export function CreateCall() {
  const navigate = useNavigate()

  const { data: dataProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const { data: dataServices, isLoading: isLoadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: listServices,
  })

  const { data: dataTechnicians, isLoading: isLoadingTechnicians } = useQuery({
    queryKey: ["technicians"],
    queryFn: listTechnicians,
  })

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateCallSchema>({
    resolver: zodResolver(createCallSchema),
  })

  const technicianId = watch("technicianId")
  const serviceId = watch("serviceId")

  const selectedService = dataServices?.services.find(
    service => service.id === serviceId,
  )
  const selectedTechnician = dataTechnicians?.technicians.find(
    technician => technician.id === technicianId,
  )

  const { mutateAsync: createCallFn } = useMutation({
    mutationFn: createCall,
    onSuccess({ callId, protocol }, variables) {
      toast.success("Chamado criado com sucesso!")

      const cached = queryClient.getQueryData<ListCallsResponse>(["calls"])

      if (cached) {
        queryClient.setQueryData<ListCallsResponse>(["calls"], {
          ...cached,
          calls: [
            {
              id: callId,
              protocol,
              totalValue: selectedService?.price ?? 0,
              service: selectedService?.name ?? "",
              status: "OPEN",
              updatedAt: new Date().toISOString(),
              client: {
                name: dataProfile?.user.name ?? "",
                image: dataProfile?.user.image ?? null,
              },
              technician: {
                name: selectedTechnician?.name ?? "",
                image: selectedTechnician?.image ?? null,
              },
              ...variables,
            },
            ...cached.calls,
          ],
        })
      }

      navigate("/")
    },
    onError() {
      toast.error("Erro ao criar o chamado, tente novamente")
    },
  })

  async function handleCreateCall({
    description,
    hour,
    serviceId,
    technicianId,
    title,
  }: CreateCallSchema) {
    await createCallFn({
      description,
      hour,
      serviceId,
      technicianId,
      title,
    })
  }

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
      <PageTitle title="Novo chamado" />

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-gray-200">
        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-6 flex-1">
          <header>
            <h2 className="font-bold">Informações</h2>
            <span className="text-gray-300 text-xs">
              Descreva o serviço que você necessita para atendermos
            </span>
          </header>

          <div className="grid gap-4">
            <Input
              label="Título"
              placeholder="Digite um título para o chamado"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              {...register("title")}
            />

            <Input
              textarea
              label="Descrição"
              placeholder="Descreva o que está acontecendo"
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              {...register("description")}
            />

            <Controller
              name="serviceId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  error={Boolean(errors.serviceId)}
                  {...field}
                >
                  <SelectFormLabel>Categoria de serviço</SelectFormLabel>

                  <SelectTrigger>
                    {isLoadingServices ? (
                      <Skeleton className="lg:w-60" />
                    ) : (
                      <SelectValue placeholder="Selecione a categoria de atendimento" />
                    )}
                  </SelectTrigger>

                  <SelectContent>
                    {dataServices?.services.map(service => (
                      <SelectItem
                        key={service.id}
                        value={service.id}
                      >
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>

                  {errors.serviceId?.message && (
                    <SelectHelperText>
                      {errors.serviceId.message}
                    </SelectHelperText>
                  )}
                </Select>
              )}
            />

            <Controller
              name="technicianId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  {...field}
                  error={Boolean(errors.technicianId)}
                >
                  <SelectFormLabel>Técnico responsável</SelectFormLabel>

                  <SelectTrigger>
                    {isLoadingTechnicians ? (
                      <Skeleton className="lg:w-80" />
                    ) : (
                      <SelectValue placeholder="Selecione o técnico responsável pelo chamado" />
                    )}
                  </SelectTrigger>

                  <SelectContent>
                    {dataTechnicians?.technicians.map(technician => (
                      <SelectItem
                        key={technician.id}
                        value={technician.id}
                      >
                        <Avatar
                          avatar={technician.image}
                          alt={technician.name}
                        >
                          {technician.name}
                        </Avatar>
                      </SelectItem>
                    ))}
                  </SelectContent>

                  {errors.technicianId?.message && (
                    <SelectHelperText>
                      {errors.technicianId.message}
                    </SelectHelperText>
                  )}
                </Select>
              )}
            />

            <Controller
              name="hour"
              control={control}
              disabled={!technicianId}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  {...field}
                  error={Boolean(errors.hour)}
                >
                  <SelectFormLabel>Horário de disponibilidade</SelectFormLabel>

                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>

                  <SelectContent className="max-h-60">
                    {dataTechnicians?.technicians
                      .find(technician => technician.id === technicianId)
                      ?.hours.map(hour => (
                        <SelectItem
                          key={hour}
                          value={hour}
                        >
                          {hour}
                        </SelectItem>
                      ))}
                  </SelectContent>

                  {errors.hour?.message && (
                    <SelectHelperText>{errors.hour.message}</SelectHelperText>
                  )}
                </Select>
              )}
            />
          </div>
        </div>

        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-6 h-full lg:w-80">
          <header>
            <h3 className="font-bold">Resumo</h3>
            <span className="text-gray-300 text-xs">Valores e detalhes</span>
          </header>

          <div className="grid gap-4">
            {selectedService?.name && (
              <div className="space-y-0.5">
                <span className="block text-gray-400 text-xs font-bold">
                  Categoria de serviço
                </span>
                <span className="block text-sm">{selectedService.name}</span>
              </div>
            )}

            {selectedService?.price && (
              <div className="space-y-0.5">
                <span className="block text-gray-400 text-xs font-bold">
                  Custo inicial
                </span>
                <p className="text-xl font-bold">
                  <span className="text-xs mr-1">R$</span>
                  {formatCurrency(selectedService.price).replace(
                    /[A-Z]\$/g,
                    "",
                  )}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit(handleCreateCall)}
            disabled={isSubmitting}
          >
            Criar chamado
          </Button>
        </div>
      </div>
    </div>
  )
}
