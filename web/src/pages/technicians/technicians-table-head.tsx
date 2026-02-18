import { TableHead, TableRow } from "@/components/table"

export function TechniciansTableHead() {
  return (
    <thead>
      <TableRow className="text-gray-400">
        <TableHead>Nome</TableHead>
        <TableHead className="max-lg:hidden">E-mail</TableHead>
        <TableHead className="max-lg:w-36">Disponibilidade</TableHead>
        <TableHead className="w-12" />
      </TableRow>
    </thead>
  )
}
