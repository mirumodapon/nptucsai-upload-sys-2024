import sequelize, { File, User } from '@/database';
import { copyFileSync } from 'node:fs';
import { join, parse as parseFile } from 'node:path';

type I_UploadFile = {
  group_id: number;
  filename: string;
  target: string;
  type: string;
  create_by: string;
};

class FileService {
  async uploadFile(payload: I_UploadFile) {
    const { group_id, filename, target, type, create_by } = payload;
    const file_id = parseFile(target).base;

    copyFileSync(target, join(process.cwd(), 'uploads', file_id));
    return File.create({
      file_id,
      filename,
      group_id,
      create_by,
      type
    });
  }

  listFile(group_id: number, type: string) {
    return File.findAll({
      where: { group_id, type },
      include: [User],
      order: [['created_at', 'DESC']]
    });
  }
}

export default FileService;
