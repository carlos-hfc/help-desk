import { TableHead, TableRow } from "@/components/table"
import { useAuth } from "@/contexts/auth"

export function CallsTableHead() {
  const { IS_CLIENT } = useAuth()

  return (
    <thead>
      <TableRow className="font-bold text-gray-400">
        <TableHead className="w-20 lg:w-32">Atualizado em</TableHead>
        <TableHead className="max-lg:hidden w-16">ID</TableHead>
        <TableHead>Título e Serviço</TableHead>
        <TableHead className="max-lg:hidden w-28">Valor total</TableHead>
        <TableHead
          hidden={IS_CLIENT}
          className="max-lg:hidden w-40"
        >
          Cliente
        </TableHead>
        <TableHead className="max-lg:hidden w-40">Técnico</TableHead>
        <TableHead className="w-16">Status</TableHead>
        <TableHead className="w-12" />
      </TableRow>
    </thead>
  )
}
