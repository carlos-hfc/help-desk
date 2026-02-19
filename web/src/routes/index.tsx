import { createBrowserRouter } from "react-router"

import { AppLayout } from "@/layouts/app-layout"
import { AuthLayout } from "@/layouts/auth-layout"
import { Login } from "@/pages/auth/login"
import { SignUp } from "@/pages/auth/sign-up"
import { Clients } from "@/pages/clients"
import { Dashboard } from "@/pages/dashboard"
import { Services } from "@/pages/services"
import { Technicians } from "@/pages/technicians"

export const routes = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "auth/sign-up",
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
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "services",
        element: <Services />,
      },
    ],
  },
])
