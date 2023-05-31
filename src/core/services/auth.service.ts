import to from "await-to-js"
import { AxiosError } from "axios"

import {
  LoadingAuthResponse,
  LoginResponse,
  LoginUser,
  RegisterResponse,
  RegisterUser,
} from "../api/gateways/auth/auth.dto"
import { AuthUserGateway } from "../api/gateways/auth/auth.gateway"

class AuthService {
  private errors = {
    LOADING_AUTH_ERROR:
      "Um erro ocorreu ao iniciar o jogo. Tente novamente mais tarde",
    REGISTER_ERROR:
      "Um erro ocorreu ao registrar-se. Tente novamente mais tarde",
    DEFAULT_LOGIN_ERROR:
      "Um erro ocorreu ao efetuar o login. Tente novamente mais tarde",
  }

  constructor(private authUserGateway: AuthUserGateway) {}

  async register(user: RegisterUser): Promise<RegisterResponse> {
    const [gatewayError, registeredUser] = await to<
      RegisterResponse,
      AxiosError<string[]>
    >(this.authUserGateway.register(user))

    if (gatewayError) {
      console.log(gatewayError?.response?.data)
      throw new Error(
        gatewayError?.response?.data?.[0] ?? this.errors.REGISTER_ERROR
      )
    }

    return registeredUser
  }

  async login(payload: LoginUser) {
    const [loginError, loggedUser] = await to<
      LoginResponse,
      AxiosError<{ errors: string[] }>
    >(this.authUserGateway.login(payload))

    if (loginError) {
      console.log(loginError?.response?.data)
      throw new Error(
        loginError.response?.data?.errors?.[0] ??
          this.errors.DEFAULT_LOGIN_ERROR
      )
    }

    return loggedUser
  }

  async loadingAuth(serverId: string) {
    const [loadingError, loadingData] = await to<
      LoadingAuthResponse,
      AxiosError<{ errors: string[] }>
    >(this.authUserGateway.loadingAuth(serverId))

    if (loadingError) {
      console.log(loadingError?.response?.data)
      throw new Error(
        loadingError.response?.data?.errors?.[0] ??
          this.errors.LOADING_AUTH_ERROR
      )
    }

    return loadingData.data
  }
}

const authUserGateway = new AuthUserGateway()
export const authService = new AuthService(authUserGateway)
