// JavaScript Assincrono
// await async
// Fullfilled
import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://eddiexd:d4frWYTlPoRjq1l7@cluster0.1ah5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(URI, {
    maxPoolSize: 10, // Número máximo de conexões no pool
    minPoolSize: 2,  // Número mínimo de conexões no pool
    maxIdleTimeMS: 30000, // Tempo máximo de inatividade de uma conexão
  });

  const connectToDB = async () => {
    try {
      await client.connect();
      console.log("Conectado ao MongoDB!");
    } catch (err) {
      console.error("Erro ao conectar ao MongoDB", err);
      setTimeout(connectToDB, 5000); // Tenta novamente após 5 segundos
    }
  };

  process.on("SIGINT", async () => {
    await client.close();
    console.log("Conexão com o MongoDB fechada.");
    process.exit(0);
  });

// Conectando ao banco de dados
connectToDB();

// Exportando o banco de dados para ser utilizado nas rotas
export const db = client.db("Spotify-clone");

// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
