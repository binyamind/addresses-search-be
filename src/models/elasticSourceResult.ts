import { Address } from "./Address";

export interface ElasticSourceResult {
  _id: string;
  main: string;
  description: string;
  secondary: string;
  group: string;
  extraGroup: string | null;
  type: string;
  code: number;
  neighbourhood: string;
  isAvailableForSearch: boolean;
}
