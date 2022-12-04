import { Space, Table } from "antd"
import Booked from "components/booked"
import UpdateBookForm from "components/updateBookForm"
import PageLayout from "components/layout"
import CustomModal from "components/modal"
import SignInModal from "components/signinModal"
import React, { useContext, useEffect, useState } from "react"
import { getUserBookings } from "services/ApiService"
import { titleCase } from "utils"
import useAuthHook from "hooks/setUserData"
import { AuthContext } from "context/auth"

function MyBookings() {
  const [userBookings, setUserBookings] = useState(null)
  const [updated, setUpdated] = useState(false)
  const { isLoggedIn, userData } = useContext(AuthContext)
  const [checkForLogin] = useAuthHook()
  const [modalConfigs, setModalConfigs] = useState({ open: false, title: "" })
  const [currentRestaurant, setCurrentRestaurant] = useState(null)
  async function getData() {
    let data = await getUserBookings()
    if (data.status === 200) {
      setUserBookings(data.data.data)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const handleModalOpen = (title, restaurantData) => {
    setUpdated(false)
    setModalConfigs({ ...modalConfigs, open: true, title: title, restaurantData: restaurantData })
  }

  const handleModalSubmit = () => {
    // setModalConfigs({ ...modalConfigs, open: false })
    setUpdated(true)
  }

  const handleModalClose = () => {
    setUpdated(false)
    setModalConfigs({ ...modalConfigs, open: false })
  }

  const columns = [
    {
      title: "Restaurant Name",
      dataIndex: "restaurant_name",
      key: "restaurant_name",
      // render: (text) => <Link href={`${text}/book`}>{titleCase(text)}</Link>,

      render: (text, row) => titleCase(text),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <Link href={`${text}/book`}>{titleCase(text)}</Link>,

      render: (text, row) => titleCase(text),
    },
    {
      title: "Number Of People",
      dataIndex: "number_of_people",
      key: "number_of_people",
    },
    {
      title: "Booking Time",
      dataIndex: "booking_time",
      key: "booking_time",
    },
    {
      title: "Action",
      key: "action",
      render: (text, row) => (
        <Space size="middle">
          <div
            onClick={() => {
              handleModalOpen(row.restaurant_name)
              setCurrentRestaurant(row)
            }}
          >
            Edit
          </div>
        </Space>
      ),
    },
  ]

  return (
    <>
      <PageLayout>
        <Table columns={columns} dataSource={userBookings} />
        <CustomModal
          open={modalConfigs.open}
          title={`Book ${titleCase(modalConfigs.title)}`}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          footer={null}
        >
          {isLoggedIn ? (
            <>
              {updated ? (
                <>
                  <Space size={16} direction="vertical">
                    <div>Action Finished Successfully!</div>
                  </Space>
                </>
              ) : (
                <UpdateBookForm
                  userData={userData}
                  restaurantData={modalConfigs.restaurantData}
                  setUpdated={setUpdated}
                  initialData={currentRestaurant}
                  handleModalClose={handleModalClose}
                  getUpdatedData={getData}
                />
              )}
            </>
          ) : (
            <SignInModal />
          )}
        </CustomModal>
      </PageLayout>
    </>
  )
}

export default MyBookings
