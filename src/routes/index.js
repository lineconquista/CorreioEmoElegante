import * as schema from '../middlewares/schema/schema.js';
import { checkSchema } from 'express-validator';
import { Router } from 'express';
import { reservaSchema } from '../schemas/reserva.js'
import {listDatas} from './routes.js';

const routes = Router();

// routes.post('/reserva', checkSchema(reservaSchema), schema.handler, createReserva);
// routes.get('/info', listInfo);
routes.get('/info/datas',  listDatas);

routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
