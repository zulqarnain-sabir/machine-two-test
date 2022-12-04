// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"
const jwt = require("jsonwebtoken")

export default async function updateBooking(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ error: true, message: "Only PUT requests allowed" })
    return
  }
  let auth = req.headers.authorization

  try {
    const userDetails = await jwt.verify(auth, process.env.NEXT_PUBLIC_JWT_SECRET)
    if (userDetails.id) {
      let { name, numberOfPeople, phone, bookingDate, bookingId } = req.body

      let _query = `UPDATE bookings SET  booking_time = '${bookingDate}', number_of_people = ${numberOfPeople},phone=${phone},name='${name}' WHERE id = ${bookingId};`
      let result = await query({ query: _query, values: [] })
      res.status(200).json({ message: "booking updated" })
    }
  } catch (error) {
    console.log("error :>> ", error)
    res.status(403).send({ error: true, message: error })
    return
  }
}
