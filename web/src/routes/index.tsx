import { createBrowserRouter } from "react-router"

import { AuthLayout } from "@/layouts/auth-layout"
import { Login } from "@/pages/auth/login"
import { SignUp } from "@/pages/auth/sign-up"

export const routes = createBrowserRouter([
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
])
