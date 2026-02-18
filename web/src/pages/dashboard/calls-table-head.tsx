export function CallsTableHead() {
  return (
    <thead>
      <tr className="text-sm font-bold text-gray-400 text-left">
        <th className="p-3 w-20 lg:w-32">
          <span className="line-clamp-1">Atualizado em</span>
        </th>
        <th className="p-3 hidden lg:table-cell w-16">
          <span className="line-clamp-1">ID</span>
        </th>
        <th className="p-3">
          <span className="line-clamp-1">Título e Serviço</span>
        </th>
        <th className="p-3 hidden lg:table-cell w-28">
          <span className="line-clamp-1">Valor total</span>
        </th>
        <th className="p-3 hidden lg:table-cell w-40">
          <span className="line-clamp-1">Cliente</span>
        </th>
        <th className="p-3 hidden lg:table-cell w-40">
          <span className="line-clamp-1">Técnico</span>
        </th>
        <th className="p-3 w-16">
          <span className="line-clamp-1">Status</span>
        </th>
        <th className="p-3 w-12" />
      </tr>
    </thead>
  )
}
