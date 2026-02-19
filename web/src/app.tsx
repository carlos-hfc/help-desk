import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router"

import { queryClient } from "./lib/react-query"
import { routes } from "./routes"

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}
