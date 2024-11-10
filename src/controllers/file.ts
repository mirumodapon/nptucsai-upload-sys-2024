import { Handler } from 'express';
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

class FileController {
  acceptType = {
    book: [],
    poster: [],
    ppt: []
  };

  uploadFile: Handler = async (req, res, next) => {
    try {
      if (!req.file) return res.status(400).send('Bad Request.');
      const { path } = req.file;
      const { category } = req.params;

      const filetype = ''; // TODO: determind if this file is allowed
      const acceptType = this.acceptType[category];

      if (!acceptType) return res.status(400).send('Bad REquest');
      if (!acceptType.includes(filetype)) return res.status(400).send('Bad REquest');

      copyFileSync(path, join(process.cwd(), 'uploads'));
      res.status(200).send('ok.');
    }
    catch (error) {
      next({ error });
    }
  };
}

export default FileController;
