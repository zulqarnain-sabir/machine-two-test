import { DatePicker, Input, Tooltip } from "antd"
import PageLayout from "components/layout"
import React from "react"
import {
  DownloadOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button } from "antd"
import { Col, Row } from "antd"

function Book() {
  const onChange = (value, dateString) => {}

  const onOk = (value) => {}
  return (
    <PageLayout>
      <Row gutter={[16, 32]}>
        <Col span={24}>
          <Input
            placeholder="Enter your Name"
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Col>
        <br />
        <Col span={24}>
          <Input
            placeholder="Number of People"
            prefix={<UsergroupAddOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Extra information">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Col>

        <Col span={24}>
          <Input
            placeholder="Enter your Mobile Number"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Pakistan Format Only (+92 3XX XXXXXXX)">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Col>
        <Col span={24}>
          <DatePicker
            onChange={onChange}
            onOk={onOk}
            showTime={{
              // defaultValue: moment("00:00:00", "HH:mm:ss"),
              format: "HH:mm",
            }}
          />
        </Col>
        <Col span={24}>
          <Button type="primary" icon={<DownloadOutlined />} size={"large"}>
            Book Now
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}

export default Book
