import { Outlet } from "react-router"

export function AuthLayout() {
  return (
    <main className="h-dvh flex flex-col lg:flex-row relative overflow-hidden">
      <div className="bg-[url(@/assets/login-background.png)] bg-no-repeat w-full h-dvh bg-cover bg-center lg:bg-left" />

      <div className="w-full lg:w-1/2 absolute right-0 top-8 lg:top-3 bg-gray-600 rounded-3xl lg:rounded-tl-3xl lg:rounded-none">
        <Outlet />
      </div>
    </main>
  )
}
