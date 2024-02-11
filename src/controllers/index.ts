import { IncomingMessage, ServerResponse } from 'node:http';
import { removeTrailingSlash, setResponse } from '../helpers';
import {
  BASE_URL,
  StatusCode,
  ResponseMessage,
  RequestMethod,
} from '../constants';
import {
  handleGetAllUsersRequest,
  handleGetUserByIdRequest,
  handleUserCreation,
  handleUserUpdate,
  handleUserDeletion,
} from '../handlers';

export const handleRequests = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const { method, url } = req;
  const reqUrl = url && removeTrailingSlash(url);
  const urlMatchedContents = reqUrl?.split(`${BASE_URL}/`) || [];

  if (reqUrl !== BASE_URL && urlMatchedContents.length < 2) {
    return setResponse(
      res,
      StatusCode.NOT_FOUND,
      JSON.stringify({ message: ResponseMessage.INVALID_URL }),
    );
  }

  switch (method) {
    case RequestMethod.GET:
      if (reqUrl === BASE_URL) {
        return handleGetAllUsersRequest(res);
      }
      if (urlMatchedContents.length > 1) {
        return handleGetUserByIdRequest(res, urlMatchedContents[1]);
      }
      break;
    case RequestMethod.POST:
      if (reqUrl === BASE_URL) {
        return await handleUserCreation(req, res);
      }
      break;
    case RequestMethod.PUT:
      if (urlMatchedContents.length > 1) {
        return await handleUserUpdate(req, res, urlMatchedContents[1]);
      }
      break;
    case RequestMethod.DELETE:
      if (urlMatchedContents.length > 1) {
        return handleUserDeletion(res, urlMatchedContents[1]);
      }
      break;
  }

  setResponse(
    res,
    StatusCode.BAD_REQUEST,
    JSON.stringify({ message: ResponseMessage.BAD_REQUEST }),
  );
};
