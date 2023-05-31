import axios, { AxiosRequestHeaders } from "axios"
import axiosTauriApiAdapter from "axios-tauri-api-adapter"

import { STORAGE_AUTH_USER_KEY } from "@/app/stores/auth.store"
import { getData } from "@/app/stores/effects/persist.effect"

const api = axios.create({
  baseURL: "https://api.ddtank4.com.br/api",
  adapter: axiosTauriApiAdapter,
})

api.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  } as AxiosRequestHeaders

  const storedAuthData = await getData(STORAGE_AUTH_USER_KEY)

  if (storedAuthData?.token) {
    config.headers.Authorization = `Bearer ${storedAuthData?.token}`
  }

  return config
})

export { api }
