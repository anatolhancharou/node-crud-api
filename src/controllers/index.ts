import { IncomingMessage, ServerResponse } from 'node:http';

export const handleUserRoutes = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  console.log(req, res);
};
