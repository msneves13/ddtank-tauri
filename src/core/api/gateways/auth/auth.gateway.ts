import { api } from "../../index"
import {
  LoadingAuthResponse,
  LoginResponse,
  LoginUser,
  RegisterResponse,
  RegisterUser,
} from "./auth.dto"

export class AuthUserGateway {
  async register(user: RegisterUser): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>("/register", user)
    return response.data
  }

  async login(payload: LoginUser): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", payload)
    return response.data
  }

  async loadingAuth(serverId: string): Promise<LoadingAuthResponse> {
    const response = await api.get<LoadingAuthResponse>(
      `/game/loading_auth?server_id=${serverId}`
    )
    return response.data
  }
}
