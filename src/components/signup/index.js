// import "antd/dist/antd.css"
import { Form, Input, Button, Checkbox } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import styles from "components/login/index.module.css"
import { Typography } from "antd"
import Link from "next/Link"
import { signup } from "services/ApiService"
import { useRouter } from "next/router"
import { AuthContext } from "context/auth"
import { useContext } from "react"

const { Title } = Typography

const SignupForm = () => {
  const router = useRouter()
  const { openNotification } = useContext(AuthContext)
  const onFinish = async (values) => {
    let result = await signup(values)

    if (result.status === 200) {
      router.push("/login")
      openNotification("Signed Up Successfully", "Please Login now and start booking!")
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.centered}>
        <div className={styles.innerContainer}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Title>Sign Up</Title>
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
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Full Name!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email (abc@xyz.com)" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Phone (+92 3XX XXXXXXX)"
                />
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
                  Sign up
                </Button>
                <div style={{ marginTop: "1rem" }}>
                  Or <Link href="/login">Login!</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
