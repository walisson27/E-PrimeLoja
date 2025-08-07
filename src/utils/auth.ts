export const salvarUsuario = (email: string, senha: string, name: string) => {
  const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
  users.push({ email, senha, name });
  localStorage.setItem("usuarios", JSON.stringify(users));
};

export const autenticar = (email: string, senha: string) => {
  const users = JSON.parse(localStorage.getItem("usuarios") || "[]");
  return users.find((u: any) => u.email === email && u.senha === senha);
}

export const login = (email: string) => {
  localStorage.setItem("logado", email);
};

export const logout = () => {
  localStorage.removeItem("logado");
};

export const usuarioAtual = () => {
  return localStorage.getItem("logado");
};
