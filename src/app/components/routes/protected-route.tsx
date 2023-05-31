import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "@/app/providers/auth-provider"

interface ProtectedRouteProps {
  children: JSX.Element
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!(user && user.email && user.token)) navigate("/login")
  }, [navigate])

  return children
}
