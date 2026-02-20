import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { TrashIcon, UploadIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { useAuth } from "@/contexts/auth"
import { getProfile, type GetProfileResponse } from "@/http/get-profile"
import { updateProfile } from "@/http/update-profile"
import { queryClient } from "@/lib/react-query"
import { hours } from "@/utils/hours"

import { Avatar } from "./avatar"
import { Button } from "./button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { DialogUpdatePassword } from "./dialog-update-password"
import { Input } from "./input"
import { TagTime } from "./tag-time"

const profileSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email("E-mail inválido"),
})

type ProfileSchema = z.infer<typeof profileSchema>

export function DialogProfile() {
  const { IS_TECHNICIAN } = useAuth()

  const [open, setOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    values: {
      email: data?.user.email ?? "",
      name: data?.user.name ?? "",
    },
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, email }) {
      toast.success("Perfil atualizado com sucesso")

      const cached = queryClient.getQueryData<GetProfileResponse>(["profile"])

      if (cached) {
        queryClient.setQueryData<GetProfileResponse>(["profile"], {
          ...cached,
          user: {
            ...cached.user,
            name: String(name ?? data?.user.name),
            email: String(email ?? data?.user.email),
          },
        })
      }
    },
    onError() {
      toast.error(
        "Erro ao atualizar o perfil. Verifique as informações e tente novamente",
      )
    },
  })

  async function handleUpdateProfile({ email, name }: ProfileSchema) {
    await updateProfileFn({
      email,
      name,
    })
  }

  return (
    <DialogContent
      asChild
      aria-describedby={undefined}
    >
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
        </DialogHeader>

        <DialogBody className="grid gap-5">
          <div className="flex items-center gap-3">
            <Avatar
              avatar={data?.user.image}
              alt={data?.user.name ?? ""}
              className="size-12 text-lg"
            />

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
              >
                <UploadIcon />
                Nova imagem
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                icon
              >
                <TrashIcon className="text-feedback-danger" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Nome"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="E-mail"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">
              <Input
                label="Senha"
                type="password"
                defaultValue="12345678"
                readOnly
              />

              <Dialog
                open={open}
                onOpenChange={setOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute right-0 bottom-2"
                  >
                    Alterar
                  </Button>
                </DialogTrigger>

                <DialogUpdatePassword setOpen={setOpen} />
              </Dialog>
            </div>
          </div>
        </DialogBody>

        {IS_TECHNICIAN && (
          <DialogBody className="grid gap-3 px-7 py-5">
            <header>
              <h3 className="font-bold text-sm">Disponibilidade</h3>
              <span className="text-xs text-gray-300">
                Horários de atendimento definidos pelo admin
              </span>
            </header>

            <div className="flex items-center flex-wrap gap-1">
              {hours.map(hour => (
                <TagTime
                  key={hour}
                  aria-disabled
                >
                  {hour}
                </TagTime>
              ))}
            </div>
          </DialogBody>
        )}

        <DialogFooter>
          <Button disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
