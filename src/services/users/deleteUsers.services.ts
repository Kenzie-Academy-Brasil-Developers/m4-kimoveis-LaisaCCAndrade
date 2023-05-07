import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { TRepository } from "../../interfaces/users.interfaces";

const deleteUsersService = async (userId: number) => {
  const userRepository: TRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  await userRepository.softRemove(user!);
};

export default deleteUsersService;
