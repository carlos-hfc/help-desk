import { TableHead, TableRow } from "@/components/table"

export function CallsTableHead() {
  return (
    <thead>
      <TableRow className="font-bold text-gray-400">
        <TableHead className="w-20 lg:w-32">Atualizado em</TableHead>
        <TableHead className="hidden lg:table-cell w-16">ID</TableHead>
        <TableHead>Título e Serviço</TableHead>
        <TableHead className="hidden lg:table-cell w-28">Valor total</TableHead>
        <TableHead className="hidden lg:table-cell w-40">Cliente</TableHead>
        <TableHead className="hidden lg:table-cell w-40">Técnico</TableHead>
        <TableHead className="w-16">Status</TableHead>
        <TableHead className="w-12" />
      </TableRow>
    </thead>
  )
}
