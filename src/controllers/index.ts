import { IncomingMessage, ServerResponse } from 'node:http';
import { removeTrailingSlash } from '../helpers';
import { setResponse } from '../services';
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
  const splittedUrl = reqUrl?.split(`${BASE_URL}/`) || [];
  const userId = splittedUrl.length === 2 ? splittedUrl.pop() : null;

  switch (method) {
    case RequestMethod.GET:
      if (reqUrl === BASE_URL) {
        return handleGetAllUsersRequest(res);
      }
      if (userId) {
        return handleGetUserByIdRequest(res, userId);
      }
      break;
    case RequestMethod.POST:
      if (reqUrl === BASE_URL) {
        return await handleUserCreation(req, res);
      }
      break;
    case RequestMethod.PUT:
      if (userId) {
        return await handleUserUpdate(req, res, userId);
      }
      break;
    case RequestMethod.DELETE:
      if (userId) {
        return handleUserDeletion(res, userId);
      }
      break;
  }

  setResponse(
    res,
    StatusCode.NOT_FOUND,
    JSON.stringify({ message: ResponseMessage.INVALID_ENDPOINT }),
  );
};
