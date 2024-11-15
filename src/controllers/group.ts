import { Handler } from 'express';
import GroupService from '@/services/group';
import { CreateGroupSchema } from '@/schemas/group';
import archiver from 'archiver';
import { join } from 'node:path';

class GroupController {
  private groupService = new GroupService();

  /**
  * Create group api
  * The request body must has user list and group name
  */
  createGroup: Handler = async (req, res, next) => {
    try {
      const parse = CreateGroupSchema.parse(req.body);
      const result = await this.groupService.createGroup(parse);
      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * List group api
   * This api just list group and no more details
   * if you want more details you can use /api/groups/:id
   */
  listGroup: Handler = async (_, res, next) => {
    try {
      const result = await this.groupService.listGroup();
      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };

  /**
   * Get special group information
   */
  getGroup: Handler = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await this.groupService.getGroup(id);

      if (!result) return res.status(404).send('Not Found.');
      res.send(result);
    }
    catch (error) {
      next(error);
    }
  };

  downloadFiles: Handler = async (req, res, next) => {
    try {
      const groups = await this.groupService.listGroup();
      const archive = archiver('zip', { zlib: { level: 9 } });

      for (const group of groups) {
        archive.directory('subdir/', group.name);

        for (const file of Object.values(group.files)) {
          const path = join(process.cwd(), 'uploads', file.file_id);
          archive.file(path, { name: join(group.name, file.filename) });
        }
      }

      res.attachment('output.zip');
      archive.pipe(res);
      archive.finalize();
    }
    catch (error) {
      next({ error });
    }
  };
}

export default GroupController;
