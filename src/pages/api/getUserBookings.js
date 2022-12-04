// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"
const jwt = require("jsonwebtoken")

export default async function getUserBookings(req, res) {
  let auth = req.headers.authorization

  try {
    const userDetails = await jwt.verify(auth, process.env.NEXT_PUBLIC_JWT_SECRET)
    if (userDetails.id) {
      let _query = `SELECT b.id,r.name AS restaurant_name,b.booking_time,b.number_of_people,b.phone,b.name FROM bookings b  JOIN users u on u.id = b.userId  JOIN restaurants r ON r.id = b.restaurantId WHERE u.id=${userDetails.id}`
      let data = await query({ query: _query, values: [] })
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log("error :>> ", error)
    res.status(403).send({ error: true, message: error })
    return
  }
}
