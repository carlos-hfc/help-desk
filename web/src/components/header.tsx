import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import {
  BriefcaseBusinessIcon,
  ClipboardListIcon,
  MenuIcon,
  PlusIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react"

import logolight from "@/assets/logo-light.png"
import { useAuth } from "@/contexts/auth"
import { getProfile } from "@/http/get-profile"
import { showRoleUser } from "@/utils/show-role-user"

import { Avatar } from "./avatar"
import { Button } from "./button"
import { Dialog } from "./dialog"
import { DialogProfile } from "./dialog-profile"
import { MenuProfile } from "./menu-profile"
import { NavLink } from "./nav-link"
import { Skeleton } from "./skeleton"

export function Header() {
  const { role, IS_ADMIN, IS_TECHNICIAN, IS_CLIENT, save } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profile = await getProfile()

      save(profile.user.role)
      return profile
    },
  })

  return (
    <header className="bg-gray-100 p-6 lg:p-0 w-full h-dvh">
      <div className="lg:w-52 flex items-center lg:items-start lg:flex-col gap-4 lg:h-full relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              icon
              className="lg:hidden outline-none"
            >
              <MenuIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              asChild
              sideOffset={16}
            >
              <nav className="max-lg:flex hidden flex-col justify-center ms-5 gap-0.5 w-[calc(100vw-40px)] p-5 bg-gray-100 rounded-lg *:outline-none">
                <DropdownMenuLabel className="lg:hidden uppercase text-gray-400 text-xs font-bold mb-4">
                  Menu
                </DropdownMenuLabel>

                {IS_ADMIN && (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink to="/">
                        <ClipboardListIcon />
                        Chamados
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/technicians">
                        <UsersIcon />
                        Técnicos
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/clients">
                        <BriefcaseBusinessIcon />
                        Clientes
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/services">
                        <WrenchIcon />
                        Serviços
                      </NavLink>
                    </DropdownMenuItem>
                  </>
                )}

                {IS_TECHNICIAN && (
                  <DropdownMenuItem asChild>
                    <NavLink to="/calls">
                      <ClipboardListIcon />
                      Meus chamados
                    </NavLink>
                  </DropdownMenuItem>
                )}

                {IS_CLIENT && (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink to="/calls">
                        <ClipboardListIcon />
                        Meus chamados
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/register-call">
                        <PlusIcon />
                        Criar chamado
                      </NavLink>
                    </DropdownMenuItem>
                  </>
                )}
              </nav>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>

        <div className="flex items-center gap-3 flex-1 lg:flex-none lg:p-6 lg:pt-9 lg:border-b border-gray-200 lg:w-full">
          <img
            src={logolight}
            alt="HelpDesk"
            className="size-10 shrink-0"
          />

          <div>
            <span className="block text-gray-600 font-bold text-xl">
              HelpDesk
            </span>
            <span className="block text-blue-light font-bold text-xs uppercase">
              {showRoleUser[role]}
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex flex-col gap-0.5 w-full p-4 bg-gray-100 rounded-lg">
          {isLoading ? (
            <>
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </>
          ) : (
            <>
              {IS_ADMIN && (
                <>
                  <NavLink to="/">
                    <ClipboardListIcon />
                    Chamados
                  </NavLink>
                  <NavLink to="/technicians">
                    <UsersIcon />
                    Técnicos
                  </NavLink>
                  <NavLink to="/clients">
                    <BriefcaseBusinessIcon />
                    Clientes
                  </NavLink>
                  <NavLink to="/services">
                    <WrenchIcon />
                    Serviços
                  </NavLink>
                </>
              )}

              {IS_TECHNICIAN && (
                <NavLink to="/">
                  <ClipboardListIcon />
                  Meus chamados
                </NavLink>
              )}

              {IS_CLIENT && (
                <>
                  <NavLink to="/">
                    <ClipboardListIcon />
                    Meus chamados
                  </NavLink>
                  <NavLink to="/register-call">
                    <PlusIcon />
                    Criar chamado
                  </NavLink>
                </>
              )}
            </>
          )}
        </nav>

        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full border-t border-gray-200 px-4 py-5 max-lg:hidden hover:bg-gray-200 mt-auto cursor-default">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                ) : (
                  <Avatar
                    avatar={data?.user.image}
                    alt={data?.user.name ?? ""}
                    className="size-10 text-base"
                  >
                    <div>
                      <span className="block text-gray-600 text-sm">
                        {data?.user.name}
                      </span>
                      <span className="block text-gray-400 text-xs">
                        {data?.user.email}
                      </span>
                    </div>
                  </Avatar>
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
              <DropdownMenuContent
                asChild
                side="right"
                sideOffset={16}
              >
                <MenuProfile className="w-48" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="lg:hidden">
                {isLoading ? (
                  <Skeleton className="size-10 rounded-full" />
                ) : (
                  <Avatar
                    avatar={data?.user.image}
                    alt={data?.user.name ?? ""}
                    className="size-10 text-base"
                  />
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
              <DropdownMenuContent
                asChild
                sideOffset={16}
              >
                <MenuProfile className="w-[calc(100vw-40px)]" />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>

          <DialogProfile />
        </Dialog>
      </div>
    </header>
  )
}
