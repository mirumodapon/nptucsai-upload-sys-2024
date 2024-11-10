import { File } from '@/database';
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

    copyFileSync(target, join(process.cwd(), 'uploads'));
    return File.create({
      file_id: parseFile(target).base,
      filename,
      group_id,
      create_by,
      type
    });
  }
}

export default FileService;
