import { Button, Space } from "antd"
import { useRouter } from "next/router"
import React from "react"

function Booked() {
  const router = useRouter()
  return (
    <>
      <Space size={16} direction="vertical">
        <div>Booking Confirmed!</div>
        <Button
          onClick={() => {
            router.push("/my-bookings")
          }}
          type="primary"
        >
          View Your Bookings!
        </Button>
      </Space>
    </>
  )
}

export default Booked
