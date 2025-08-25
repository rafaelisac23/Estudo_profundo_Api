import { Strategy as LocalStrategy } from "passport-local";
import {
  createUserToken,
  createUserTokenJWT,
  findUserByEmailAndPassword,
} from "../services/user";
import { User } from "../types/user";
import { RequestHandler } from "express";
import passport from "passport";

type LocalStrategyResponse = {
  auth: {
    token: string;
  };
  user: User;
};

export const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await findUserByEmailAndPassword(email, password);
    if (user) {
      //trocando para JWT
      const token = createUserTokenJWT(user);
      const response = {
        auth: {
          token: token,
        },
        user: user,
      };
      done(null, response);
    } else {
      return done(null, false);
    }
  }
);

export const localStrategyAuth: RequestHandler = (req, res, next) => {
  const authRequest = passport.authenticate(
    "local",
    (err: any, response: LocalStrategyResponse | false) => {
      if (response) {
        req.user = response.user;
        req.authInfo = response.auth;
        return next();
      }
      return res.status(401).json({ error: "Acesso negado" });
    }
  );

  authRequest(req, res, next);
};
