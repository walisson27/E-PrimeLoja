export type User = {
  username: string;
  token: string;
};

export const fakeLogin = (
  username: string,
  password: string
): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (foundUser) {
        resolve({
          username,
          token: "fake-jwt-token-" + Math.random().toString(36).substring(2)
        });
      } else {
        reject(new Error("Usuário ou senha inválidos"));
      }
    }, 500);
  });
};
