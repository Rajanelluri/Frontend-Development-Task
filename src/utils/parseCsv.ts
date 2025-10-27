import Papa from 'papaparse';
import type { EarthquakeRow } from '../types';

export function parseCsv(text: string): EarthquakeRow[] {
  const parsed = Papa.parse<string[]>(text, { header: true, skipEmptyLines: true });
  // Map & normalize columns from USGS CSV
  return parsed.data.map((row: any) => ({
    id: row.id || `${row.time}-${row.latitude}-${row.longitude}`,
    time: row.time,
    latitude: parseFloat(row.latitude || row.lat || '0'),
    longitude: parseFloat(row.longitude || row.lon || '0'),
    depth: parseFloat(row.depth || '0'),
    mag: parseFloat(row.mag || row.magnitude || '0'),
    place: row.place || row.location || '',
    ...row,
  }));
}
