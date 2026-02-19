import { EyeIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"
import { TableCell, TableRow } from "@/components/table"

export function CallsTableRow() {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell className="text-xs">13/04/25 20:20</TableCell>
      <TableCell className="text-xs font-bold hidden lg:table-cell">
        0003
      </TableCell>
      <TableCell>
        <span className="block font-bold">Rede lenta</span>
        <span className="block text-xs">Instacao de rede</span>
      </TableCell>
      <TableCell className="hidden lg:table-cell">R$ 180,00</TableCell>
      <TableCell className="hidden lg:table-cell">
        <Avatar alt="Carlos Faustino">Carlos Faustino</Avatar>
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <Avatar alt="Carlos Faustino">Carlos Faustino</Avatar>
      </TableCell>
      <TableCell>
        <CallStatus status="OPEN" />
      </TableCell>
      <TableCell>
        <Button
          variant="link"
          size="sm"
          icon
          onClick={() => navigate("/dashboard/1")}
        >
          <EyeIcon className="text-gray-200" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
