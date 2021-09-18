import { MultiPolygonArea, Point } from './checkIfPointIsInPolygon';

interface Geometry {
  type: string;
  coordinates: Point | MultiPolygonArea | any;
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: {};
}

interface FeatureCollection {
  type: string;
  features: Feature[];
}

export const generateGeoJsonUrl = (features: Feature[]) => {
  const featureCollection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  featureCollection.features = [...features];
  const geoJsonEncoded = encodeURIComponent(JSON.stringify(featureCollection));

  return `http://geojson.io/#data=data:application/json,${geoJsonEncoded}`;
};

export const getCurrentLocationAddressAreaGeoJsonUrl = (
  currentLocation: Point,
  areaCoordinates: MultiPolygonArea,
  addressLocation: Point
): string => {
  const geoJsonUrl = generateGeoJsonUrl([
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: currentLocation,
      },
      properties: {
        name: 'Current location',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: areaCoordinates,
      },
      properties: {
        name: 'Coverage Area',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: addressLocation,
      },
      properties: {
        name: 'Address',
      },
    },
  ]);

  return geoJsonUrl;
};
