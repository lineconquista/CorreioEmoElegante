import { CustomError } from './error.js';

function handler(error, res) {
  if (error instanceof CustomError) {
    return res.status(error.getCode()).json({
      status: 'error',
      message: error.json ?? error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message,
  });
}

export { handler };
