import { Button, Space, Table, Tag } from "antd"
import PageLayout from "components/layout"
import { useContext, useEffect, useState } from "react"
import { getAllRestaurants } from "services/ApiService"
import Link from "next/link"
import { titleCase } from "utils"
import CustomModal from "components/modal"
import BookForm from "components/bookForm"
import Booked from "components/booked"
import { AuthContext } from "context/auth"
import useAuthHook from "hooks/setUserData"
import SignInModal from "components/signinModal"

export default function Home(props) {
  const [restaurantData, setRestaurantData] = useState([])
  const [modalConfigs, setModalConfigs] = useState({ open: false, title: "" })
  const [booked, setBooked] = useState(false)
  const { isLoggedIn, userData } = useContext(AuthContext)
  const [checkForLogin] = useAuthHook()
  useEffect(() => {
    setRestaurantData(props?.data)
    checkForLogin()
  }, [props?.data])

  const handleModalOpen = (title, restaurantData) => {
    setBooked(false)
    setModalConfigs({ ...modalConfigs, open: true, title: title, restaurantData: restaurantData })
  }

  const handleModalSubmit = () => {
    // setModalConfigs({ ...modalConfigs, open: false })
    setBooked(true)
  }

  const handleModalClose = () => {
    setBooked(false)
    setModalConfigs({ ...modalConfigs, open: false })
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <Link href={`${text}/book`}>{titleCase(text)}</Link>,

      render: (text, row) => (
        <div
          onClick={() => {
            handleModalOpen(text, row)
          }}
        >
          {titleCase(text)}
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Restaurant Time",
      dataIndex: "restaurant_time",
      key: "restaurant_time",
    },
    {
      title: "Bookings Open",
      dataIndex: "is_booking_available",
      key: "is_booking_available",
      render: (text) => <p>{text ? "Yes" : "No"}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, row) => (
        <Space size="middle">
          <div
            onClick={() => {
              handleModalOpen(row.name)
            }}
          >
            Book Now!
          </div>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout>
      <Table columns={columns} dataSource={restaurantData} />
      <CustomModal
        open={modalConfigs.open}
        title={`Book ${titleCase(modalConfigs.title)}`}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        footer={null}
      >
        {isLoggedIn ? (
          <>
            {booked ? (
              <Booked />
            ) : (
              <BookForm userData={userData} restaurantData={modalConfigs.restaurantData} setBooked={setBooked} />
            )}
          </>
        ) : (
          <SignInModal />
        )}
      </CustomModal>
    </PageLayout>
  )
}

export async function getServerSideProps(ctx) {
  let { query } = ctx
  const data = await getAllRestaurants()
  let dataStatus = data.status.toString()
  if (data && dataStatus.startsWith(2)) {
    return {
      props: {
        data: data.data,
        error: false,
      },
    }
  } else {
    return {
      props: {
        error: true,
        data: null,
      },
    }
  }
}
