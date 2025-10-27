import Papa from "papaparse";
import type { EarthquakeRow } from "../types";

export function parseCsv(text: string): EarthquakeRow[] {
  const parsed = Papa.parse<any>(text, { header: true, skipEmptyLines: true });

  return parsed.data
    .map((row: any) => ({
      id: row.id || `${row.time}-${row.latitude}-${row.longitude}`,
      time: row.time,
      latitude: Number(row.latitude) || 0,
      longitude: Number(row.longitude) || 0,
      depth: Number(row.depth) || 0,
      mag: Number(row.mag) || Number(row.magnitude) || 0,
      place: row.place || row.location || "Unknown",
      ...row,
    }))
    .filter((r) => !isNaN(r.latitude) && !isNaN(r.longitude));
}
