import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { Button } from "@/components/button"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog"
import { Input } from "@/components/input"
import type { ListServicesResponse, Service } from "@/http/list-services"
import { registerService } from "@/http/register-service"
import { updateService } from "@/http/update-service"
import { queryClient } from "@/lib/react-query"

const registerServiceSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  price: z.coerce
    .number<number>("Valor é obrigatório")
    .positive("Valor deve ser positivo"),
})

type RegisterServiceSchema = z.infer<typeof registerServiceSchema>

interface DialogServiceProps {
  service?: Service
}

export function DialogService({ service }: DialogServiceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterServiceSchema>({
    resolver: zodResolver(registerServiceSchema),
    values: {
      name: service?.name ?? "",
      price: service?.price ?? 1,
    },
  })

  const { mutateAsync: registerServiceFn } = useMutation({
    mutationFn: registerService,
    onSuccess({ serviceId }, variables) {
      toast.success("Serviço cadastrado com sucesso!")

      const cached = queryClient.getQueryData<ListServicesResponse>([
        "services",
      ])

      if (cached) {
        queryClient.setQueryData<ListServicesResponse>(["services"], {
          ...cached,
          services: [
            ...cached.services,
            {
              id: serviceId,
              isActive: true,
              ...variables,
            },
          ],
        })
      }

      reset()
    },
    onError() {
      toast.error("Erro ao cadastrar um novo serviço. Tente novamente")
    },
  })

  const { mutateAsync: updateServiceFn } = useMutation({
    mutationFn: updateService,
    onSuccess(_, variables) {
      toast.success("Serviço atualizado com sucesso!")

      const cached = queryClient.getQueryData<ListServicesResponse>([
        "services",
      ])

      if (cached) {
        const services = cached.services.map(service => {
          if (service.id === variables.id) {
            return { ...service, ...variables }
          }

          return service
        })

        queryClient.setQueryData<ListServicesResponse>(["services"], {
          ...cached,
          services,
        })
      }
    },
    onError() {
      toast.error("Erro ao atualizar o serviço. Tente novamente")
    },
  })

  async function handleStoreService({ name, price }: RegisterServiceSchema) {
    if (service) {
      return await updateServiceFn({
        name,
        price,
        id: service.id,
      })
    }

    await registerServiceFn({ name, price })
  }

  return (
    <DialogContent
      asChild
      aria-describedby={undefined}
      onEscapeKeyDown={() => reset()}
      onInteractOutside={() => reset()}
      onPointerDownOutside={() => reset()}
    >
      <form onSubmit={handleSubmit(handleStoreService)}>
        <DialogHeader>
          <DialogTitle>
            {service ? "Edição do serviço" : "Cadastro do serviço"}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <Input
            label="Nome"
            placeholder="Nome do serviço"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Valor"
            placeholder="0,00"
            adornment="R$"
            type="number"
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
            step={0.01}
            {...register("price")}
          />
        </DialogBody>

        <DialogFooter>
          <Button disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
