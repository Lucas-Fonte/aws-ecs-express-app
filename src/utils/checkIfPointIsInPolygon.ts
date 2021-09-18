import * as turf from '@turf/turf';

export type Point = number[];
export type MultiPolygonArea = Point[][][];

export const checkIfPointIsInMultiPolygon = (
  pointCoordinates: Point,
  multiPolygonCoordinates: MultiPolygonArea
) => {
  const point = turf.point(pointCoordinates);
  const multiPolygon = turf.multiPolygon(multiPolygonCoordinates);

  const isPointInPolygon = turf.booleanPointInPolygon(point, multiPolygon);

  return isPointInPolygon;
};
