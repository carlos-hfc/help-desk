import { EyeIcon } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { TagTime } from "@/components/hour-tag"
import { TableCell, TableRow } from "@/components/table"

export function TechniciansTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Avatar name="Carlos Faustino" />
      </TableCell>
      <TableCell className="max-lg:hidden">email@email.com</TableCell>
      <TableCell>
        <div className="space-x-1">
          <TagTime>08:00</TagTime>
          <TagTime>+7</TagTime>
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="secondary"
          size="sm"
          icon
        >
          <EyeIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
