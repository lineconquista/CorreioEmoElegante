
import { randomUUID } from 'crypto';
import axios from "axios";
import { Router } from 'express';

const routes = Router();

async function setMessage(req, res, next) {
    try {
      const { message } = req.body
  
      const data = [{
        id: randomUUID(),
        date: new Date(),
        message: message,
        like: 0
      }]
  
      await axios
      .post(
        `https://sheetdb.io/api/v1/14z2p668j3o8x`,
        {
          data
        }, 
      )
  
      return res.status(200).json({});
  
    } catch (error) {
        next(error);
    }
}

async function listMessages(req, res, next) {
  try {
    const messages = await axios
    .get(
      `https://sheetdb.io/api/v1/14z2p668j3o8x`
    )
    .then(({data}) => {
      return data
    });

    messages.sort(function (a, b) {
      return b.like - a.like;
    })

    return res.status(200).json({ messages });

  } catch (error) {
      next(error);
  }
}

async function updatedMessageLikes(req, res, next) {
  try {
    const { id } = req.body

    const message = await axios
    .get(
      `https://sheetdb.io/api/v1/14z2p668j3o8x/search?id=${id}`
    )
    .then(({data}) => {
      return data
    });

    const data = [{
      date: message[0].date,
      message: message[0].message,
      like: Number(message[0].like) + 1
    }]

    await axios
    .put(
      `https://sheetdb.io/api/v1/14z2p668j3o8x/id/${id}`,
      {
        data
      }, 
    )

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
