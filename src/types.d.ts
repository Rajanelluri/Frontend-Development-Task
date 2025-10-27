export type EarthquakeRow = {
  id: string;
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  mag: number;
  place: string;
  [key: string]: any;
};
