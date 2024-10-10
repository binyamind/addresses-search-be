import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { container } from "tsyringe";
import { ElasticsearchConnector } from "./db/elasticConnector";
import { convertCsvToJson } from "./helpers/csvTojson.helper";
import { ElasticsearchRepository } from "./repositories/elastic.repository";
import { AddressRoutes } from "./routes/searchAddress.router";
import { SearchAddress } from "./services/searchAddress.Service";
import { Client } from "@elastic/elasticsearch";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("service up and running!");
});

const clientInstance = container.resolve(ElasticsearchConnector);
container.registerInstance(Client, clientInstance.getClient());
const routes = container.resolve(AddressRoutes);
const searchService = container.resolve(SearchAddress);
const elastic = container.resolve(ElasticsearchRepository);

async function bootstrap() {
  await clientInstance.connent();
  (async () => {
    const exists = await elastic.checkMappingExists();
    if (exists) return;
    const esData = await convertCsvToJson();
    await elastic.defineMapping(); 
    await elastic.loadCsvToElasticsearch(esData);
  })();
}
app.use("/api", routes.routes());
app.listen(port, async () => {
  await bootstrap();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
