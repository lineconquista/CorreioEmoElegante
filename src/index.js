import express from 'express';
import * as error from './middlewares/error/handler.js';
import bodyParser from 'body-parser';
import routes from './routes.js';
import cors from 'cors';
import path  from 'path';

function listen() {
    app.listen(port, () => {
      console.log(`App  listening at ${port} port`);
    });
}

function setMiddlewares() {
  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(express.json());
  app.use(routes);
  app.use((err, req, res, next) => {
    error.handler(err, res);
  });
  app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(path.dirname('')) + '/src/index.html'))
  })
}

const app = express();
const port = 8080;

setMiddlewares();
listen();

export default app;
