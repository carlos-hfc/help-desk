import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { PageTitle } from "@/components/page-title"
import { TagTime } from "@/components/tag-time"
import type { ListTechniciansResponse } from "@/http/list-technicians"
import { registerTechnician } from "@/http/register-technician"
import { queryClient } from "@/lib/react-query"
import { hours } from "@/utils/hours"

const technicianStoreSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  hours: z
    .array(z.string(), "Horário é obrigatório")
    .nonempty("Horário é obrigatório"),
})

type TechnicianStoreSchema = z.infer<typeof technicianStoreSchema>

export function TechnicianDetailsPage() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TechnicianStoreSchema>({
    resolver: zodResolver(technicianStoreSchema),
  })

  const { mutateAsync: registerTechnicianFn } = useMutation({
    mutationFn: registerTechnician,
    onSuccess({ technicianId }, variables) {
      toast.success("Técnico registrado com sucesso")

      const cached = queryClient.getQueryData<ListTechniciansResponse>([
        "technicians",
      ])

      if (cached) {
        queryClient.setQueryData<ListTechniciansResponse>(["technicians"], {
          ...cached,
          technicians: [
            ...cached.technicians,
            {
              ...variables,
              id: technicianId,
              image: null,
            },
          ],
        })

        reset()
      }
    },
    onError() {
      toast.error("Erro ao registrar um novo técnico. Tente novamente")
    },
  })

  async function handleStoreTechnician({
    email,
    hours,
    name,
  }: TechnicianStoreSchema) {
    await registerTechnicianFn({ email, hours, name })
  }

  return (
    <form
      onSubmit={handleSubmit(handleStoreTechnician)}
      className="max-w-4xl mx-auto w-full flex flex-col gap-6"
    >
      <PageTitle
        title="Perfil de técnico"
        backButton="/technicians"
      >
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
        >
          Cancelar
        </Button>
        <Button disabled={isSubmitting}>Salvar</Button>
      </PageTitle>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-gray-200">
        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 h-full lg:w-80">
          <header className="space-y-1">
            <h2 className="font-bold">Dados pessoais</h2>
            <span className="text-gray-300 text-xs">
              Defina as informações do perfil de técnico
            </span>
          </header>

          <div className="space-y-4">
            {/* <Avatar
              alt="Carlos Faustino"
              className="size-12 text-xl"
            /> */}

            <Input
              label="Nome"
              placeholder="Nome completo"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="E-mail"
              placeholder="exemplo@email.com"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </div>
        </div>

        <div className="border border-gray-500 rounded-xl p-5 flex flex-col gap-5 h-full flex-1">
          <header className="space-y-1">
            <h2 className="font-bold">Horários de atendimento</h2>
            <span className="text-gray-300 text-xs">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </span>
          </header>

          <div className="grid gap-2">
            <div className="flex flex-wrap gap-2">
              {hours.map(hour => (
                <Controller
                  key={hour}
                  name="hours"
                  control={control}
                  render={({ field }) => (
                    <TagTime
                      selected={field.value?.includes(hour)}
                      onClick={() =>
                        !field.value?.includes(hour) &&
                        field.onChange([...(field.value ?? []), hour])
                      }
                      onRemove={() =>
                        field.onChange(
                          field.value?.filter(item => item !== hour),
                        )
                      }
                    >
                      {hour}
                    </TagTime>
                  )}
                />
              ))}
            </div>

            {errors.hours?.message && (
              <span className="text-xs text-feedback-danger">
                {errors.hours.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
