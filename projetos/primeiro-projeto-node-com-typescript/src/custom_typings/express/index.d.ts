/**
 * Atribui para o request do express o tipo user.id
 * pois este tipo nao faz parte dos atributos do json
 * do Request do Express.
 */
declare namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
