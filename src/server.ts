import http from 'node:http';
import { handleUserRoutes } from './controllers';
import { setResponse } from './helpers';
import { StatusCode, ResponseMessage } from './constants';

export const server: http.Server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    await handleUserRoutes(req, res);
  } catch {
    setResponse(
      res,
      StatusCode.INTERNAL_SERVER_ERROR,
      JSON.stringify({ message: ResponseMessage.INTERNAL_SERVER_ERROR }),
    );
  }
});
