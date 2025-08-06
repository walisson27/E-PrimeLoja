const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: "Token não enviado" });
  }

  jwt.verify(token, "seu_segredo_jwt", (err, user) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" });
    }

    req.user = user; // salva info do usuário para outras rotas
    next();
  });
}

module.exports = verificarToken;
