import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { dataBase } from '../data-base';
import { StatusCode, ResponseMessage } from '../constants';
import { setResponse } from '../services';

export const handleGetAllUsersRequest = (res: ServerResponse): void => {
  const users = dataBase.getAllUsers();
  setResponse(res, StatusCode.OK, JSON.stringify(users));
};

export const handleGetUserByIdRequest = (
  res: ServerResponse,
  id: string,
): void => {
  if (validate(id)) {
    const user = dataBase.getUserById(id);

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
      JSON.stringify({ message: ResponseMessage.INVALID_USER_ID }),
    );
  }
};
