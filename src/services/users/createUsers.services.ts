import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { TCreate } from "../../interfaces/users.interfaces";
import { TReturn } from "../../interfaces/users.interfaces";
import { TRepository } from "../../interfaces/users.interfaces";
import { returnSchema } from "../../schemas/users.schemas"

const createUsersService = async (
  userData: TCreate
): Promise<TReturn> => {
  const userRepository: TRepository = AppDataSource.getRepository(User);
  
  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const returnUser = returnSchema.parse(user);

  return returnUser;
};

export default createUsersService;
