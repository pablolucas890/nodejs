/**
 * Middleware que intercepta as rotas e verifica se está tudo ok o token de autenticação
 */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload{
    iat: number;
    ext: number;
    sub: string;
}
export default function ensureAuthenticates(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  // pega o token de autorização do header vindo pela rota

  if (!authHeader) {
    /**
     * Se o token não existir quer dizer que o usario ainda não logou
     * Então cria uma nova instancia da classe AppError, passando para o
     * construtor a message e o status do erro
     */
    throw new AppError('JWT token is missing', 401);
  }
  // caso o token existe, ele está no formato (bearer token)
  /**
   * Então a função split separa as duas strings em duas const's,
   * a primeira é inutil, logo é descartada, e a segunda é o token propriamente dito
   *
   */
  const [, token] = authHeader.split(' ');
  try {
    // verifica-se então se o token é valido, utilizando a key de verificação única
    const decoded = verify(token, authConfig.jwt.secret);
    // o decoded é um objeto com varias informações, porem oque interessa é o sub
    // que neste caso é o id do usuario que foi colocado no token no momento da autenticação
    // então essa informação é separada e atribuida ao atributo user do request pro proximo
    // middleware que será a rota, poder ter o id, já que ele vai estar no request
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
    // proximo middleware
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
