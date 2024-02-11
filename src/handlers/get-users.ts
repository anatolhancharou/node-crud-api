import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { StatusCode, ResponseMessage } from '../constants';
import { users } from '../data-base';
import { setResponse } from '../helpers';

export const handleGetAllUsersRequest = (res: ServerResponse): void => {
  setResponse(res, StatusCode.OK, JSON.stringify(users));
};

export const handleGetUserByIdRequest = (
  res: ServerResponse,
  id: string | undefined,
): void => {
  if (id && validate(id)) {
    const user = users.find((item) => item.id === id);

    if (user) {
      setResponse(res, StatusCode.OK, JSON.stringify(user));
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
