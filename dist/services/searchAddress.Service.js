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
exports.SearchAddress = void 0;
const tsyringe_1 = require("tsyringe");
const elastic_repository_1 = require("../repositories/elastic.repository");
const elastic_searchQueries_helper_1 = require("../helpers/elastic.searchQueries.helper");
const Address_1 = require("../models/Address");
let SearchAddress = class SearchAddress {
    constructor(elasticRepository) {
        this.elasticRepository = elasticRepository;
    } //private repositotry: any
    updateSearchAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.elasticRepository.updateSearchAvailability(id);
        });
    }
    getElasticResult(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { q, searchSpec } = query;
            const esQuery = elastic_searchQueries_helper_1.queyrByEnum[searchSpec];
            this.replcaeQueryString(esQuery, searchSpec, q);
            const result = yield this.elasticRepository.search(esQuery, searchSpec === "fullAddress" ? 1 : 6);
            return this.mapResultToResponse(result === null || result === void 0 ? void 0 : result.hits.hits);
        });
    }
    mapResultToResponse(result) {
        return result.map((item) => {
            const { main, description, secondary, code, extraGroup, neighbourhood, type, group, } = item._source;
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
    replcaeQueryString(esQuery, searchSpce, q) {
        switch (searchSpce) {
            case Address_1.SearchAddressTerm.main:
                esQuery.match.main = q;
                break;
            case Address_1.SearchAddressTerm.fullAddress:
                esQuery.bool.must[0].multi_match.query = q;
                break;
            case Address_1.SearchAddressTerm.partialAddress:
                esQuery.bool.must.multi_match.query = q;
                break;
            default:
                "no match found";
                break;
        }
    }
};
exports.SearchAddress = SearchAddress;
exports.SearchAddress = SearchAddress = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [elastic_repository_1.ElasticsearchRepository])
], SearchAddress);
