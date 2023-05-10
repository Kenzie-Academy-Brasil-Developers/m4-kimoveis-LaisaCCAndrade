import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleErros = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleErros };
