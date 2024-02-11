import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types';
import { getRequestUserData, isUserDataValid, setResponse } from '../helpers';
import { StatusCode, ResponseMessage } from '../constants';
import { users } from '../data-base';

export const handleUserCreation = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const userData: IUser | void = await getRequestUserData(req);

  if (!userData || !isUserDataValid(userData)) {
    return setResponse(
      res,
      StatusCode.BAD_REQUEST,
      JSON.stringify({ message: ResponseMessage.BAD_REQUEST }),
    );
  }

  const { username, age, hobbies } = userData;

  const newUser: IUser = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  users.push(newUser);

  setResponse(res, StatusCode.CREATED, JSON.stringify(newUser));
};
