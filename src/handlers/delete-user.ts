import { ServerResponse } from 'node:http';

export const handleUserDeletion = (
  res: ServerResponse,
  id: string | undefined,
) => {
  console.log(res);
  console.log(id);
};
