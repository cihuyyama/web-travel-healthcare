import { Disease } from "./Disease";

export type Endemic = {
    id: number;
    DiseaseEndemic: Disease[];
    country_name: string;
    risk_level: string;
    created_at: string;
    updated_at: string;
  }