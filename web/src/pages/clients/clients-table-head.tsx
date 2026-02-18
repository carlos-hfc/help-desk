import { TableHead, TableRow } from "@/components/table"

export function ClientsTableHead() {
  return (
    <thead>
      <TableRow className="text-gray-400">
        <TableHead>Nome</TableHead>
        <TableHead>E-mail</TableHead>
        <TableHead className="w-12" />
      </TableRow>
    </thead>
  )
}
