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

  const validUuid = '3a3558c0-219c-42fb-89c9-8f719b5ab5d0';
  let userId: string;

  describe('CRUD operations with users', () => {
    test('should respond with empty array on GET /api/users', async () => {
      const response = await request(server).get(BASE_URL);
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toEqual([]);
    });

    test('should create a new user on POST /api/users', async () => {
      const response = await request(server).post(BASE_URL).send(newUserData);
      userId = response.body.id;
      expect(response.status).toBe(StatusCode.CREATED);
      expect(response.body).toMatchObject(newUserData);
      expect(response.body).toHaveProperty('id');
    });

    test('should get a user by ID on GET /api/users/{userId}', async () => {
      const response = await request(server).get(`${BASE_URL}/${userId}`);
      const expectedUserObject = { ...newUserData, id: userId };
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toStrictEqual(expectedUserObject);
    });

    test('should update a user on PUT /api/users/{userId}', async () => {
      const response = await request(server)
        .put(`${BASE_URL}/${userId}`)
        .send({ ...newUserData, age: 37 });
      const expectedUserData = { ...newUserData, id: userId, age: 37 };
      expect(response.status).toBe(StatusCode.OK);
      expect(response.body).toStrictEqual(expectedUserData);
    });

    test('should delete a user on DELETE /api/users/{userId}', async () => {
      const response = await request(server).delete(`${BASE_URL}/${userId}`);
      expect(response.status).toBe(StatusCode.NO_CONTENT);
    });

    test('should respond with 404 on GET /api/users/{userId}', async () => {
      const response = await request(server).get(`${BASE_URL}/${userId}`);
      expect(response.status).toBe(StatusCode.NOT_FOUND);
      expect(response.body.message).toBe(ResponseMessage.USER_NOT_FOUND);
    });
  });

  describe('invalid input data handling', () => {
    test('should respond with 404 if provided incorrect url', async () => {
      const response = await request(server).get('/some-non/existing/resource');
      expect(response.status).toBe(StatusCode.NOT_FOUND);
      expect(response.body.message).toBe(ResponseMessage.INVALID_ENDPOINT);
    });

    test('should respond with 400 on GET if provided invalid userId', async () => {
      const response = await request(server).get(`${BASE_URL}/1`);
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(response.body.message).toBe(ResponseMessage.INVALID_USER_ID);
    });

    test('should respond with 404 on GET if provided valid uuid but user not found', async () => {
      const response = await request(server).get(`${BASE_URL}/${validUuid}`);
      expect(response.status).toBe(StatusCode.NOT_FOUND);
      expect(response.body.message).toBe(ResponseMessage.USER_NOT_FOUND);
    });

    test('should respond with 400 on POST if provided user data with missing fields', async () => {
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

    test('should respond with 400 on POST if provided user data with incorrect type of values', async () => {
      const invalidUserData = {
        username: 'Helic',
        age: 36,
        hobbies: 'skateboarding',
      };
      const response = await request(server)
        .post(BASE_URL)
        .send(invalidUserData);
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(response.body.message).toBe(ResponseMessage.INVALID_REQUEST_BODY);
    });

    test('should respond with 400 on POST if provided user data of incorrect type', async () => {
      const invalidUserData = 'Fobos';
      const response = await request(server)
        .post(BASE_URL)
        .send(invalidUserData);
      expect(response.status).toBe(StatusCode.BAD_REQUEST);
      expect(response.body.message).toBe(ResponseMessage.INVALID_REQUEST_BODY);
    });
  });

  describe('excessive data handling', () => {
    test('should ignore additional user data fields', async () => {
      const userData = { ...newUserData, height: 170 };
      const response = await request(server).post(BASE_URL).send(userData);
      expect(response.status).toBe(StatusCode.CREATED);
      expect(response.body).toStrictEqual({
        ...newUserData,
        id: response.body.id,
      });
    });

    test('should handle trailing slash in url', async () => {
      const response = await request(server).get(`${BASE_URL}/`);
      expect(response.status).toBe(StatusCode.OK);
    });
  });

  describe('unsupported methods handling', () => {
    test('should respond with 404 on PATCH', async () => {
      const userData = { age: 40 };
      const response = await request(server)
        .patch(`${BASE_URL}/${validUuid}`)
        .send(userData);
      expect(response.status).toBe(StatusCode.NOT_FOUND);
      expect(response.body.message).toBe(ResponseMessage.INVALID_ENDPOINT);
    });
  });
});
