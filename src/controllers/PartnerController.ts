import { Get, Route, Tags, Security, Post, Body, Path, Query } from 'tsoa';
import { IPartner } from '../models/Partner';
import {
  getPartner,
  getPartners,
  createPartner,
  IPartnerPayload,
  getNearestPartners,
} from '../repositories/PartnerRepository';

import { checkIfPointIsInMultiPolygon } from '../utils/checkIfPointIsInPolygon';
import { getCurrentLocationAddressAreaGeoJsonUrl } from '../utils/geoJson';

export class InvalidPartnerIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPartnerIdError';
  }
}

export class PartnerNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PartnerNotFound';
  }
}

interface SearchPartnerResponse {
  partner: IPartner;
  geoJsonUrl: string;
}
@Route('partners')
@Tags('partners')
export class PartnerController {
  @Security('api_key')
  @Get('/')
  public async getPartners(): Promise<Array<IPartner>> {
    return getPartners();
  }

  @Security('api_key')
  @Post('/')
  public async createPartner(@Body() body: IPartnerPayload): Promise<IPartner> {
    return createPartner(body);
  }

  @Security('api_key')
  @Get('/:id')
  public async getPartner(@Path() id: string): Promise<IPartner | null> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const partner = await getPartner(id);

      if (!partner) throw new PartnerNotFound('Partner not found');

      return partner;
    }

    throw new InvalidPartnerIdError(
      'Invalid Partner id error, must match: /^[0-9a-fA-F]{24}$/'
    );
  }

  @Security('api_key')
  @Get('/search')
  public async getNearestPartner(
    @Query() longitude: number,
    @Query() latitude: number
  ): Promise<SearchPartnerResponse | null> {
    const partners = await getNearestPartners({ longitude, latitude });
    const currentLocation = [longitude, latitude];

    for (const partner of partners) {
      const isPointInPolygon = checkIfPointIsInMultiPolygon(
        currentLocation,
        partner.coverageArea.coordinates
      );

      if (isPointInPolygon) {
        const geoJsonUrl = getCurrentLocationAddressAreaGeoJsonUrl(
          currentLocation,
          partner.coverageArea.coordinates,
          partner.address.coordinates
        );
        return {
          partner,
          geoJsonUrl,
        };
      }
    }

    throw new PartnerNotFound('Partner not found');
  }
}
