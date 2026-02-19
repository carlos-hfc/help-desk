import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu"
import { CircleUserIcon, LogOutIcon } from "lucide-react"

import { cn } from "@/utils/cn"

import { DialogTrigger } from "./dialog"

export function MenuProfile({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        "flex flex-col gap-0.5 me-5 bg-gray-100 rounded-lg p-4",
        className,
      )}
      {...props}
    >
      <DropdownMenuLabel className="uppercase text-gray-400 text-xs font-bold mb-4">
        Opções
      </DropdownMenuLabel>

      <DialogTrigger asChild>
        <DropdownMenuItem className="cursor-default flex items-center gap-3 text-gray-600 text-sm [&>svg]:size-5 w-full rounded-md hover:bg-gray-200 p-3 focus:bg-gray-200 outline-none">
          <CircleUserIcon />
          Perfil
        </DropdownMenuItem>
      </DialogTrigger>
      <DropdownMenuItem className="cursor-default flex items-center gap-3 text-feedback-danger text-sm [&>svg]:size-5 w-full rounded-md hover:bg-gray-200 p-3 focus:bg-gray-200 outline-none">
        <LogOutIcon />
        Sair
      </DropdownMenuItem>
    </nav>
  )
}
