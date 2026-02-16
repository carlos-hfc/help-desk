import { createBrowserRouter } from "react-router"

import { AuthLayout } from "@/layouts/auth-layout"
import { Login } from "@/pages/login"

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
])
