import { API_PATHS } from "constants/index"
import { performGetRequest, performPostRequest, performPutRequest } from "services/NetworkServices"

export const getAllRestaurants = async () => {
  try {
    const response = await performGetRequest(API_PATHS.GET_ALL_RESTAURANTS)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}

export const login = async (data) => {
  try {
    const response = await performPostRequest(API_PATHS.LOGIN, { email: data.email, password: data.password })
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}

export const signup = async (data) => {
  try {
    const response = await performPostRequest(API_PATHS.SIGNUP, data)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}

export const bookSlot = async (data) => {
  try {
    const response = await performPostRequest(API_PATHS.BOOK_SLOT, data)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}
export const deleteUserBooking = async (data) => {
  try {
    const response = await performPostRequest(API_PATHS.DELETE_BOOKING, data)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}
export const updateUserBooking = async (data) => {
  try {
    const response = await performPutRequest(API_PATHS.UPDATE_BOOKING, data)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}

export const getUserBookings = async () => {
  try {
    const response = await performGetRequest(API_PATHS.GET_USER_BOOKINGS)
    return response
  } catch (error) {
    console.log("error: ", error)
  }
}
