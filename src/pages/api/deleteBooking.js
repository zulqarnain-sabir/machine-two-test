// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"
const jwt = require("jsonwebtoken")

export default async function deleteUserBooking(req, res) {
  let auth = req.headers.authorization

  try {
    const userDetails = await jwt.verify(auth, process.env.NEXT_PUBLIC_JWT_SECRET)
    let { bookingId } = req.body
    if (userDetails.id) {
      let _query = `DELETE FROM bookings WHERE id = ${bookingId}`
      let data = await query({ query: _query, values: [] })
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log("error :>> ", error)
    res.status(403).send({ error: true, message: error })
    return
  }
}
