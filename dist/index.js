"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const elasticConnector_1 = require("./db/elasticConnector");
const csvTojson_helper_1 = require("./helpers/csvTojson.helper");
const elastic_repository_1 = require("./repositories/elastic.repository");
const searchAddress_router_1 = require("./routes/searchAddress.router");
const searchAddress_Service_1 = require("./services/searchAddress.Service");
const elasticsearch_1 = require("@elastic/elasticsearch");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("service up and running!");
});
const clientInstance = tsyringe_1.container.resolve(elasticConnector_1.ElasticsearchConnector);
tsyringe_1.container.registerInstance(elasticsearch_1.Client, clientInstance.getClient());
const routes = tsyringe_1.container.resolve(searchAddress_router_1.AddressRoutes);
const searchService = tsyringe_1.container.resolve(searchAddress_Service_1.SearchAddress);
const elastic = tsyringe_1.container.resolve(elastic_repository_1.ElasticsearchRepository);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield clientInstance.connent();
        (() => __awaiter(this, void 0, void 0, function* () {
            const esData = yield (0, csvTojson_helper_1.convertCsvToJson)();
            yield elastic.defineMapping();
            yield elastic.loadCsvToElasticsearch(esData);
        }))();
    });
}
app.use("/api", routes.routes());
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield bootstrap();
    console.log(`[server]: Server is running at http://localhost:${port}`);
}));
