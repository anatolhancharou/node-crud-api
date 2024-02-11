import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { users } from '../data-base';
import { setResponse } from '../helpers';
import { StatusCode, ResponseMessage } from '../constants';

export const handleUserDeletion = (
  res: ServerResponse,
  id: string | undefined,
) => {
  if (id && validate(id)) {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      users.splice(index, 1);
      setResponse(res, StatusCode.NO_CONTENT);
    } else {
      setResponse(
        res,
        StatusCode.NOT_FOUND,
        JSON.stringify({ message: ResponseMessage.USER_NOT_FOUND }),
      );
    }
  } else {
    setResponse(
      res,
      StatusCode.BAD_REQUEST,
      JSON.stringify({ message: ResponseMessage.INVALID_ID }),
    );
  }
};
