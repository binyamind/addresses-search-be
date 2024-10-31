import { autoInjectable } from "tsyringe";
import { ElasticsearchRepository } from "../repositories/elastic.repository";
import {
  availableNeighbourhoodsFilterQuery,
  availableTypeFilterQuery,
  filtersQuery,
  getFiltersQuery,
  queyrByEnum,
  searchByFullAddress,
} from "../helpers/elastic.searchQueries.helper";
import {
  AggregateName,
  AggregationsAggregate,
  AggregationsBuckets,
  QueryDslQueryContainer,
  SearchHit,
  SearchHitsMetadata,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";
import { QueryParams } from "../models/queryParams";
import { Address, SearchAddressTerm } from "../models/Address";
import {
  AvailableFilters,
  ResponseAddress,
  ResponseAddressWithFilters,
} from "../models/responseAddress";
import {
  Aggregations,
  ElasticSourceResult,
} from "../models/elasticSourceResult";
import { ServiceSearchAddress } from "../models/serviceSearchAddress";

@autoInjectable()
export class SearchAddress implements ServiceSearchAddress {
  constructor(private elasticRepository: ElasticsearchRepository) {} //private repositotry: any
  async updateSearchAvailability(id: string) {
    return await this.elasticRepository.updateSearchAvailability(id);
  }
  filterBy(arr: string[], arrToFilterBy: string[]) {
    return arr.filter((item) => arrToFilterBy.includes(item));
  }
  buildAggs(aggregations: Aggregations, hits: SearchHit[]): AvailableFilters {
    if (!aggregations) return {};
    const types: string[] = [];
    const neighbourhoods: string[] = [];

    hits.forEach((hit) => {
      const { neighbourhood, type } = hit._source as ElasticSourceResult;
      types.push(type);
      neighbourhoods.push(neighbourhood);
    });
    const availableNeighbourhoods = this.filterBy(
      aggregations?.available_neighbourhoods?.buckets.map(({ key }) => key),
      neighbourhoods
    );
    const availableType = this.filterBy(
      aggregations?.available_types?.buckets.map(({ key }) => key),
      types
    );
    return {
      availableType: availableType ?? [],
      availableNeighbourhoods: availableNeighbourhoods ?? [],
    };
  }
  buildFiltersQuery(filters: QueryParams["filters"], searchQuery: any) {
    const duplicateFilters = structuredClone(filters) as any;
    const availableType = duplicateFilters["availableType"];
    const availableNeighbourhoods = duplicateFilters["availableNeighbourhoods"];
    availableNeighbourhoodsFilterQuery.terms["neighbourhood.keyword"] =
      Array.isArray(availableNeighbourhoods)
        ? availableNeighbourhoods
        : [availableNeighbourhoods];
    availableTypeFilterQuery.terms["type.keyword"] = Array.isArray(
      availableType
    )
      ? availableType
      : [availableType];

    const filtersQuery = getFiltersQuery(
      duplicateFilters["availableType"]
        ? { ...availableTypeFilterQuery }
        : null,
      duplicateFilters["availableNeighbourhoods"]
        ? { ...availableNeighbourhoodsFilterQuery }
        : null
    );
    searchQuery["bool"]["filter"] = filtersQuery.filter;
    return searchQuery;
  }
  async getElasticResult(
    query: QueryParams
  ): Promise<ResponseAddressWithFilters> {
    const { q, searchSpec, filters } = query;
    let esQuery: { [key: string]: any } | any = queyrByEnum[searchSpec];
    this.replcaeQueryString(esQuery, searchSpec, q);
    if(searchSpec==='fullAddress') {
       esQuery = searchByFullAddress(q);
    }
    this.buildFiltersQuery({ ...filters }, esQuery);
    console.log(JSON.stringify(esQuery,null,2))
    const result = await this.elasticRepository.search(
      esQuery as QueryDslQueryContainer,
      searchSpec === "fullAddress" ? 3 : 6
    );
    return this.mapResultToResponse(
      result?.hits.hits as SearchHit[],
      result?.aggregations as unknown as Aggregations
    );
  }

  mapResultToResponse(
    result: SearchHit[],
    aggregations: Aggregations
  ): ResponseAddressWithFilters {
    const availableFilters = this.buildAggs(
      aggregations as unknown as Aggregations,
      result as SearchHit[]
    );
    const addresses = result.map((item): ResponseAddress => {
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

    return {
      addresses,
      availableFilters,
    };
  }
  replcaeQueryString(
    esQuery: { [key: string]: any },
    searchSpce: SearchAddressTerm,
    q: string
  ) {
    switch (searchSpce) {
      case SearchAddressTerm.main:
        esQuery.bool.must[0].match.main = q;
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
