import { Breadcrumb, Layout, Menu } from "antd"
import { AuthContext } from "context/auth"
import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { logout } from "utils"

const { Header, Content, Footer } = Layout

function PageLayout({ children }) {
  const router = useRouter()
  const { isLoggedIn } = useContext(AuthContext)
  const [menuItems, setMenuItems] = useState([
    {
      key: 0,
      label: "Home",
      isProtected: false,
      onClick: () => {
        router.push("/")
      },
    },
    {
      key: 1,
      label: "My Bookings",
      isProtected: true,
      onClick: () => {
        isLoggedIn ? router.push("/my-bookings") : router.push("/login")
      },
    },
    {
      key: 2,
      label: isLoggedIn ? "Logout" : "Login",
      isProtected: false,
      onClick: () => {
        logout()
        router.push("/login")
      },
    },
  ])

  useEffect(() => {
    setMenuItems(!isLoggedIn ? menuItems.filter((item) => item.isProtected === false) : menuItems)
  }, [isLoggedIn])

  let mappedMenuItems = menuItems.map((item, index) => {
    return {
      key: item.key,
      label: `${item.label}`,
    }
  })

  return (
    <div>
      <Head>
        <title>MachineTwo Restaurant Booking System</title>
        <meta name="description" content="Book you favorite restaurant in a click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            onClick={(menuItem) => {
              menuItems.filter((item) => item.key == menuItem.key)[0].onClick()
            }}
            defaultSelectedKeys={["0"]}
            items={mappedMenuItems}
          />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>My Bookings</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
  )
}

export default PageLayout
