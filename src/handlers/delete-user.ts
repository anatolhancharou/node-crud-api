import { ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { dataBase } from '../data-base';
import { setResponse } from '../services';
import { StatusCode, ResponseMessage } from '../constants';

export const handleUserDeletion = (res: ServerResponse, id: string) => {
  if (validate(id)) {
    try {
      dataBase.deleteUser(id);
      setResponse(res, StatusCode.NO_CONTENT);
    } catch {
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
