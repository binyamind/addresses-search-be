import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import { QueryParams } from "./queryParams";
import { ResponseAddress } from "./responseAddress";
import { SearchAddressTerm } from "./Address";

export interface ServiceSearchAddress{
     getElasticResult(
        query: QueryParams
      ): Promise<Array<ResponseAddress>>;
      mapResultToResponse(
        result: SearchHit[]
      ): Array<ResponseAddress>
      replcaeQueryString(
        esQuery: { [key: string]: any },
        searchSpce: SearchAddressTerm,
        q: string
      ): any
}