"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchRepository = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const elastic_mappings_helper_1 = require("../helpers/elastic.mappings.helper");
const tsyringe_1 = require("tsyringe");
let ElasticsearchRepository = class ElasticsearchRepository {
    constructor(client) {
        this.client = client;
        this.indexName = "addresses";
    }
    updateSearchAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.update({
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
            }
            catch (error) {
                throw Error("error in code");
            }
        });
    }
    createIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.client.indices.exists({ index: this.indexName }));
            if (yield this.client.indices.exists({ index: this.indexName })) {
                console.log("Index", this.indexName, "does already exist");
                return true;
            }
            console.log("creating index");
            yield this.client.indices.create({
                index: this.indexName,
            });
        });
    }
    checkMappingExists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.indices.getMapping({
                    index: this.indexName,
                });
                return true;
            }
            catch (error) {
                if (error.statusCode === 404)
                    return false;
            }
        });
    }
    defineMapping() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkMappingExists())
                return;
            if (yield this.createIndex())
                return;
            try {
                const result = yield this.client.indices.create({
                    index: this.indexName,
                }, Object.assign(Object.assign({}, elastic_mappings_helper_1.mappings), { meta: true }));
            }
            catch (error) {
                console.log("erorrrrrrrrrrrrrrrrrrrr", error === null || error === void 0 ? void 0 : error.meta.statusCode);
            }
        });
    }
    indexData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.index({
                    index: this.indexName,
                    body: Object.assign(Object.assign({}, data), { isAvailableForSearch: true }),
                });
            }
            catch (error) {
                console.error("Error indexing data:", error);
            }
        });
    }
    loadCsvToElasticsearch(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.map((item) => __awaiter(this, void 0, void 0, function* () {
                yield this.indexData(item);
            }));
        });
    }
    search(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, size = 6) {
            try {
                return yield this.client.search({
                    index: this.indexName,
                    query: query,
                    size,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
exports.ElasticsearchRepository = ElasticsearchRepository;
exports.ElasticsearchRepository = ElasticsearchRepository = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)(elasticsearch_1.Client)),
    __metadata("design:paramtypes", [elasticsearch_1.Client])
], ElasticsearchRepository);
