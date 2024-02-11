import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { IUser } from '../types';
import { getRequestUserData, isUserDataValid, setResponse } from '../helpers';
import { StatusCode, ResponseMessage } from '../constants';
import { users } from '../data-base';

export const handleUserUpdate = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string | undefined,
): Promise<void> => {
  if (id && validate(id)) {
    const userData: IUser | void = await getRequestUserData(req);

    if (!userData || !isUserDataValid(userData)) {
      return setResponse(
        res,
        StatusCode.BAD_REQUEST,
        JSON.stringify({ message: ResponseMessage.BAD_REQUEST }),
      );
    }

    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
      const { username, age, hobbies } = userData;

      users[index] = { ...users[index], username, age, hobbies } as IUser;

      setResponse(res, StatusCode.OK, JSON.stringify(users[index]));
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
      JSON.stringify({ message: ResponseMessage.BAD_REQUEST }),
    );
  }
};
