import { createBrowserRouter } from "react-router"

import { AppLayout } from "@/layouts/app-layout"
import { AuthLayout } from "@/layouts/auth-layout"
import { Login } from "@/pages/auth/login"
import { SignUp } from "@/pages/auth/sign-up"
import { Clients } from "@/pages/clients"
import { Dashboard } from "@/pages/dashboard"
import { CallDetailsPage } from "@/pages/dashboard/call-details-page"
import { Services } from "@/pages/services"
import { Technicians } from "@/pages/technicians"
import { TechnicianDetailsPage } from "@/pages/technicians/technician-details-page"

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
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: ":id",
            element: <CallDetailsPage />,
          },
        ],
      },
      {
        path: "technicians",
        children: [
          {
            index: true,
            element: <Technicians />,
          },
          {
            path: ":id",
            element: <TechnicianDetailsPage />,
          },
        ],
      },
      {
        path: "register-technician",
        element: <TechnicianDetailsPage />,
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
