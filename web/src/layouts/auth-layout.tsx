import { Outlet } from "react-router"

import logoDark from "@/assets/logo-dark.png"

export function AuthLayout() {
  return (
    <main className="min-h-dvh flex flex-col lg:flex-row relative">
      <div className="bg-[url(@/assets/login-background.png)] bg-no-repeat w-full h-dvh bg-cover bg-center lg:bg-left" />

      <div className="w-full lg:w-1/2 absolute right-0 bottom-0 h-[calc(100%-1rem)] lg:h-[calc(100%-.75rem)] bg-gray-600 rounded-t-3xl lg:rounded-tl-3xl lg:rounded-none">
        <div className="py-8 lg:py-12 px-6 lg:px-0 flex flex-col gap-6 lg:gap-8 lg:max-w-100 w-full mx-auto">
          <div className="flex items-center justify-center gap-3">
            <img
              src={logoDark}
              alt="HelpDesk"
              className="size-10 shrink-0"
            />

            <span className="text-blue-dark font-bold text-2xl">HelpDesk</span>
          </div>

          <Outlet />
        </div>
      </div>
    </main>
  )
}
