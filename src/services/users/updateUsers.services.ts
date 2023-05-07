import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  TRepository,
  TReturn,
  TUpdate,
} from "../../interfaces/users.interfaces";
import { returnSchema } from "../../schemas/users.schemas";

const updateUsersService = async (
  userData: TUpdate,
  id: number
): Promise<TReturn> => {
  const userRepository: TRepository = AppDataSource.getRepository(User);
  const users: User | null = await userRepository.findOneBy({ id: id });
  const updateUser = userRepository.create({
    ...users,
    ...userData,
  });
  await userRepository.save(updateUser);

  const returnUser = returnSchema.parse(updateUser);

  return returnUser;
};

export default updateUsersService;
