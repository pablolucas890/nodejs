import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  // nome email e senha vindos do body da aplicação

  const createUser = new CreateUserService();
  // Service que precede o salvamento de dados

  const user = await createUser.execute({
    name,
    email,
    password,
  });
  // user retornado do método execute da classe

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();
  const user = await updateUserAvatar.execute({
    user_id: request.user.id, // id do usuario presente no request das rotas devido a autenticação
    avatarFilename: request.file.filename, // filename presente no file do requent
  });

  delete user.password;

  // caso de certo, apresenta-se o usuario apresenta-se o user
  return response.json(user);
});

export default usersRouter;
