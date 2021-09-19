import { connect } from 'mongoose';
import { mocked } from 'ts-jest/utils';
import supertest from 'supertest';
import { app } from '../../src/index';

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('mongoose');
mocked(
  connect('', () => {
    console.log('> Successfully connected to database!');
    app.listen(80, () => {
      console.log('> Server is running on port', 80);
    });
  })
);

describe('Integration test', () => {
  describe('health', () => {
    test('should return healthCheck response', async () => {
      const response = await supertest(app).get('/health');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        health: true,
      });
    });
  });
});
