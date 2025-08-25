import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { findUserById } from "../services/user";
import { RequestHandler } from "express";
import passport from "passport";
import { User } from "../types/user";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY as string,
};

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
  console.log("payload", payload);
  const { id } = payload;

  const user = await findUserById(id);

  if (user) {
    return done(null, user);
  } else done(null, false);
});

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
  const AuthRequest = passport.authenticate("jwt", (err: any, user: User) => {
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ error: "Acesso negado" });
  });

  AuthRequest(req, res, next);
};
