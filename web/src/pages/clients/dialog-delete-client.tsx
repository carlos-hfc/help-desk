import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

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
import { deleteClient } from "@/http/delete-client"
import type { Client, ListClientsResponse } from "@/http/list-clients"
import { queryClient } from "@/lib/react-query"

interface DialogDeleteClientProps {
  client: Client
}

export function DialogDeleteClient({ client }: DialogDeleteClientProps) {
  const { mutateAsync: deleteClientFn, isPending } = useMutation({
    mutationFn: deleteClient,
    onSuccess(_, { id }) {
      toast.success("Cliente excluído com sucesso")

      const cached = queryClient.getQueryData<ListClientsResponse>(["clients"])

      if (cached) {
        queryClient.setQueryData<ListClientsResponse>(["clients"], {
          ...cached,
          clients: cached.clients.filter(client => client.id !== id),
        })
      }
    },
    onError() {
      toast.error("Erro ao excluir cliente. Tente novamente")
    },
  })

  return (
    <DialogContent aria-disabled={isPending}>
      <DialogHeader>
        <DialogTitle>Excluir cliente</DialogTitle>
      </DialogHeader>

      <DialogBody className="space-y-5">
        <p>
          Deseja realmente excluir <strong>{client.name}</strong>?
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
        <Button onClick={() => deleteClientFn({ id: client.id })}>
          Sim, excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
