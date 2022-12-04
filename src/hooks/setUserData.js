import React from "react"
import jwt_decode from "jwt-decode"
import { getCookie, removeCookie, setCookie } from "utils/cookieHelper"
import { useContext } from "react"
import { AuthContext } from "context/auth"

export default function useAuthHook() {
  const { isLoggedIn, userData, setUserData, setIsLoggedIn } = useContext(AuthContext)

  const checkForLogin = () => {
    let token = getCookie("auth")

    if (!token) {
      handleLogout()
      return
    }
    var decoded = jwt_decode(token)
    if (decoded && decoded.email && decoded.phone) {
      setUserData(decoded)
      setIsLoggedIn(true)
    }
  }

  const handleLogin = (accessToken) => {
    let token = getCookie("auth")
    if (!token) handleLogout()

    var decoded = jwt_decode(token)
    if (decoded && decoded.email && decoded.phone) {
      postLogin(decoded)
    }
  }

  const postLogin = (data) => {
    setUserData(decoded)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    removeCookie("auth")
    setIsLoggedIn(false)
    setUserData(null)
  }
  return [checkForLogin]
  //   return <div>setUserData</div>
}
