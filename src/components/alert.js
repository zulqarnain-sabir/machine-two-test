import { Alert } from "antd"

function ShowAlert({ message, type }) {
  return <Alert message={message} type={type} />
}

export default ShowAlert
