"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queyrByEnum = exports.searchByFullAddrees = exports.searchByMainAddress = exports.searchByPartialAddress = void 0;
exports.searchByPartialAddress = {
    bool: {
        must: {
            multi_match: {
                query: "",
                fields: [
                    "main",
                    "description",
                    "secondary",
                    "group",
                    "extraGroup",
                    "type",
                    "neighbourhood",
                ],
                operator: "or",
            },
        },
        filter: {
            term: {
                isAvailableForSearch: true,
            },
        },
    },
};
exports.searchByMainAddress = {
    match: {
        main: "",
    },
};
exports.searchByFullAddrees = {
    bool: {
        must: [
            {
                multi_match: {
                    query: "",
                    fields: ["main", "type", "neighbourhood"],
                    operator: "and",
                    type: "cross_fields",
                },
            },
        ],
        filter: {
            term: {
                isAvailableForSearch: true,
            },
        },
    },
};
exports.queyrByEnum = {
    main: exports.searchByMainAddress,
    fullAddress: exports.searchByFullAddrees,
    partialAddress: exports.searchByPartialAddress,
};
