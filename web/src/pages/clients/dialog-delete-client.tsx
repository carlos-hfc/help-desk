import { Button } from "@/components/button"
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog"

export function DialogDeleteClient() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir cliente</DialogTitle>
      </DialogHeader>

      <DialogBody className="space-y-5">
        <p>
          Deseja realmente excluir <strong>Carlos Faustino</strong>?
        </p>

        <DialogDescription>
          Ao excluir, todos os chamados deste cliente serão removidos e esta
          ação não poderá ser desfeita.
        </DialogDescription>
      </DialogBody>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
        <Button>Sim, excluir</Button>
      </DialogFooter>
    </DialogContent>
  )
}
