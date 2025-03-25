// API significa Application Programming Interface
// POST, GET, PUT, DELETE
// CRUD - Create Read Update Delete
// Endpoint
// Middleware

import express from "express";
import cors from "cors";
import { connectToDB } from "./connect.js";
import path from "path";

const __dirname = path.resolve();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());  // Habilitar o middleware para JSON

// Conectar ao banco de dados
let db;
connectToDB()
  .then((database) => {
    db = database;
  })
  .catch((error) => {
    console.error("Falha ao conectar ao banco de dados:", error);
    process.exit(1); // Encerra a aplicação se não conseguir conectar ao banco
  });

// Rota inicial
app.get("/api/", (request, response) => {
  response.send("Só vamos trabalhar com os endpoints '/artists' e '/songs'");
});

// Rota de artistas com paginação
app.get("/api/artists", async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  try {
    const artists = await db.collection("artists")
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    response.json(artists);
  } catch (error) {
    response.status(500).json({ error: "Erro ao buscar artistas." });
  }
});

// Rota de músicas com paginação
app.get("/api/songs", async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  try {
    const songs = await db.collection("songs")
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    response.json(songs);
  } catch (error) {
    response.status(500).json({ error: "Erro ao buscar músicas." });
  }
});

// Servir arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, "../../front-end/dist")));

// Rota padrão para o front-end
app.get("*", async (request, response) => {
  response.sendFile(path.join(__dirname, "../../front-end/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
