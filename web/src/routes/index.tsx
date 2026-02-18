import { createBrowserRouter } from "react-router"

import { AppLayout } from "@/layouts/app-layout"
import { AuthLayout } from "@/layouts/auth-layout"
import { Login } from "@/pages/auth/login"
import { SignUp } from "@/pages/auth/sign-up"
import { Dashboard } from "@/pages/dashboard"
import { Technicians } from "@/pages/technicians"

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
  {
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "technicians",
        element: <Technicians />,
      },
    ],
  },
])
