import { PenLineIcon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { CallStatus } from "@/components/call-status"

export function CallsTableRow() {
  return (
    <tr className="text-left text-sm text-gray-200">
      <td className="p-3 text-xs">13/04/25 20:20</td>
      <td className="p-3 text-xs font-bold hidden lg:table-cell">0003</td>
      <td className="p-3">
        <span className="block font-bold">Rede lenta</span>
        <span className="block text-xs">Instacao de rede</span>
      </td>
      <td className="p-3 hidden lg:table-cell">R$ 180,00</td>
      <td className="p-3 hidden lg:table-cell">
        <Avatar name="Carlos Faustino" />
      </td>
      <td className="p-3 hidden lg:table-cell">
        <Avatar name="Carlos Faustino" />
      </td>
      <td className="p-3">
        <CallStatus status="OPEN" />
      </td>
      <td className="p-3">
        <Button
          variant="secondary"
          size="sm"
          icon
        >
          <PenLineIcon className="text-gray-200" />
        </Button>
      </td>
    </tr>
  )
}
