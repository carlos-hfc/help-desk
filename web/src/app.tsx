import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router"

import { AuthProvider } from "./contexts/auth"
import { queryClient } from "./lib/react-query"
import { routes } from "./routes"

export function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </AuthProvider>
  )
}
