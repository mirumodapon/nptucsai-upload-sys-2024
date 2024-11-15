import ParamService from '@/services/param';
import { Handler } from 'express';
import { SetParamBody, GetParamPayload } from '@/schemas/param';

class ParamController {
  service = new ParamService();

  getParam: Handler = async (req, res, next) => {
    try {
      const key = req.params.key.toString();
      const result = await this.service.getParam(key);

      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };

  getParams: Handler = async (req, res, next) => {
    try {
      const { key } = GetParamPayload.parse(req.query);

      if (!key.match(/[A-Z,]*/)) {
        return res.status(400).send('Bad Request.');
      }

      const result = await this.service.getParams(key.split(','));
      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };

  setParams: Handler = async (req, res, next) => {
    try {
      const body = SetParamBody.parse(req.body);
      const result = await this.service.setParam(body.key, body.value);

      res.send(result);
    }
    catch (error) {
      next({ error });
    }
  };
}

export default ParamController;
