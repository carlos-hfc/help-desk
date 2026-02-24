import { EyeIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { Avatar } from "@/components/avatar"
import { Button } from "@/components/button"
import { TableCell, TableRow } from "@/components/table"
import { TagTime } from "@/components/tag-time"
import type { Technician } from "@/http/list-technicians"

interface TechniciansTableRowProps {
  technician: Technician
}

export function TechniciansTableRow({ technician }: TechniciansTableRowProps) {
  const navigate = useNavigate()

  return (
    <TableRow>
      <TableCell>
        <Avatar
          avatar={technician.image}
          alt={technician.name}
        >
          {technician.name}
        </Avatar>
      </TableCell>
      <TableCell className="max-lg:hidden">{technician.email}</TableCell>
      <TableCell>
        <div className="flex lg:hidden items-center gap-1">
          <TagTime aria-disabled>{technician.hours.slice(0, 1)}</TagTime>

          {technician.hours.length > 1 && (
            <TagTime aria-disabled>+{technician.hours.slice(1).length}</TagTime>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-1">
          {technician.hours.slice(0, 5).map(hour => (
            <TagTime
              key={hour}
              aria-disabled
            >
              {hour}
            </TagTime>
          ))}

          {technician.hours.length > 5 && (
            <TagTime aria-disabled>+{technician.hours.slice(5).length}</TagTime>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="link"
          size="sm"
          icon
          onClick={() => navigate(`/technicians/${technician.id}`)}
        >
          <EyeIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
