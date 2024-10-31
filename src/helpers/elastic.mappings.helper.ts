export const mappings = {
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
            type: "keyword",
          },
        },
      },
      code: {
        type: "integer",
        fields: { 
          keyword: {
            type: "keyword",
          },
        },
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
