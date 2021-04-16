/**
 * definição de tipo de atributo e retorno de métodos em ts
 * Atributo : tipo
 */

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import User from '../models/User';
import AppError from '../errors/AppError';

/**
 * Interface define tipos para conjunto de dados
 */

interface Request {
    email: string;
    password: string;
}
interface Response {
    user : User;
    token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    // Repositório genérico da do typeorm

    const user = await usersRepository.findOne({
      // Seleciona o usuario do banco a partir do email
      where: {
        email, // email, é igual à email: email
      },
    });

    if (!user) {
      // Caso nao exita o email, o usuario nao existe
      throw new AppError('Incorrect email/password combination.', 401);
    }
    if (user.password) {
      // Neste caso o usuario existe, mas ainda é necessário verificar a senha
      // compara a senha vindo pela rota com a senha do user do banco
      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        // caso a senha nao bata
        throw new AppError('Incorrect email/password combination.', 401);
      }
    }

    // Caso tudo de certo, ocorre a criação do token
    /*

        Método sign do jwt token:
        sign(
            payload,
            chave secreta (string),
            obejto de configurações como subject e tempo de validade,
        )

    */

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    // caso tudo de certo, o token e o user é retornado
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
