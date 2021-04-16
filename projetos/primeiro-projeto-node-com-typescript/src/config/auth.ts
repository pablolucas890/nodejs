/**
 * Os Arquivos dentro da pasta config, são configurações
 * de exportação de dados que geralmente são muito utili-
 * - zados no projeto
 *
 * Neste caso, exporta-se um objeto com uma key e um tempo
 * de expiração pro jwt token
 *
 */
export default {
  jwt: {
    secret: 'haosdhfoiahsdfóihaoisfhdaah',
    expiresIn: '1d',
  },
};
