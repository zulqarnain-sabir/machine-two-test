// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")
const findUserByEmail = async (email) => {
  const _query = `SELECT * FROM users WHERE email="${email}"`
  const data = await query({ query: _query, values: [] })
  return data
}

async function validatePassword(password, dbPassword) {
  const result = await bcrypt.compare(password, dbPassword)
  return result
}
export default async function createUser(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ error: true, message: "Only POST requests allowed" })
    return
  }

  let { email, password } = req.body
  let user = await findUserByEmail(email)
  if (user.length <= 0) {
    res.status(403).send({ error: true, message: "Invalid Email or Password" })
    return
  }
  let isPasswordMatched = await validatePassword(password, user[0].password)
  if (!isPasswordMatched) {
    res.status(403).send({ error: true, message: "Invalid Email or Password" })
    return
  }
  let data = { id: user[0].id, email: user[0].email, name: user[0].name, phone: user[0].phone }
  const accessToken = jwt.sign(data, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: "10d" })

  res.status(200).json(accessToken)
}
