import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];
  jwt.verify(token, String(process.env.SECRET_KEY), (err, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }
    req.user = {
      id: parseInt(decoded.id),
      admin: decoded.admin,
    };
    return next();
  });
};

export default ensureTokenIsValidMiddleware;
