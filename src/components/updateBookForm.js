import { DatePicker, Form, Input, Space, Tooltip } from "antd"
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
import { bookSlot, deleteUserBooking, updateUserBooking } from "services/ApiService"
import { AuthContext } from "context/auth"
import useAuthHook from "hooks/setUserData"
import moment from "moment"

function UpdateBookForm({
  userData = {},
  restaurantData = {},
  handleModalClose = null,
  setUpdated = null,
  initialData = null,
  getUpdatedData = null,
}) {
  const [checkForLogin] = useAuthHook()
  const { userData: allUserData } = useContext(AuthContext)
  const onChange = (value, dateString) => {}
  const onOk = (value) => {}
  const handleDeleteEntry = async () => {
    let data = await deleteUserBooking({ bookingId: initialData.id })
    if (data.status === 200) {
      await getUpdatedData()
      // handleModalClose()
      setUpdated(true)
    }
  }
  const onSubmit = async (values) => {
    if (userData) checkForLogin()
    let result = await updateUserBooking({
      name: values.name,
      phone: values.phone,
      bookingDate: values.bookingDate.$d,
      numberOfPeople: values.numberOfPeople,
      bookingId: initialData?.id,
    })
    if (result?.status === 200) {
      await getUpdatedData()
      setUpdated && setUpdated(true)
    }
  }

  return (
    <>
      <Form
        name="normal_login"
        className="loginForm"
        initialValues={{
          name: initialData?.name || "",
          phone: initialData?.phone || "",
          numberOfPeople: initialData?.number_of_people,
          // bookingDate: initialData?.booking_time,
          // bookingDate: "2022-12-15 02:13",
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
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
            // defaultValue={"2022-12-15 02:13"}
            // showTime={{
            //   // defaultValue: moment("00:00:00", "HH:mm:ss"),
            //   format: "HH:mm",
            // }}
          />
        </Form.Item>
        <Space size={48}>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<DownloadOutlined />} size={"large"}>
              Update Booking
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="secondary" onClick={handleDeleteEntry} icon={<DownloadOutlined />} size={"large"}>
              Delete this entry!
            </Button>
          </Form.Item>
        </Space>
        {/* <Col span={24}>
          <Button type="primary" icon={<DownloadOutlined />} size={"large"}>
            Book Now
          </Button>
        </Col> */}
      </Form>
    </>
  )
}

export default UpdateBookForm
