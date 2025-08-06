const jwt = require("jsonwebtoken");

const SECRET = "sua_chave_secreta_segura"; // Em produção, use uma variável de ambiente
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ erro: "Token não enviado." });

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: "Token inválido." });

    req.usuario = usuario;
    next();
  });
}

module.exports = { autenticarToken, SECRET };
