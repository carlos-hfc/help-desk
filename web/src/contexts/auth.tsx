import { createContext, type PropsWithChildren, use, useState } from "react"

import type { User } from "@/@types/user"

export interface AuthContextProps {
  user: User | null
  save(data: User): void
  remove(): void
}

export const AuthContext = createContext({} as AuthContextProps)

export const useAuth = () => use(AuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)

  function save(data: User) {}

  function remove() {}

  return (
    <AuthContext.Provider value={{ remove, save, user }}>
      {children}
    </AuthContext.Provider>
  )
}
