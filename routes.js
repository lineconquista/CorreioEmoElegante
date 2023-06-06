import { Router } from 'express';
import knexfile from './knexfile.js';
import knex from 'knex';
import { randomUUID } from 'crypto';

const routes = Router();
const client = knex(knexfile);


async function setMessage(req, res, next) {
    try {
      const { message } = req.body
      
      const data = {
        id: randomUUID(),
        createdAt: new Date(),
        message,
        like: 0
      }

      await client('messages')
      .insert(data)
      .catch((error) => {
        throw new Error(error.detail);
      });

      return res.status(200).json({});
  
    } catch (error) {
      next(error);
    }
}

async function listMessages(req, res, next) {
  try {
    const messages = await client.select('id', 'createdAt', 'message', 'like').from('messages').catch((error) => {
      throw new Error(error.detail);
    });

    return res.status(200).json({ messages });
  } catch (error) {
      next(error);
  }
}

async function updatedMessageLikes(req, res, next) {
  try {
    const { id } = req.body
    await client("messages").increment('like').where('id',id).catch((error) => {
        throw new Error(error.detail);
    });
    return res.status(200).json({});

  } catch (error) {
      next(error);
  }
}

routes.post('/messages',  setMessage);
routes.get('/messages',  listMessages);
routes.put('/messages',  updatedMessageLikes);
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default routes;
