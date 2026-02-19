import { TrashIcon, UploadIcon } from "lucide-react"

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

export function DialogProfile() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil</DialogTitle>
      </DialogHeader>

      <DialogBody className="grid gap-5">
        <div className="flex items-center gap-3">
          <Avatar
            alt="Carlos Faustino"
            className="size-12 text-lg"
          />

          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="sm"
            >
              <UploadIcon />
              Nova imagem
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon
            >
              <TrashIcon className="text-feedback-danger" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Input label="Nome" />

          <Input label="E-mail" />

          <div className="relative">
            <Input label="Senha" />

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

      <DialogFooter>
        <Button>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  )
}
