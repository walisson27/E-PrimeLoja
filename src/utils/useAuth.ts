import { useState, useEffect } from "react";
import { fakeLogin } from "./authService";
import type { User } from "./authService";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    if (user) {
      throw new Error("Você já está logado!");
    }

    const loggedUser = await fakeLogin(username, password);
    setUser(loggedUser);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/login"
  };

  const register = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find((u: any) => u.username === username);

    if (userExists) {
      throw new Error("Usuário já cadastrado");
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return { user, login, logout, register };
};
