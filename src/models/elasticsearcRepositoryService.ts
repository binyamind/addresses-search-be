import { Address } from "./Address"

export interface ElasticsearchRepositoryService{
     createIndex(): Promise<boolean | void>
     checkMappingExists(): Promise<boolean | void>
     checkMappingExists(): Promise<boolean | void>
     indexData(data: Address): Promise<void> 
     loadCsvToElasticsearch(data: Array<Address>): Promise<void>
     search(query: any, size :number): Promise<any>
}