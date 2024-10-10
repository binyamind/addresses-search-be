"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.convertCsvToJson = convertCsvToJson;
const csvtojson_1 = __importDefault(require("csvtojson"));
const path = __importStar(require("path"));
function convertCsvToJson() {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = path.resolve(__dirname, "./address.csv");
        return renameProps(yield (0, csvtojson_1.default)().fromFile(filePath));
    });
}
function renameProps(jsonObj) {
    const arr = [];
    for (let item of jsonObj) {
        const keys = Object.keys(item);
        arr.push({
            main: item[keys[0]],
            description: item[keys[1]],
            secondary: item[keys[2]] ? item[keys[2]] : null,
            group: item[keys[3]],
            extraGroup: item[keys[4]] ? item[keys[4]] : null,
            type: item[keys[5]],
            code: item[keys[6]] ? parseInt(item[keys[6]]) : null,
            neighbourhood: item[keys[7]],
        });
    }
    return arr;
}
