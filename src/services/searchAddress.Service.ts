import { autoInjectable } from "tsyringe";
import { ElasticsearchRepository } from "../repositories/elastic.repository";
import { queyrByEnum } from "../helpers/elastic.searchQueries.helper";
import {
  QueryDslQueryContainer,
  SearchHit,
  SearchHitsMetadata,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";
import { QueryParams } from "../models/queryParams";
import { Address, SearchAddressTerm } from "../models/Address";
import { ResponseAddress } from "../models/responseAddress";
import { ElasticSourceResult } from "../models/elasticSourceResult";
import { ServiceSearchAddress } from "../models/serviceSearchAddress";

@autoInjectable()
export class SearchAddress implements ServiceSearchAddress {
  constructor(private elasticRepository: ElasticsearchRepository) {} //private repositotry: any
  async updateSearchAvailability(id: string) {
    return await this.elasticRepository.updateSearchAvailability(id);
  }

  async getElasticResult(query: QueryParams): Promise<Array<ResponseAddress>> {
    const { q, searchSpec } = query;
    const esQuery: { [key: string]: any } = queyrByEnum[searchSpec];

    this.replcaeQueryString(esQuery, searchSpec, q);
console.log('esquery ' , JSON.stringify(esQuery,null,2));
    const result = await this.elasticRepository.search(
      esQuery as QueryDslQueryContainer,
      searchSpec === "fullAddress" ? 1 : 6
    );

    return this.mapResultToResponse(result?.hits.hits as SearchHit[]);
  }
  mapResultToResponse(result: SearchHit[]): Array<ResponseAddress> {
    return result.map((item): ResponseAddress => {
      const {
        main,
        description,
        secondary,
        code,
        extraGroup,
        neighbourhood,
        type,
        group,
      } = item._source as ElasticSourceResult;
      return {
        id: item._id,
        main,
        description,
        secondary,
        code,
        extraGroup,
        neighbourhood,
        type,
        group,
      };
    });
  }
  replcaeQueryString(
    esQuery: { [key: string]: any },
    searchSpce: SearchAddressTerm,
    q: string
  ) {
    switch (searchSpce) {
      case SearchAddressTerm.main:
        esQuery.bool.must.match.main = q;
        break;
      case SearchAddressTerm.fullAddress:
        esQuery.bool.must[0].multi_match.query = q;
        break;
      case SearchAddressTerm.partialAddress:
        esQuery.bool.must.multi_match.query = q;
        break;
      default:
        "no match found"; 
        break;
    }
  } 
} 
