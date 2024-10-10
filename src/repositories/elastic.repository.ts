import { Client } from "@elastic/elasticsearch";
import { mappings } from "../helpers/elastic.mappings.helper";
import { QueryDslQueryContainer } from "@elastic/elasticsearch/lib/api/types";
import { autoInjectable, inject } from "tsyringe";
import { ElasticsearchRepositoryService } from "../models/elasticsearcRepositoryService";
import { Address } from "../models/Address";

@autoInjectable()
export class ElasticsearchRepository implements ElasticsearchRepositoryService {
  constructor(@inject(Client) private client: Client) {}
  private indexName = "addresses";

  async updateSearchAvailability(id: string): Promise<any> {
    try {
      const result = await this.client.update({
        index: this.indexName,
        id,
        body: {
          doc: {
            isAvailableForSearch: false,
          },
        },
      });
      if (result.result === "updated")
        return {
          status: "updated",
        };
    } catch (error) {
      throw Error("error in code");
    }
  }

  async createIndex(): Promise<boolean | void> {
    if (await this.client.indices.exists({ index: this.indexName })) {
      console.log("Index", this.indexName, "does already exist");
      return true;
    }
    console.log("creating index");
    await this.client.indices.create({
      index: this.indexName,
    });
  }
  async checkMappingExists(): Promise<boolean | void> {
    try {
      await this.client.indices.getMapping({
        index: this.indexName,
      });
      return true;
    } catch (error: any) {
      if (error.statusCode === 404) return false;
    }
  }
  async defineMapping(): Promise<void> {
    if (await this.checkMappingExists()) return;
    if (await this.createIndex()) return;
    try {
      const result = await this.client.indices.create(
        {
          index: this.indexName,
        },
        {
          ...mappings,
          meta: true,
        }
      );
    } catch (error: any) {
      console.log("erorrrrrrrrrrrrrrrrrrrr", error?.meta.statusCode);
    }
  }
  async indexData(data: Address): Promise<void> {
    try {
      await this.client.index({
        index: this.indexName,
        body: {
          ...data,
          isAvailableForSearch: true,
        },
      });
    } catch (error) {
      console.error("Error indexing data:", error);
    }
  }
  async loadCsvToElasticsearch(data: Array<Address>): Promise<void> {
    data.map(async (item) => {
      await this.indexData(item);
    });
  }
  async search(query: any, size = 6) {
    try {
      const newLocal = await this.client.search({
        index: this.indexName,
        query: query,
        size,
      });
      console.log(JSON.stringify(newLocal,null,2));
      return newLocal;
    } catch (error) {
      console.log(error);
    }
  }
}
