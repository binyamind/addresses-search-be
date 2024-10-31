import { SearchAddressTerm } from "./Address";

export interface QueryParams {
  q: string;
  searchSpec: SearchAddressTerm;
  filters?: { [key: string]: string };
}
