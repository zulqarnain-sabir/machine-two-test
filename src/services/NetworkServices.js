import axios from "axios"
import { getCookie } from "utils/cookieHelper"
const TIMEOUT = 90 * 1000

function appendParamsInUrl(url, params) {
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key]
    }
  })
  let finalURL = url
  if (params) {
    finalURL += "?"
    finalURL =
      finalURL +
      Object.keys(params)
        .map((e) => `${e}=${params[e]}`)
        .join("&")
  }
  return finalURL
}
function logData(key, response) {}
function logApiData(url, params, headers) {}

function getHeaders() {
  let data = {
    "Content-Type": "application/json",
  }
  if (getCookie("auth")) data = { ...data, Authorization: getCookie("auth") }

  return data
}

function handleNoInternetError(reject) {
  console.log("no Internet")
}

function handleRejection(reject) {
  setTimeout(() => {
    handleNoInternetError(reject)
  }, 500)
}

export const performGetRequest = (url, params, addParamsToUrl = false, data) => {
  let finalURL = addParamsToUrl ? appendParamsInUrl(url, params) : url
  logApiData(finalURL, params, null)
  return new Promise((resolve, reject) => {
    axios
      .get(finalURL, {
        headers: getHeaders(),
        timeout: TIMEOUT,
        withCredentials: true,
        params: addParamsToUrl ? undefined : params,
        data,
      })
      .then((response) => {
        logData("RESPONSE: ", response)
        resolve(response)
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          //   removeAppCookies()
          window.location.reload()
          return
        }
        const responseError = error.response && error.response.data ? error.response.data : { error: error.message }
        logData("Error: ", responseError)
        reject(responseError)
      })
  })
}

export const performPostRequest = (url, data, params) => {
  let finalURL = params ? appendParamsInUrl(url, params) : url
  // logApiData(finalURL, data, null)
  return new Promise((resolve, reject) => {
    axios
      .post(finalURL, data, {
        headers: getHeaders(),
        timeout: TIMEOUT,
        withCredentials: true,
      })
      .then((response) => {
        logData("RESPONSE: ", response)
        resolve(response)
      })
      .catch((error) => {
        const responseError = error.response && error.response.data ? error.response.data : { error: error.message }
        logData("error", responseError)
        reject(responseError)
      })
  })
}

export const performPutRequest = (url, data, token) => {
  logApiData(url, data)
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, {
        headers: getHeaders(token),
        withCredentials: true,
        timeout: TIMEOUT,
      })
      .then((response) => {
        logData("RESPONSE: ", response)
        resolve(response)
      })
      .catch((error) => {
        const responseError = error.response && error.response.data ? error.response.data : { error: error.message }
        logData("error", responseError)
        reject(responseError)
      })
  })
}

export const performDeleteRequestWithHeaders = (url) => {
  logApiData(url, {})
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        headers: getHeaders(),
        timeout: TIMEOUT,
      })
      .then((response) => {
        logData("RESPONSE: ", response)
        resolve(response)
      })
      .catch((error) => {
        const responseError = error.response && error.response.data ? error.response.data : { error: error.message }
        logData(responseError)
        reject(responseError)
      })
  })
}
