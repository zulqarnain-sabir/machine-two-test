// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"
const jwt = require("jsonwebtoken")

export default async function bookSlot(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ error: true, message: "Only POST requests allowed" })
    return
  }
  let auth = req.headers.authorization

  try {
    const userDetails = await jwt.verify(auth, process.env.NEXT_PUBLIC_JWT_SECRET)
    if (userDetails.id) {
      let { name, numberOfPeople, phone, bookingDate, restaurantId } = req.body

      let _query = `INSERT INTO bookings (name, phone, userId,restaurantId,number_of_people,booking_time)
        VALUES ("${name || userDetails.name}","${phone || userDetails.phone}", "${
        userDetails.id
      }","${restaurantId}","${numberOfPeople}","${bookingDate}")`
      await query({ query: _query, values: [] })

      res.status(200).json({ message: "booking confirmed" })
    }
  } catch (error) {
    console.log("error :>> ", error)
    res.status(403).send({ error: true, message: error })
    return
  }
}
