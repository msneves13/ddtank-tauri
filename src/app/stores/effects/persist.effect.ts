import { AtomEffect, DefaultValue } from "recoil"

const DEFAULT_ERROR_MESSAGE = `Um erro ocorreu ao tentar verificar alguns dados. 
  Estamos trabalhando pra que isso seja resolvido.`

export const storeData = <T>(key: string, value: T) => {
  try {
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  } catch (e) {
    throw Error(DEFAULT_ERROR_MESSAGE)
  }
}

export const getData = (key: string) => {
  try {
    const jsonValue = localStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    throw Error(DEFAULT_ERROR_MESSAGE)
  }
}

export const removeValue = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    throw Error(DEFAULT_ERROR_MESSAGE)
  }
}

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    setSelf(
      getData(key).then(
        // Abort initialization if no value was stored
        (savedValue: null) =>
          savedValue != null ? savedValue : new DefaultValue()
      )
    )

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _oldValue, _isReset) => {
      !(newValue instanceof DefaultValue)
        ? storeData(key, newValue)
        : removeValue(key)
    })
  }
