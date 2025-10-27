import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseCsv } from "../utils/parseCsv";
import type { EarthquakeRow } from "../types";

const USGS_CSV =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv";

export function useEarthquakeData() {
  return useQuery({
    queryKey: ["earthquakes"],
    queryFn: async (): Promise<EarthquakeRow[]> => {
      const res = await axios.get(USGS_CSV);
      return parseCsv(res.data);
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
