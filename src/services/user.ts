import { User } from "../types/user";

export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  //consultar banco de dados
  if (email === "admin@hotmail.com" && password === "1234") {
    const user: User = {
      id: "2",
      name: "Fulano",
    };
    return user;
  }

  return null;
};

export const createUserToken = (user: User) => {
  return "1234";
};

export const findUserByToken = async (token: string) => {
  //consultar banco de dados
  if (token === "1234") {
    const user: User = {
      id: "2",
      name: "Fulano",
    };
    return user;
  }
  return null;
};
