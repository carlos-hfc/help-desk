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
import type { ListServicesResponse } from "@/http/list-services"
import { registerService } from "@/http/register-service"
import { queryClient } from "@/lib/react-query"

const registerServiceSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  price: z.coerce
    .number<number>("Valor é obrigatório")
    .positive("Valor deve ser positivo"),
})

type RegisterServiceSchema = z.infer<typeof registerServiceSchema>

export function DialogService() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterServiceSchema>({
    resolver: zodResolver(registerServiceSchema),
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

  async function handleStoreService({ name, price }: RegisterServiceSchema) {
    await registerServiceFn({ name, price })
  }

  return (
    <DialogContent
      aria-describedby={undefined}
      asChild
    >
      <form onSubmit={handleSubmit(handleStoreService)}>
        <DialogHeader>
          <DialogTitle>Cadastro de serviço</DialogTitle>
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
