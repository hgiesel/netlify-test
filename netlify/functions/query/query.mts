import { Context } from '@netlify/functions'
import { Client } from 'pg'

export default async (request: Request, context: Context) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })

  await client.connect()
  const res = await client.query('SELECT * FROM my_table')
  await client.end()

  return {
    statusCode: 200,
    body: JSON.stringify(res.rows),
  }
}
