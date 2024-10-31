import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import { QueryParams } from "./queryParams";
import { ResponseAddress, ResponseAddressWithFilters } from "./responseAddress";
import { SearchAddressTerm } from "./Address";
import { Aggregations } from "./elasticSourceResult";

export interface ServiceSearchAddress{
     getElasticResult(
        query: QueryParams
      ): Promise<ResponseAddressWithFilters>;
      mapResultToResponse(
        result: SearchHit[],
        aggregations: Aggregations
      ): ResponseAddressWithFilters
      replcaeQueryString(
        esQuery: { [key: string]: any },
        searchSpce: SearchAddressTerm,
        q: string
      ): any
}