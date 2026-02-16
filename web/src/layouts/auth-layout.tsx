import { Outlet } from "react-router"

import logoDark from "@/assets/logo-dark.png"

export function AuthLayout() {
  return (
    <main className="h-dvh flex flex-col lg:flex-row relative overflow-hidden">
      <div className="bg-[url(@/assets/login-background.png)] bg-no-repeat w-full h-dvh bg-cover bg-center lg:bg-left" />

      <div className="w-full lg:w-1/2 absolute right-0 top-8 lg:top-3 bg-gray-600 rounded-3xl lg:rounded-tl-3xl lg:rounded-none">
        <div className="h-dvh py-8 lg:py-12 px-6 lg:px-0 flex flex-col gap-6 lg:gap-8 lg:max-w-100 w-full mx-auto">
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
