// JavaScript Assincrono
// await async
// Fullfilled
import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://eddiexd:YpLDSci7WB5381nI@cluster0.1ah5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("Spotify-clone");

export const connectToDB = async () => {
  try {
    // Conectar ao cliente
    await client.connect();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    return client.db("Spotify-clone");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    throw error;
  }
};

// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
