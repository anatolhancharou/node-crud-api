import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types';
import { dataBase } from '../data-base';
import { isUserDataValid } from '../helpers';
import { getRequestUserData, setResponse } from '../services';
import { StatusCode, ResponseMessage } from '../constants';

export const handleUserCreation = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const userData: IUser | void = await getRequestUserData(req);

  if (!userData || !isUserDataValid(userData)) {
    return setResponse(
      res,
      StatusCode.BAD_REQUEST,
      JSON.stringify({ message: ResponseMessage.INVALID_REQUEST_BODY }),
    );
  }

  const { username, age, hobbies } = userData;

  const newUser: IUser = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };

  dataBase.addNewUser(newUser);

  setResponse(res, StatusCode.CREATED, JSON.stringify(newUser));
};
