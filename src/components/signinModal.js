import { Button, Space } from "antd"
import router, { useRouter } from "next/router"
import React from "react"

function SignInModal() {
  const router = useRouter()
  return (
    <>
      <Space size={16} direction="vertical">
        <div>You need to sign-in first!</div>
        <Button
          type="primary"
          onClick={() => {
            router.push("/login")
          }}
        >
          Sign in
        </Button>
      </Space>
    </>
  )
}

export default SignInModal
