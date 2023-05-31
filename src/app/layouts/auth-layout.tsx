import { useOutlet } from "react-router-dom"

import { AuthProvider } from "../providers/auth-provider"

export const AuthLayout = () => {
  const outlet = useOutlet()
  return <AuthProvider>{outlet}</AuthProvider>
}
