import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulando um banco de dados em memória
const usuarios: any[] = [];

// Rota de cadastro
app.post("/cadastro", (req, res) => {
  const { name, email, address, password } = req.body;

  if (!name || !email || !address || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const novoUsuario = { id: Date.now(), name, email, address, password };
  usuarios.push(novoUsuario);

  console.log("Usuário cadastrado:", novoUsuario);

  res.status(201).json({ message: "Usuário cadastrado com sucesso!", data: novoUsuario });
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.listen(port, () => {
  console.log(` rodando em http://localhost:${port}`);
});
