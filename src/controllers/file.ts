import { Handler } from 'express';
import { fileTypeFromFile } from 'file-type';
import FileService from '@/services/file';
import { unlinkSync, existsSync } from 'node:fs';

class FileController {
  service = new FileService();

  acceptType = {
    book: ['application/pdf'],
    poster: ['application/pdf'],
    ppt: ['application/pdf']
  };

  uploadFile: Handler = async (req, res, next) => {
    let path = '';
    try {
      if (!req.file) return res.status(400).send({ message: 'Bad Request.' });
      req.file.originalname = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
      const { originalname } = req.file;
      const { category } = req.params;
      path = req.file.path;

      const filetype = await fileTypeFromFile(path);
      const acceptType = this.acceptType[category];

      if (!acceptType) return res.status(400).send({ message: 'Bad Request' });
      if (!acceptType.includes(filetype.mime)) return res.status(400).send({ message: '檔案類型不支援' });

      // @ts-ignore-next-line
      const group_id = req.group_id;
      // @ts-ignore-next-line
      const user_id = req.user_id;
      const result = await this.service.uploadFile({
        target: path,
        filename: originalname,
        type: category,
        create_by: user_id,
        group_id
      });

      res.status(200).send(result);
    }
    catch (error) {
      next({ error });
    }
    finally {
      if (path && existsSync(path)) {
        unlinkSync(path);
      }
    }
  };

  listFiles: Handler = async (req, res, next) => {
    try {
      // @ts-ignore-next-line
      const group_id = req.group_id;
      const type = req.params.type;
      const result = await this.service.listFile(group_id, type);
      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };
}

export default FileController;
