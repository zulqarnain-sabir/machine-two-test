const API_BASE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/api`

export const API_PATHS = {
  GET_ALL_RESTAURANTS: `${API_BASE_PATH}/getRestaurantData`,
  LOGIN: `${API_BASE_PATH}/login`,
  SIGNUP: `${API_BASE_PATH}/createUser`,
  BOOK_SLOT: `${API_BASE_PATH}/bookSlot`,
  GET_USER_BOOKINGS: `${API_BASE_PATH}/getUserBookings`,
  DELETE_BOOKING: `${API_BASE_PATH}/deleteBooking`,
  UPDATE_BOOKING: `${API_BASE_PATH}/updateBookingSlot`,
}
