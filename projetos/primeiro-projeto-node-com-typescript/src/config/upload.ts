/**
 * Os Arquivos dentro da pasta config, são configurações
 * de exportação de dados que geralmente são muito utili-
 * - zados no projeto
 *
 * Neste caso, exporta-se um objeto com uma string da pasta tmp
 * e um storage relacionado a imagem salva
 *
 */

import multer from 'multer';
import path from 'path';

const tmp_folder = path.resolve(__dirname, '..', '..', 'tmp');
export default {

  directory: tmp_folder,
  storage: multer.diskStorage({
    destination: tmp_folder,
    filename(request, file, callback) {
      const fileHash = Date.now().toString();
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
