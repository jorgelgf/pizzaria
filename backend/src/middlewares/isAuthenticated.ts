import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //get token
  const authToken = req.headers.authorization;

  //block if not found token
  if (!authToken) res.status(401).end();

  //only token string
  const [, token] = authToken.split(" ");

  try {
    //verify token
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    //insert variable inside Request (user_id)
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
