import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    avatarFilename:string;
}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request):Promise<User> {
    // Antes de salvar uma foto é necessário verificar se o usuario exite
    // e se existir, verificar se tem foto
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      // user nao existe no banco
      throw new AppError('User does not exist!', 401);
    }

    if (user.avatar) {
      // usuario existe e já tem foto
      // Deletar antigo avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // criar novo avatar
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
