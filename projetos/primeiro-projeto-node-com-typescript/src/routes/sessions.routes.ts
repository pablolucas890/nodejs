import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  // Criação de uma nova sessão (autenticação do usuario)
  const { email, password } = request.body;
  // Json com os campos email e password do body da requisição post

  const authenticateUser = new AuthenticateUserService();
  // Intancia da Classe AuthenticateUserService que autentifica o usuario

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  // user e token retornados do método execute da classe

  delete user.password;
  // delete do user, pois não é interessante apresentar a senha do usuario em um json
  // por motivos de segurança

  return response.json({
    user, // user sem a senha
    token, // token recém criado
  });
});

export default sessionsRouter;
