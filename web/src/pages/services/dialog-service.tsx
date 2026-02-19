import { Button } from "@/components/button"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog"
import { Input } from "@/components/input"

export function DialogService() {
  return (
    <DialogContent
      aria-describedby={undefined}
      asChild
    >
      <form>
        <DialogHeader>
          <DialogTitle>Cadastro de serviço</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <Input
            label="Nome"
            placeholder="Nome do serviço"
          />
          <Input
            label="Valor"
            placeholder="0,00"
            adornment="R$"
          />
        </DialogBody>

        <DialogFooter>
          <Button>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
