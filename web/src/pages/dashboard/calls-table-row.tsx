import { EyeIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { TableCell, TableRow } from "@/components/table"
import type { Call } from "@/http/list-calls"
import { formatCurrency } from "@/utils/format-currency"

interface CallsTableRowProps {
  call: Call
}

export function CallsTableRow({ call }: CallsTableRowProps) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell className="text-xs">{call.updatedAt}</TableCell>
      <TableCell className="text-xs font-bold hidden lg:table-cell">
        {call.protocol}
      </TableCell>
      <TableCell>
        <span className="block font-bold">{call.title}</span>
        <span className="block text-xs">{call.service}</span>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {formatCurrency(call.totalValue)}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Avatar
          avatar={call.client.image}
          alt={call.client.name}
        >
          {call.client.name}
        </Avatar>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Avatar
          avatar={call.technician.image}
          alt={call.technician.name}
        >
          {call.technician.name}
        </Avatar>
      </TableCell>
      <TableCell>
        <CallStatus status={call.status} />
      </TableCell>
      <TableCell>
        <Button
          variant="link"
          size="sm"
          icon
          onClick={() => navigate(`/${call.id}`)}
        >
          <EyeIcon className="text-gray-200" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
