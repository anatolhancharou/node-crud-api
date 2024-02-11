export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessage {
  BAD_REQUEST = 'Bad request',
  USER_NOT_FOUND = 'User not found',
  INVALID_ID = 'Invalid user ID',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  INVALID_URL = 'Invalid endpoint',
}

export const BASE_URL = '/api/users';
