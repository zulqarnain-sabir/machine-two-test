import { Modal } from "antd"
import React from "react"

function CustomModal({
  title = "",
  open = false,
  centered = true,
  onClose,
  onSubmit,
  children,
  okText = "Submit",
  ...rest
}) {
  return (
    <Modal
      title={title}
      okText={okText}
      centered={centered}
      open={open}
      onOk={onSubmit}
      onCancel={onClose}
      onClose={onClose}
      {...rest}
    >
      {children}
    </Modal>
  )
}

export default CustomModal
