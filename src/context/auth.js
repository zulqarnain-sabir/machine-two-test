import { createContext } from "react"
import { isBrowser, isUserLoggedIn } from "utils"

export const AuthContext = createContext({
  isLoggedIn: isBrowser() ? isUserLoggedIn() : false,
  userData: null,
  setUserData: () => {},
  //   handleLogin: () => {},
  //   handleLogout: () => {},
  setIsLoggedIn: () => {},
  openNotification: () => {},
})
