import { Client, ClientOptions } from "@elastic/elasticsearch";
import { autoInjectable } from "tsyringe";
import "reflect-metadata";

@autoInjectable()
export class ElasticsearchConnector {
  private elasticConfig: ClientOptions = {
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
      username: process.env.ELASTIC_SEARCH_USERNAME as string,
      password: process.env.ELASTIC_SEARCH_PASSWORD as string,
    },
  };
  private client: Client = new Client(this.elasticConfig);
  constructor() {}
  async connent() {
    await this.client
      .ping()
      .then(() => {
        console.log("Connected to Elasticsearch successfully");
      })
      .catch((error) => {
        console.error("Error connecting to Elasticsearch:", error);
      });
  }
  getClient() {
    return this.client;
  }
}
