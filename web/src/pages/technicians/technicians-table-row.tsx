import { EyeIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { TableCell, TableRow } from "@/components/table"
import { TagTime } from "@/components/tag-time"

export function TechniciansTableRow() {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>
        <Avatar name="Carlos Faustino" />
      </TableCell>
      <TableCell className="max-lg:hidden">email@email.com</TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <TagTime aria-disabled>08:00</TagTime>
          <TagTime aria-disabled>+7</TagTime>
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="link"
          size="sm"
          icon
          onClick={() => navigate("/technicians/1")}
        >
          <EyeIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
