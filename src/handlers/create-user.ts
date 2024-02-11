import { IncomingMessage, ServerResponse } from 'node:http';

export const handleUserCreation = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  console.log(req);
  console.log(res);
};
