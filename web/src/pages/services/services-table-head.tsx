import { TableHead, TableRow } from "@/components/table"

export function ServicesTableHead() {
  return (
    <thead>
      <TableRow className="text-gray-400">
        <TableHead>Título</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead className="w-24">Status</TableHead>
        <TableHead className="w-22" />
      </TableRow>
    </thead>
  )
}
