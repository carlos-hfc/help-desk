import { RouterProvider } from "react-router"

import { routes } from "./routes"

export function App() {
  return <RouterProvider router={routes} />
}
