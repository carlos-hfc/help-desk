import { EyeIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { TableCell, TableRow } from "@/components/table"
import { useAuth } from "@/contexts/auth"
import type { Call } from "@/http/list-calls"
import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"

interface CallsTableRowProps {
  call: Call
}

export function CallsTableRow({ call }: CallsTableRowProps) {
  const { IS_CLIENT, IS_TECHNICIAN } = useAuth()

  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell className="text-xs">{formatDate(call.updatedAt)}</TableCell>
      <TableCell className="text-xs font-bold max-lg:hidden">
        {call.protocol}
      </TableCell>
      <TableCell>
        <span className="block font-bold">{call.title}</span>
        <span className="block text-xs">{call.service}</span>
      </TableCell>
      <TableCell className="max-lg:hidden">
        {formatCurrency(call.totalValue)}
      </TableCell>
      <TableCell
        hidden={IS_CLIENT}
        className="max-lg:hidden"
      >
        <Avatar
          avatar={call.client.image}
          alt={call.client.name}
        >
          {call.client.name}
        </Avatar>
      </TableCell>
      <TableCell
        hidden={IS_TECHNICIAN}
        className="max-lg:hidden"
      >
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
