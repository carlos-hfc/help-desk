import { Outlet } from "react-router"

import { Header } from "@/components/header"
import { AuthProvider } from "@/contexts/auth"

export function AppLayout() {
  return (
    <AuthProvider>
      <div className="min-h-dvh flex flex-col lg:flex-row relative">
        <Header />

        <div className="w-full lg:w-[calc(100%-210px)] absolute right-0 bottom-0 h-[calc(100%-6rem)] lg:h-[calc(100%-.75rem)] bg-gray-600 rounded-t-3xl lg:rounded-tl-3xl lg:rounded-none">
          <div className="p-6 lg:p-12 flex flex-col gap-6">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
