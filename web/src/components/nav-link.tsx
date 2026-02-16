import { NavLink as Nav, type NavLinkProps } from "react-router"

import { cn } from "@/utils/cn"

export function NavLink({ to, ...props }: NavLinkProps) {
  return (
    <Nav
      {...props}
      to={to}
      className={cn(
        "flex items-center gap-3 text-gray-600 text-sm p-3 [&>svg]:size-5 w-full lg:aria-[current=page]:font-bold aria-[current=page]:bg-blue-dark rounded-md hover:bg-gray-200 transition",
      )}
    />
  )
}
