export const searchByPartialAddress = {
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
export const searchByMainAddress = {
  bool: {
    must: {
      match: {
        main: "",
      },
    },
    filter: {
      term: {
        isAvailableForSearch: true,
      },
    },
  },
};
export const searchByFullAddrees = {
  // included only 3
  bool: {
    must: [
      {
        multi_match: {
          query: "",
          fields: [
            "main",
            "type",
            "neighbourhood",
            "code",
            "description",
            "extraGroup",
            "group",
            "secondary",
          ],
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
export const queyrByEnum = {
  main: searchByMainAddress,
  fullAddress: searchByFullAddrees,
  partialAddress: searchByPartialAddress,
};
