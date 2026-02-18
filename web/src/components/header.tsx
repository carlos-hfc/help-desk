import {
  BriefcaseBusinessIcon,
  CircleUserIcon,
  ClipboardListIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react"

import logolight from "@/assets/logo-light.png"

import { Button } from "./button"
import { NavLink } from "./nav-link"

export function Header() {
  return (
    <header className="bg-gray-100 p-6 lg:p-0 w-full h-dvh">
      <div className="lg:w-52 flex items-center lg:items-start lg:flex-col gap-4 lg:h-full relative">
        <input
          type="checkbox"
          id="menu-toggle"
          className="peer/menu hidden"
          aria-label="Abrir e fechar menu"
        />

        <Button
          icon
          className="lg:hidden"
        >
          <label
            htmlFor="menu-toggle"
            className="size-full grid place-items-center"
          >
            <MenuIcon />
          </label>
        </Button>

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
              Admin
            </span>
          </div>
        </div>

        <div className="absolute lg:static overflow-hidden top-18 z-1 h-0 lg:h-auto peer-checked/menu:h-auto w-full">
          <nav className="flex flex-col gap-0.5 w-full p-5 lg:p-4 bg-gray-100 rounded-lg">
            <span className="lg:hidden uppercase text-gray-400 text-xs font-bold mb-4">
              Menu
            </span>

            <NavLink to="/dashboard">
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
            <NavLink to="/">
              <WrenchIcon />
              Serviços
            </NavLink>
            <NavLink to="/">
              <ClipboardListIcon />
              Meus chamados
            </NavLink>
            <NavLink to="/">
              <PlusIcon />
              Criar chamado
            </NavLink>
          </nav>
        </div>

        <div className="lg:mt-auto w-full relative">
          <input
            type="checkbox"
            id="profile-toggle"
            className="peer/profile hidden"
            aria-label="Abrir e fechar menu do perfil"
          />

          <div className="absolute lg:relative overflow-hidden top-18 lg:top-20 left-0 lg:left-56 z-1 h-0 peer-checked/profile:h-auto w-full">
            <nav className="flex flex-col gap-0.5 w-full p-5 lg:p-4 bg-gray-100 rounded-lg">
              <span className="uppercase text-gray-400 text-xs font-bold mb-4">
                Opções
              </span>

              <span className="flex h-10 items-center gap-3 text-gray-600 text-sm px-0 [&>svg]:size-5 w-full rounded-md">
                <CircleUserIcon />
                Perfil
              </span>
              <span className="flex h-10 items-center gap-3 text-feedback-danger text-sm px-0 [&>svg]:size-5 w-full rounded-md">
                <LogOutIcon />
                Sair
              </span>
            </nav>
          </div>

          <label
            htmlFor="profile-toggle"
            className="lg:w-full lg:border-t border-gray-200 lg:px-4 lg:py-5 flex items-center gap-3 lg:hover:bg-gray-200"
          >
            <div className="rounded-full bg-blue-dark size-10 text-gray-600 content-center text-center">
              UA
            </div>

            <div className="hidden lg:block">
              <span className="block text-gray-600 text-sm">Usuario admin</span>
              <span className="block text-gray-400 text-xs">
                admin@email.com
              </span>
            </div>
          </label>
        </div>
      </div>
    </header>
  )
}
