import { ArrowLeftIcon } from "lucide-react"

import { Button } from "./button"
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Input } from "./input"

export function DialogUpdatePassword() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogClose asChild>
          <Button
            icon
            variant="link"
          >
            <ArrowLeftIcon />
          </Button>
        </DialogClose>

        <DialogTitle>Alterar senha</DialogTitle>
      </DialogHeader>

      <DialogBody className="grid gap-5">
        <Input
          label="Senha atual"
          placeholder="Digite sua senha atual"
          helperText="Mínimo de 6 dígitos"
        />

        <Input
          label="Nova senha"
          placeholder="Digite sua nova senha"
          helperText="Mínimo de 6 dígitos"
        />
      </DialogBody>

      <DialogFooter>
        <Button>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  )
}
