import cookie from "js-cookie"

export const setCookie = (key, data) => {
  cookie.set(key, data)
}

export const removeCookie = (key) => {
  cookie.remove(key)
}

export const getCookie = (key) => {
  return cookie.get(key)
}

export const saveObjectInCookie = (key, data = {}) => {
  if (key && data && typeof data == "object") {
    cookie.set(key, JSON.stringify(data))
  }
}

export const getObjectFromCookies = (key) => {
  const data = cookie.get(key)
  return data ? JSON.parse(data) : null
}
