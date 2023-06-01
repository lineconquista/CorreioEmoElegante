import { validationResult } from 'express-validator';
import { BadRequest } from '../error/error.js';

function handler(req, res, next) {
  const schemaErros = validationResult(req);

  try {
    if (!schemaErros.isEmpty()) {
      throw new BadRequest(undefined, schemaErros.array());
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { handler };
