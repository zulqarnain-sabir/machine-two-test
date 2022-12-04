import mysql from "mysql2/promise"

export async function query({ query, values = [] }) {
  const dbConnection = await mysql.createPool({
    host: "localhost",
    database: "machinetwo",
    port: 3306,
    user: "root",
    password: "rootpass123",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })

  try {
    const [results] = await dbConnection.execute(query, values)
    dbConnection.end()
    return results
  } catch (error) {
    console.log("error :>> ", error)
    throw Error(error.message)
    return { error }
  }
}
