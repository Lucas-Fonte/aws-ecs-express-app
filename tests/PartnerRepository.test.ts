import * as PartnerRepository from '../src/repositories/PartnerRepository';
import { Partner } from '../src/models/Partner';
import partner from './mocks/partner.json';
import partnersArray from './mocks/partnersArray.json';
import partnerToCreate from './mocks/partnerToCreate.json';
import createdPartner from './mocks/createdPartner.json';
import nearestPartner from './mocks/nearestPartner.json';

afterEach(() => {
  jest.resetAllMocks();
});

describe('PartnerRepository', () => {
  describe('getPartners', () => {
    test('should return partners array', async () => {
      const spy = jest
        .spyOn(Partner, 'find')
        // @ts-ignore
        .mockResolvedValueOnce(partnersArray);
      const partners = await PartnerRepository.getPartners();
      expect(partners).toEqual(partnersArray);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('createPartner', () => {
    test('should return created partner', async () => {
      const spy = jest
        .spyOn(Partner, 'create')
        // @ts-ignore
        .mockResolvedValueOnce(createdPartner);
      const partner = await PartnerRepository.createPartner(partnerToCreate);
      expect(partner).toEqual(createdPartner);
      expect(spy).toHaveBeenCalledWith(partnerToCreate);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('getPartner', () => {
    test('should return partner', async () => {
      const FAKE_PARTNER_ID = '6146043194144e706a8d46dc';
      const spy = jest
        .spyOn(Partner, 'findById')
        // @ts-ignore
        .mockResolvedValueOnce(partner);
      const foundPartner = await PartnerRepository.getPartner(FAKE_PARTNER_ID);
      expect(foundPartner).toEqual(partner);
      expect(spy).toHaveBeenCalledWith(FAKE_PARTNER_ID);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('getNearestPartners', () => {
    test('should return nearest partners', async () => {
      const FAKE_LONGITUDE = -49.32;
      const FAKE_LATITUDE = -25.38;

      const fakeQuery = {
        where: () => {
          near: () => {};
        },
      };
      const spy = jest
        .spyOn(Partner, 'find')
        // @ts-ignore
        .mockResolvedValueOnce(nearestPartner.partner);
      const partner = await PartnerRepository.getNearestPartners({
        longitude: FAKE_LONGITUDE,
        latitude: FAKE_LATITUDE,
      });

      expect(partner).toEqual(nearestPartner.partner);
      expect(spy).toHaveBeenCalledWith({
        'address.coordinates': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [FAKE_LONGITUDE, FAKE_LATITUDE],
            },
          },
        },
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
