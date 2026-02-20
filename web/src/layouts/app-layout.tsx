import { isAxiosError } from "axios"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

import { Header } from "@/components/header"
import { api } from "@/lib/axios"

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status === 401) {
            navigate("/auth/sign-in", { replace: true })
          }

          throw error
        }

        throw error
      },
    )

    return () => api.interceptors.response.eject(interceptorId)
  }, [navigate])

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row relative">
      <Header />

      <div className="w-full lg:w-[calc(100%-210px)] absolute right-0 bottom-0 h-[calc(100%-6rem)] lg:h-[calc(100%-.75rem)] bg-gray-600 rounded-t-3xl lg:rounded-tl-3xl lg:rounded-none">
        <div className="p-6 lg:p-12 flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
