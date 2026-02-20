import { createContext, type PropsWithChildren, use, useState } from "react"

import { Role } from "@/@types/enums"

export interface AuthContextProps {
  save(data: string | typeof Role): void
  IS_ADMIN: boolean
  IS_TECHNICIAN: boolean
  IS_CLIENT: boolean
  role: string
}

export const AuthContext = createContext({} as AuthContextProps)

export const useAuth = () => use(AuthContext)

const SESSION_STORAGE_KEY = `@help-desk:role`

export function AuthProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState(
    () => sessionStorage.getItem(SESSION_STORAGE_KEY) ?? "",
  )

  const IS_ADMIN = role === Role.ADMIN
  const IS_TECHNICIAN = role === Role.TECHNICIAN
  const IS_CLIENT = role === Role.CLIENT

  function save(role: string) {
    sessionStorage.setItem(SESSION_STORAGE_KEY, role)
    setRole(role)
  }

  return (
    <AuthContext.Provider
      value={{
        save,
        IS_ADMIN,
        IS_TECHNICIAN,
        IS_CLIENT,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
