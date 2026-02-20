import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { TrashIcon, UploadIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"

import { useAuth } from "@/contexts/auth"
import { getProfile } from "@/http/get-profile"
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

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const { register } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    values: {
      email: data?.user.email ?? "",
      name: data?.user.name ?? "",
    },
  })

  return (
    <DialogContent asChild>
      <form>
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
              {...register("name")}
            />

            <Input
              label="E-mail"
              type="email"
              {...register("email")}
            />

            <div className="relative">
              <Input
                label="Senha"
                type="password"
                defaultValue="12345678"
                readOnly
              />

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute right-0 bottom-2"
                  >
                    Alterar
                  </Button>
                </DialogTrigger>

                <DialogUpdatePassword />
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
          <Button>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
