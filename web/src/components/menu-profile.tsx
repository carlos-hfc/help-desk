import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import { CircleUserIcon, LogOutIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { signOut } from "@/http/sign-out"
import { queryClient } from "@/lib/react-query"
import { cn } from "@/utils/cn"

import { DialogTrigger } from "./dialog"

export function MenuProfile({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  const navigate = useNavigate()

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
    onSuccess() {
      queryClient.clear()
      navigate("/auth/sign-in", { replace: true })
    },
  })

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
      <DropdownMenuItem
        onClick={() => signOutFn()}
        className="cursor-default flex items-center gap-3 text-feedback-danger text-sm [&>svg]:size-5 w-full rounded-md hover:bg-gray-200 p-3 focus:bg-gray-200 outline-none"
      >
        <LogOutIcon />
        Sair
      </DropdownMenuItem>
    </nav>
  )
}
