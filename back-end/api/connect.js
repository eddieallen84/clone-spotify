// JavaScript Assincrono
// await async
// Fullfilled
import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://eddiexd:YpLDSci7WB5381nI@cluster0.1ah5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("Spotify-clone");
// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
