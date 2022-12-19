import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "@infra/config/auth";

export function protect(req: Request, res: Response, next) {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "Not valid token!" });
    return;
  }

  try {
    const user = jwt.verify(token, authConfig.jwt.secret);

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    return;
  }
}
