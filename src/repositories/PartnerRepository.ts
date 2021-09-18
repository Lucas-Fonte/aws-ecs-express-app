import { Partner, IPartner } from '../models/Partner';

export interface IPartnerPayload {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: {
    type: string;
    coordinates: number[][][][];
  };
  address: {
    type: string;
    coordinates: number[];
  };
}

export const getPartners = async (): Promise<Array<IPartner>> => {
  const partners = await Partner.find();
  return partners;
};

export const createPartner = async (
  payload: IPartnerPayload
): Promise<IPartner> => {
  return await Partner.create({
    ...payload,
  });
};

export const getPartner = async (id: string): Promise<IPartner | null> => {
  const partner = await Partner.findById(id);
  if (!partner) return null;
  return partner;
};

export const getNearestPartners = async ({
  latitude,
  longitude,
}: {
  longitude: number;
  latitude: number;
}): Promise<IPartner[] | []> => {
  const partners = await Partner.find({})
    .where('address.coordinates')
    .near({ center: { type: 'Point', coordinates: [longitude, latitude] } });

  if (!partners) return [];
  return partners;
};
