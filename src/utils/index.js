import Cookies from "js-cookie"

import jwt from "jsonwebtoken"
import { getCookie, removeCookie } from "./cookieHelper"

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET

export function titleCase(str) {
  str = str.toLowerCase().split(" ")
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
  }
  return str.join(" ")
}

export const isBrowser = () => typeof window !== "undefined"

export function getAppCookies(req) {
  const parsedItems = {}
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split("; ")
    cookiesItems.forEach((cookies) => {
      const parsedItem = cookies.split("=")
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1])
    })
  }
  return parsedItems
}

export function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY)
  } catch (e) {
    console.log("e:", e)
    return null
  }
}

export const isUserLoggedIn = () => {
  return getCookie("auth")
}

export const logout = () => {
  return removeCookie("auth")
}
