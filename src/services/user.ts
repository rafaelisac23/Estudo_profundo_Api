import { User } from "../types/user";
import jwt from "jsonwebtoken";

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

//criando token para usar JWT
export const createUserTokenJWT = (user: User) => {
  const payload = {
    id: user.id,
  };
  //terceiro parametro é de opções expiresIn: "1 minute", mas normalmente nao se poe
  return jwt.sign(payload, process.env.JWT_KEY as string);
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

export const findUserById = async (id: string) => {
  //consultar banco
  if (id === "2") {
    const user: User = {
      id: "2",
      name: "Fulano",
    };
    return user;
  }
  return null;
};
