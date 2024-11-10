import { Handler } from 'express';
import { fileTypeFromFile } from 'file-type';
import FileService from '@/services/file';

class FileController {
  service = new FileService();

  acceptType = {
    book: ['application/pdf'],
    poster: ['application/pdf'],
    ppt: ['application/pdf']
  };

  uploadFile: Handler = async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).send('Bad Request.');
      const { path, originalname } = req.file;
      const { category } = req.params;

      const filetype = await fileTypeFromFile(path);
      const acceptType = this.acceptType[category];

      if (!acceptType) return res.status(400).send('Bad Request');
      if (!acceptType.includes(filetype.mime)) return res.status(400).send('Bad Request');

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
  };
}

export default FileController;
