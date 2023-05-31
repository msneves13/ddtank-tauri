export interface LoginUser {
  email: string
  password: string
}

export interface RegisterUser {
  name: string
  email: string
  password: string
  confirm_password: string
  code: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  data: RegisterUser & ResponseData
}

export interface LoginResponse {
  success: boolean
  message: string
  data: LoginUser & ResponseData
}

export interface ResponseData {
  name: string
  error: string
  token: string
}

export interface LoadingAuthData {
  token: string
  time: string
}

export interface LoadingAuthResponse {
  success: boolean
  message: string
  data: LoadingAuthData
}
