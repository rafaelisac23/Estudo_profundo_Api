import { RequestHandler } from "express";

export const privateRequest: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    let authorizationToken = req.headers.authorization.split(" ")[1];

    if (authorizationToken === "123") {
      return next();
    }
  }
  return res.status(401).json({ erro: "Precisa de acesso." });
};
