import * as bcrypt from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import { TLogin } from "../../interfaces/login.interfaces";
import { TRepository } from "../../interfaces/users.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (loginData: TLogin): Promise<string> => {
  const userRepository: TRepository = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user || user.deletedAt) {
    throw new AppError("Invalid credentials", 401);
  }

  const password = await bcrypt.compare(loginData.password, user.password);

  if (!password) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      subject: user.id.toString(),
      expiresIn: process.env.EXPIRES_IN || "24h",
    }
  );

  return token;
};

export default createLoginService;
