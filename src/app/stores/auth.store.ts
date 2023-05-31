import { UserToken } from "@/core/entities/user-token"
import { atom } from "recoil"

import { localStorageEffect } from "./effects/persist.effect"

export const STORAGE_AUTH_USER_KEY = "authUserState"

export const authUserState = atom<UserToken>({
  key: STORAGE_AUTH_USER_KEY,
  default: {
    token: "",
    name: "",
    email: "",
  },
  effects: [localStorageEffect(STORAGE_AUTH_USER_KEY)],
})
