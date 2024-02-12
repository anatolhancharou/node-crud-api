import http from 'node:http';
import { handleRequests } from '../controllers';
import { setResponse } from '../services';
import { StatusCode, ResponseMessage } from '../constants';

export const server: http.Server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    await handleRequests(req, res);
  } catch {
    setResponse(
      res,
      StatusCode.INTERNAL_SERVER_ERROR,
      JSON.stringify({ message: ResponseMessage.INTERNAL_SERVER_ERROR }),
    );
  }
});
