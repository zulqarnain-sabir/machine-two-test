// import "antd/dist/antd.css"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import styles from "components/login/index.module.css"
import { Typography } from "antd"
import { login } from "services/ApiService"
import { useRouter } from "next/router"
const { Title } = Typography
import jwt_decode from "jwt-decode"
import { setCookie } from "utils/cookieHelper"
import { useContext } from "react"
import { AuthContext } from "context/auth"
import Link from "next/Link"
const LoginForm = () => {
  const router = useRouter()
  const { setIsLoggedIn, setUserData } = useContext(AuthContext)

  const onFinish = async (values) => {
    const isLogin = await login(values)
    if (isLogin.status == "200") {
      var decoded = jwt_decode(isLogin.data)
      if (decoded) {
        setCookie("auth", isLogin.data)
        setUserData(decoded)
        setIsLoggedIn(true)
        router.push("/")
      }
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.centered}>
        <div className={styles.innerContainer}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Title>Login</Title>
          </div>
          <div>
            <Form
              name="normal_login"
              className="loginForm"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="loginFormForgot" href="">
                  Forgot password
                </a>
              </Form.Item> */}

              <Form.Item>
                <Button type="primary" htmlType="submit" className="loginFormButton" block>
                  Log in
                </Button>
                <div style={{ marginTop: "1rem" }}>
                  Or <Link href="/signup">register now!</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
