import request from 'supertest';
import { server } from './server';
import { BASE_URL, ResponseMessage, StatusCode } from './constants';
import { IUser } from './types';

describe('server', () => {
  afterAll(() => {
    server.close();
  });

  const newUser: Omit<IUser, 'id'> = {
    username: 'Helic',
    age: 36,
    hobbies: ['birdwatching'],
  };

  let userId: string;

  describe('GET /api/users', () => {
    test('should respond with empty array', async () => {
      const response = await request(server).get(BASE_URL);
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/users', () => {
    test('should create a new user', async () => {
      const response = await request(server).post(BASE_URL).send(newUser);
      userId = response.body.id;
      expect(response.status).toBe(StatusCode.CREATED);
      expect(response.body).toMatchObject(newUser);
      expect(response.body).toHaveProperty('id');
    });

    test('should respond with a 400 status code', async () => {
      const wrongUser: Partial<IUser> = {
        username: 'Helic',
        age: 36,
      };
      const response = await request(server).post(BASE_URL).send(wrongUser);
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(response.body.message).toBe(ResponseMessage.BAD_REQUEST);
    });
  });

  describe('GET /api/users/{userId}', () => {
    test('should get a user by ID', async () => {
      const response = await request(server).get(`${BASE_URL}/${userId}`);
      const expectedUserObject = { ...newUser, id: response.body.id };
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toStrictEqual(expectedUserObject);
    });
  });
});
