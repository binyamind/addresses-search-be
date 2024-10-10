"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappings = void 0;
exports.mappings = {
    mappings: {
        properties: {
            main: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                    },
                },
            },
            description: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                    },
                },
            },
            secondary: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                    },
                },
            },
            group: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                    },
                },
            },
            extraGroup: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                    },
                },
            },
            type: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword"
                    },
                },
            },
            code: {
                type: "integer",
            },
            neighbourhood: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                    },
                },
            },
            isAvailableForSearch: {
                type: "boolean",
            },
        },
    },
};
