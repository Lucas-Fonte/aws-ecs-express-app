import supertest from 'supertest';
import { app } from '../../src/index';
import * as PartnerRepository from '../../src/repositories/PartnerRepository';
import { TEST_AUTHORIZATION_TOKEN } from '../constants';
import partnersArray from '../mocks/partnersArray.json';
import partner from '../mocks/partner.json';
import nearestPartner from '../mocks/nearestPartner.json';
import partnerToCreate from '../mocks/partnerToCreate.json';
import createdPartner from '../mocks/createdPartner.json';

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('mongoose');

describe('Integration test', () => {
  describe('GET /partners', () => {
    test('should return 403 and invalid token', async () => {
      const response = await supertest(app).get('/partners');

      expect(response.statusCode).toEqual(403);
      expect(response.body).toEqual({ message: 'Invalid Authorization token' });
    });
    test('should return 200 and empty array', async () => {
      const spy = jest
        .spyOn(PartnerRepository, 'getPartners')
        .mockResolvedValueOnce([]);
      const response = await supertest(app)
        .get('/partners')
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual([]);
    });
    test('should return 200 and filled array', async () => {
      const spy = jest
        .spyOn(PartnerRepository, 'getPartners')
        .mockResolvedValueOnce(partnersArray);
      const response = await supertest(app)
        .get('/partners')
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(partnersArray);
    });
  });
  describe('GET /partners/:id', () => {
    test('should return 400 and invalid partner id message', async () => {
      const response = await supertest(app)
        .get('/partners/invalid_id')
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual({
        message: 'Invalid Partner id error, must match: /^[0-9a-fA-F]{24}$/',
      });
    });
    test('should return 404 and partner not found message', async () => {
      const NON_EXISTING_ID = '6146043194144e706a8d46db';
      const spy = jest
        .spyOn(PartnerRepository, 'getPartner')
        .mockResolvedValueOnce(null);

      const response = await supertest(app)
        .get(`/partners/${NON_EXISTING_ID}`)
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith(NON_EXISTING_ID);
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual({
        message: 'Partner not found',
      });
    });
    test('should return 200 and partner', async () => {
      const EXISTING_ID = '6146043194144e706a8d46dc';
      const spy = jest
        .spyOn(PartnerRepository, 'getPartner')
        .mockResolvedValueOnce(partner);

      const response = await supertest(app)
        .get(`/partners/${EXISTING_ID}`)
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith(EXISTING_ID);
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(partner);
    });
  });
  describe('GET /partners/search', () => {
    test('should return 400 and invalid partner id message', async () => {
      const response = await supertest(app)
        .get('/partners/search')
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual({
        message: 'Missing params',
      });
    });
    test('should return 404 and partner not found message due to query', async () => {
      const FAKE_LONGITUDE = 20;
      const FAKE_LATITUDE = 20;

      const spy = jest
        .spyOn(PartnerRepository, 'getNearestPartners')
        .mockResolvedValueOnce([]);

      const response = await supertest(app)
        .get(
          `/partners/search?longitude=${FAKE_LONGITUDE}&latitude=${FAKE_LATITUDE}`
        )
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith({
        longitude: FAKE_LONGITUDE,
        latitude: FAKE_LATITUDE,
      });
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual({
        message: 'Partner not found',
      });
    });
    test('should return 404 and partner not found message due to coverage area', async () => {
      const FAKE_LONGITUDE = 20;
      const FAKE_LATITUDE = 20;

      const spy = jest
        .spyOn(PartnerRepository, 'getNearestPartners')
        .mockResolvedValueOnce(partnersArray);

      const response = await supertest(app)
        .get(
          `/partners/search?longitude=${FAKE_LONGITUDE}&latitude=${FAKE_LATITUDE}`
        )
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith({
        longitude: FAKE_LONGITUDE,
        latitude: FAKE_LATITUDE,
      });
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toEqual({
        message: 'Partner not found',
      });
    });
    test('should return 200 and nearest partner and location inside coverage area', async () => {
      const FAKE_LONGITUDE = -49.32;
      const FAKE_LATITUDE = -25.38;

      const spy = jest
        .spyOn(PartnerRepository, 'getNearestPartners')
        .mockResolvedValueOnce(partnersArray);

      const response = await supertest(app)
        .get(
          `/partners/search?longitude=${FAKE_LONGITUDE}&latitude=${FAKE_LATITUDE}`
        )
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith({
        longitude: FAKE_LONGITUDE,
        latitude: FAKE_LATITUDE,
      });
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(nearestPartner);
    });
  });
  describe('POST /partners', () => {
    test('should return 201 and recently created partner', async () => {
      const spy = jest
        .spyOn(PartnerRepository, 'createPartner')
        .mockResolvedValueOnce(createdPartner);

      const response = await supertest(app)
        .post(`/partners`)
        .send(partnerToCreate)
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(spy).toHaveBeenCalledWith(partnerToCreate);
      expect(spy).toHaveBeenCalledTimes(1);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual(createdPartner);
    });
    test('should return 400 and validation error message', async () => {
      const invalidPartnerToCreate = partnerToCreate;
      invalidPartnerToCreate.document = 'INVALID_DOCUMENT';

      const response = await supertest(app)
        .post(`/partners`)
        .send(invalidPartnerToCreate)
        .set('Authorization', TEST_AUTHORIZATION_TOKEN);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual({
        message: 'Invalid partner schema! Error message: CNPJ is not valid',
      });
    });
  });
});
