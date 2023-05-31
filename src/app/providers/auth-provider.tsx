import { createContext, useContext, useEffect, useMemo } from "react"
import {
  LoginResponse,
  LoginUser,
  ResponseData,
} from "@/core/api/gateways/auth/auth.dto"
import { useNavigate } from "react-router-dom"

import { STORAGE_AUTH_USER_KEY } from "../stores/auth.store"
import {
  getData,
  removeValue,
  storeData,
} from "../stores/effects/persist.effect"

interface AuthContextProps {
  user: LoginUser & ResponseData
  login: (user: LoginResponse, email: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: JSX.Element | null
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = getData(STORAGE_AUTH_USER_KEY) as LoginUser & ResponseData
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user.token && user.email) navigate("/servers")
  }, [navigate])

  const login = (user: LoginResponse, email: string) => {
    const { token, name } = user.data
    storeData(STORAGE_AUTH_USER_KEY, { token, name, email })

    navigate("/servers")
  }

  const logout = () => {
    removeValue(STORAGE_AUTH_USER_KEY)
    navigate("/", { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
