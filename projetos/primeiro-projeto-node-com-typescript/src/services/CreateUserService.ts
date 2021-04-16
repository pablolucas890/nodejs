import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}
class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // Antes de criar um usuario é necessario que este service verifique se já
    // existe um usuario com esse email

    const checkUsersExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUsersExists) {
      throw new AppError('Email address already used by another');
    }
    // transforma a senha em um hash por motivos de segurança

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    // salva
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
