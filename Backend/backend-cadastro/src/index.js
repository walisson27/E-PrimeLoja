const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { autenticarToken, SECRET } = require("./auth");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Emulação de banco de dados em memória
let usuarios = [];
let produtos = [];
let idUsuario = 1;
let idProduto = 1;

// Rota temporária para ver todos os usuários cadastrados
app.get("/usuarios", (req, res) => {
  res.json(usuarios); // ou 'users', dependendo do nome que você usou
});



// ROTAS DE AUTENTICAÇÃO
app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha obrigatórios." });
  }

  const existe = usuarios.find((u) => u.email === email);
  if (existe) return res.status(400).json({ erro: "Usuário já existe." });

  const senhaHash = await bcrypt.hash(senha, 8);
  const novoUsuario = { id: idUsuario++, email, senha: senhaHash };
  usuarios.push(novoUsuario);

  res.status(201).json({ msg: "Usuário registrado com sucesso." });
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return res.status(401).json({ erro: "Usuário não encontrado." });

  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  if (!senhaOk) return res.status(401).json({ erro: "Senha incorreta." });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// ROTAS DE PRODUTOS
app.get("/produtos", (req, res) => {
  res.json(produtos);
});
const verificarToken = require("./middlewares/verificarToken");
app.post("/produtos", verificarToken, (req, res) => {
  const { title, price, images, variants } = req.body;

  if (!title || !price || !Array.isArray(images) || !variants) {
    return res.status(400).json({ erro: "Dados inválidos." });
  }

  const novoProduto = {
    id: idProduto++,
    title,
    price,
    images,
    variants,
    criadoPor: req.usuario.email,
    criadoEm: new Date(),
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});
app.delete("/produtos/:id", autenticarToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ erro: "Produto não encontrado." });

  produtos.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
