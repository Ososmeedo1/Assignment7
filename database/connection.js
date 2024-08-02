import { MongoClient } from "mongodb"

const url = 'mongodb://localhost:27017'

const client = new MongoClient(url)

client.connect().then(() => {
  console.log("DB connected");
})
.catch(() => {
  console.log("DB failure");
})

export const db = client.db('assignment7')