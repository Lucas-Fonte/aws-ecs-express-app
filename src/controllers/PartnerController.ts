import { Get, Route, Tags, Post, Body, Path, Query, Security } from 'tsoa';
import { IPartner } from '../models/Partner';
import * as Yup from 'yup';
import {
  getPartner,
  getPartners,
  createPartner,
  IPartnerPayload,
  getNearestPartners,
} from '../repositories/PartnerRepository';

import { checkIfPointIsInMultiPolygon } from '../utils/checkIfPointIsInPolygon';
import { getCurrentLocationAddressAreaGeoJsonUrl } from '../utils/geoJson';
import { validateCNPJ } from 'validations-br';
import { Position } from '@turf/helpers';

export class InvalidPartnerIdError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPartnerIdError';
  }
}
export class InvalidPartnerSchema extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPartnerSchema';
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
  @Security('basic')
  @Get('/')
  public async getPartners(): Promise<Array<IPartner>> {
    return getPartners();
  }

  @Security('basic')
  @Post('/')
  public async createPartner(@Body() body: IPartnerPayload): Promise<IPartner> {
    try {
      const schema = Yup.object().shape({
        tradingName: Yup.string().required(),
        ownerName: Yup.string().required(),
        document: Yup.string().test(
          'is-cnpj',
          'CNPJ is not valid',
          (value: any) => validateCNPJ(value)
        ),
        coverageArea: Yup.object().shape({
          type: Yup.string().required(),
          coordinates: Yup.array()
            .length(1)
            .of(
              Yup.array()
                .length(1)
                .of(Yup.array().of(Yup.array().length(2).of(Yup.number())))
            )
            .required(),
        }),
        address: Yup.object().shape({
          type: Yup.string().required(),
          coordinates: Yup.array().length(2).of(Yup.number()).required(),
        }),
      });

      await schema.validate(body);
    } catch (error) {
      throw new InvalidPartnerSchema(
        // @ts-ignore
        `Invalid partner schema! Error message: ${error.message}`
      );
    }

    return createPartner(body);
  }

  @Security('basic')
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

  @Security('basic')
  @Get('/search')
  public async getNearestPartner(
    @Query() longitude: number,
    @Query() latitude: number
  ): Promise<SearchPartnerResponse | null> {
    const partners = await getNearestPartners({ longitude, latitude });
    const currentLocation: Position = [longitude, latitude];

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
