// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from "lib/db"
const bcrypt = require("bcrypt")
const saltRounds = 10

const findUserByEmail = async (email) => {
  const _query = `SELECT * FROM users WHERE email="${email}"`
  const data = await query({ query: _query, values: [] })
  return data
}

const hashPassword = async (pass) => {
  return bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(pass, salt)
    })
    .then((hash) => {
      return hash
    })
    .catch((err) => console.error(err.message))
}

const createNewUser = async (name, email, phone, password) => {
  const _query = `INSERT INTO users (name, email, phone, password)
VALUES ("${name}", "${email}","${phone}", "${password}")`
  const data = await query({ query: _query, values: [] })
  return data
}
export default async function createUser(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ error: true, message: "Only POST requests allowed" })
    return
  }

  let { email, password, name, phone } = req.body
  try {
    let data = await findUserByEmail(email)
    if (data.length > 0) {
      res.status(403).send({ error: true, message: "Email Already Taken" })
      return
    }

    let passHash = await hashPassword(password)
    let createUser = await createNewUser(name, email, phone, passHash)

    res.status(200).json({ ok: data })
  } catch (error) {
    console.log("error :>> ", error)
    res.status(400).json({ error })
  }
}
