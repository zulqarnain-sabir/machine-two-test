// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"

export default async function getRestaurantData(req, res) {
  try {
    const _query = "SELECT * FROM restaurants WHERE is_active=1;"
    const data = await query({ query: _query, values: [] })

    res.status(200).json(data)
  } catch (error) {
    console.log("error :>> ", error)
    res.status(400).json({ error })
  }
}
