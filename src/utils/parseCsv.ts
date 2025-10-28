import Papa from "papaparse";
import type { EarthquakeRow } from "../types";

export function parseCsv(raw: string): EarthquakeRow[] {
  const parsed = Papa.parse(raw, { header: true });
  return parsed.data.map((row: any) => ({
    id: row.id || `${row.time}-${row.latitude}-${row.longitude}`,
    time: row.time,
    place: row.place || "",
    mag: Number(row.mag) || 0,
    depth: Number(row.depth) || 0,
    latitude: Number(row.latitude) || 0,
    longitude: Number(row.longitude) || 0,
  }));
}

