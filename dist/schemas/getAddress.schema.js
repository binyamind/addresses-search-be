"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableForSearchRequestBody = exports.searchAddress = void 0;
const zod_1 = require("zod");
const Address_1 = require("../models/Address");
exports.searchAddress = zod_1.z.object({
    q: zod_1.z.string().min(3),
    searchSpec: zod_1.z.enum([
        Address_1.SearchAddressTerm.main,
        Address_1.SearchAddressTerm.partialAddress,
        Address_1.SearchAddressTerm.fullAddress,
    ]),
});
exports.availableForSearchRequestBody = zod_1.z.object({
    id: zod_1.z.string(),
});
