import { Outlet } from "react-router"

import { Header } from "@/components/header"

export function AppLayout() {
  return (
    <div className="h-dvh flex flex-col lg:flex-row relative overflow-hidden">
      <Header />

      <div className="w-full lg:w-[calc(100%-210px)] absolute right-0 top-24 lg:top-3 bg-gray-600 rounded-3xl lg:rounded-tl-3xl lg:rounded-none">
        <div className="h-dvh p-6 lg:p-12 flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
