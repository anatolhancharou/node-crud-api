import { ServerResponse, IncomingMessage } from 'node:http';
import { IUser } from '../types';

export const setResponse = (
  res: ServerResponse,
  statusCode: number,
  data?: string,
): void => {
  res.statusCode = statusCode;
  res.end(data);
};

export const getRequestUserData = (
  req: IncomingMessage,
): Promise<IUser | void> => {
  return new Promise((resolve) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        const userData = JSON.parse(data) as IUser;
        resolve(userData);
      } catch {
        resolve();
      }
    });
  });
};
