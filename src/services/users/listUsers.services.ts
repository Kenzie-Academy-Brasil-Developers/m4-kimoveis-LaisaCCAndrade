import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { TAll, TRepository } from "../../interfaces/users.interfaces";
import { allSchema } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<TAll> => {
  const userRepository: TRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  const returnUser = allSchema.parse(users);

  return returnUser;
};

export default listUsersService;
