import { ServerResponse } from 'node:http';

export const setResponse = (
  res: ServerResponse,
  statusCode: number,
  data?: string,
): void => {
  res.statusCode = statusCode;
  res.end(data);
};
