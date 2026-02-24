import { TableHead, TableRow } from "@/components/table"

export function TechniciansTableHead() {
  return (
    <thead>
      <TableRow className="text-gray-400">
        <TableHead className="lg:min-w-40">Nome</TableHead>
        <TableHead className="max-lg:hidden lg:min-w-40">E-mail</TableHead>
        <TableHead className="w-36 lg:min-w-40">Disponibilidade</TableHead>
        <TableHead className="w-12" />
      </TableRow>
    </thead>
  )
}
