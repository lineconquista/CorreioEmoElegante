import { Router } from 'express';

const routes = Router();

let lenMessages = 0
const messages = []

async function setMessage(req, res, next) {
    try {
      const { message } = req.body
      

      const data = {
        id: lenMessages,
        date: new Date(),
        message,
        like: 0
      }

      messages.push(data)
      lenMessages++
      
      return res.status(200).json({});
  
    } catch (error) {
      console.log(error.message)
        next(error);
    }
}

async function listMessages(req, res, next) {
  try {
    return res.status(200).json({ messages });
  } catch (error) {
      next(error);
  }
}

async function updatedMessageLikes(req, res, next) {
  try {
    const { id } = req.body
    console.log(id)
    messages[id].like = Number(messages[id].like) + 1
    return res.status(200).json({});

  } catch (error) {
      next(error);
  }
}

routes.post('/messages',  setMessage);
routes.get('/messages',  listMessages);
routes.put('/messages',  updatedMessageLikes);

export default routes;
