import { notification } from "antd"
import ShowAlert from "components/alert"
import { AuthContext } from "context/auth"
import useAuthHook from "hooks/setUserData"
import { useEffect, useState } from "react"
import "styles/globals.css"
import { isBrowser, isUserLoggedIn } from "utils"

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isBrowser() ? Boolean(isUserLoggedIn()) : false)
  const [userData, setUserData] = useState(null)
  const [checkForLogin] = useAuthHook()
  const [api, contextHolder] = notification.useNotification()

  useEffect(() => {
    checkForLogin()
  }, [])

  const openNotification = (message = "Success", description, placement = "bottom") => {
    api.info({
      message: message,
      description: description,
      placement,
    })
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          userData,
          setUserData,
          setIsLoggedIn,
          openNotification,
        }}
      >
        <>
          {contextHolder}
          <Component {...pageProps} />
        </>
      </AuthContext.Provider>
    </>
  )
}

export default MyApp
