import { createContext, type PropsWithChildren, use, useState } from "react"

import type { Role } from "@/@types/user"

export interface AuthContextProps {
  save(data: Role): void
  role: Role | null
}

export const AuthContext = createContext({} as AuthContextProps)

export const useAuth = () => use(AuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState<Role | null>(null)

  function save(role: Role) {
    setRole(role)
  }

  return (
    <AuthContext.Provider value={{ save, role }}>
      {children}
    </AuthContext.Provider>
  )
}
