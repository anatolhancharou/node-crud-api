import request from 'supertest';
import { server } from '.';
import { BASE_URL, ResponseMessage, StatusCode } from '../constants';
import { IUser } from '../types';

describe('server', () => {
  afterAll(() => {
    server.close();
  });

  const newUserData: Omit<IUser, 'id'> = {
    username: 'Helic',
    age: 36,
    hobbies: ['Birdwatching'],
  };

  let userId: string;

  describe('GET api/users', () => {
    test('should respond with empty array', async () => {
      const response = await request(server).get(BASE_URL);
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST api/users', () => {
    test('should create a new user', async () => {
      const response = await request(server).post(BASE_URL).send(newUserData);
      userId = response.body.id;
      expect(response.status).toBe(StatusCode.CREATED);
      expect(response.body).toMatchObject(newUserData);
      expect(response.body).toHaveProperty('id');
    });

    test('should respond with a 400 status code', async () => {
      const invalidUserData: Partial<IUser> = {
        username: 'Helic',
        age: 36,
      };
      const response = await request(server)
        .post(BASE_URL)
        .send(invalidUserData);
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(response.body.message).toBe(ResponseMessage.INVALID_REQUEST_BODY);
    });
  });

  describe('GET api/users/{userId}', () => {
    test('should get a user by ID', async () => {
      const response = await request(server).get(`${BASE_URL}/${userId}`);
      const expectedUserObject = { ...newUserData, id: response.body.id };
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toStrictEqual(expectedUserObject);
    });
  });
});
