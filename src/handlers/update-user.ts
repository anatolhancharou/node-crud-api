import { IncomingMessage, ServerResponse } from 'node:http';

export const handleUserUpdate = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string | undefined,
): Promise<void> => {
  console.log(req);
  console.log(res);
  console.log(id);
};
