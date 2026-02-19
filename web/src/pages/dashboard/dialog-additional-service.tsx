import { Button } from "@/components/button"
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog"
import {
  Select,
  SelectContent,
  SelectFormLabel,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/select"

export function DialogAdditionalService() {
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>Serviço adicional</DialogTitle>
      </DialogHeader>

      <DialogBody>
        <Select>
          <SelectFormLabel>Serviço</SelectFormLabel>

          <SelectTrigger>
            <SelectValue placeholder="Selecione o serviço" />
          </SelectTrigger>

          <SelectContent>
            <SelectLabel>Opções</SelectLabel>

            <SelectItem value="Item-1">Item-1</SelectItem>
            <SelectItem value="Item-2">Item-2</SelectItem>
            <SelectItem value="Item-3">Item-3</SelectItem>
            <SelectItem value="Item-4">Item-4</SelectItem>
            <SelectItem value="Item-5">Item-5</SelectItem>
          </SelectContent>
        </Select>
      </DialogBody>

      <DialogFooter>
        <Button>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  )
}
