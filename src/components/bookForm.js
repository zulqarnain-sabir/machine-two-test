import { DatePicker, Form, Input, Tooltip } from "antd"
import PageLayout from "components/layout"
import React, { useContext } from "react"
import {
  DownloadOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button } from "antd"
import { Col, Row } from "antd"
import { bookSlot } from "services/ApiService"
import { AuthContext } from "context/auth"
import useAuthHook from "hooks/setUserData"

function BookForm({ userData = {}, restaurantData = {}, setBooked = null }) {
  const [form] = Form.useForm()

  const [checkForLogin] = useAuthHook()
  const { userData: allUserData } = useContext(AuthContext)
  const onChange = (value, dateString) => {
  }
  const onOk = (value) => {
    form.setFieldsValue({ bookingDate: value.format("YYYY-MM-DD HH:mm") })
  }
  const onSubmit = async (values) => {
    if (userData) checkForLogin()
    let result = await bookSlot({
      id: userData.id,
      email: userData.email,
      name: values.name,
      phone: values.phone,
      bookingDate: values.bookingDate.format("YYYY-MM-DD HH:mm"),
      numberOfPeople: values.numberOfPeople,
      restaurantId: restaurantData?.id || 1,
    })

    if (result.status === 200) {
      setBooked && setBooked(true)
    }
  }

  return (
    <>
      <Form
        name="normal_login"
        className="loginForm"
        initialValues={{
          name: userData?.name || "",
          phone: userData?.phone || "",
        }}
        onFinish={onSubmit}
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
        </Form.Item>
        {/* <Input
              placeholder="Enter your Name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            /> */}
        <Form.Item
          name="numberOfPeople"
          rules={[
            {
              required: true,
              message: "Number of People!",
            },
          ]}
        >
          <Input
            prefix={<UsergroupAddOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Number of people required for booking">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
            placeholder="Number of People"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Number of People!",
            },
          ]}
        >
          <Input
            placeholder="Enter your Mobile Number"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Pakistan Format Only (+92 3XX XXXXXXX)">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Form.Item>
        <Form.Item
          name="bookingDate"
          rules={[
            {
              required: true,
              message: "Booking Date is required",
            },
          ]}
        >
          <DatePicker
            onChange={onChange}
            onOk={onOk}
            showTime={{
              // defaultValue: moment("00:00:00", "HH:mm:ss"),
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<DownloadOutlined />} size={"large"}>
            Book Now
          </Button>
        </Form.Item>
        {/* <Col span={24}>
          <Button type="primary" icon={<DownloadOutlined />} size={"large"}>
            Book Now
          </Button>
        </Col> */}
      </Form>
    </>
  )
}

export default BookForm
