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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const searchAddress_Service_1 = require("../services/searchAddress.Service");
const validation_middleware_1 = require("../middleware/validation.middleware");
const getAddress_schema_1 = require("../schemas/getAddress.schema");
let AddressRoutes = class AddressRoutes {
    constructor(searchAddress) {
        this.searchAddress = searchAddress;
        this.router = express_1.default.Router();
        this.router.use(express_1.default.json());
    }
    toPluginResponse(data) {
        return {
            result: { data },
        };
    }
    routes() {
        this.router.get("/search", (0, validation_middleware_1.validateQueryRequest)(getAddress_schema_1.searchAddress), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            res.send(this.toPluginResponse(yield this.searchAddress.getElasticResult(query)));
        }));
        this.router.put("/update-search-availability", (0, validation_middleware_1.validateBodyRequest)(getAddress_schema_1.availableForSearchRequestBody), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            res.status(204);
            res.send(this.toPluginResponse(yield this.searchAddress.updateSearchAvailability(body.id)));
        }));
        return this.router;
    }
};
exports.AddressRoutes = AddressRoutes;
exports.AddressRoutes = AddressRoutes = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __metadata("design:paramtypes", [searchAddress_Service_1.SearchAddress])
], AddressRoutes);
