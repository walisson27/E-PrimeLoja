const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Simulação de "banco de dados" em memória
let produtos = [];
let idAtual = 1;

// Listar produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// Cadastrar produto
app.post("/produtos", (req, res) => {
  const { title, price, images, variants } = req.body;

  // Validação básica
  if (!title || !price || !Array.isArray(images) || images.length === 0 || !variants) {
    return res.status(400).json({ erro: "Campos obrigatórios ausentes ou inválidos." });
  }

  const novoProduto = {
    id: idAtual++,
    title,
    price,
    images,
    variants, // deve conter: { sizes: [...], colors: [...] }
    criadoEm: new Date()
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado." });
  }

  const produtoRemovido = produtos.splice(index, 1)[0];
  res.json({ mensagem: "Produto removido com sucesso.", produto: produtoRemovido });
});


app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
