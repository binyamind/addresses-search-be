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
  },
};
export const searchByMainAddress = {
  bool: {
    must: [
      {
        match: {
          main: "",
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
export const searchByFullAddrees = {
  bool: {
    must: [
      {
        query_string: {
          query: "",
          fields: [
            "main",
            "type",
            "neighbourhood",
            "description",
            "extraGroup",
            "group",
            "secondary",
            "code.keyword",
          ],
          default_operator: "AND",
        },
      },
    ],
    filter: [
      {
        term: {
          isAvailableForSearch: true,
        },
      },
    ],
  },
};

export const availableNeighbourhoodsFilterQuery = {
  terms: {
    "neighbourhood.keyword": [] as string[],
  },
};
export const availableTypeFilterQuery = {
  terms: {
    "type.keyword": [] as string[],
  },
};
export const searchByFullAddress = (input: string) => {
  const terms = input.split(" ").filter((term) => term.trim() !== "");
  const mustClauses: any[] = [];

  const fields = [
    "main",
    "type",
    "neighbourhood",
    "description",
    "extraGroup",
    "group",
    "secondary",
    //  "code",
  ];

  terms.forEach((term) => {
    const termMustClauses = fields.map((field) => {
      return { match: { [field]: term,  } };
    });

    mustClauses.push({
      bool: {
        should: termMustClauses,
        minimum_should_match: 1,
      },
    });
  });

  return {
    bool: {
      must: mustClauses,
      filter: [
        {
          term: {
            isAvailableForSearch: true,
          },
        },
      ],
    },
  };
};

export const filtersQuery = {
  filter: [
    {
      term: {
        isAvailableForSearch: true,
      },
    },
  ] as Array<unknown>,
};
export const queyrByEnum = {
  main: searchByMainAddress,
  fullAddress: searchByFullAddress,
  partialAddress: searchByPartialAddress,
};
export function getFiltersQuery(
  availabeTypes: any,
  availableNeighbourhoods: any
) {
  return {
    filter: [
      filtersQuery.filter[0],
      availabeTypes,
      availableNeighbourhoods,
    ].filter(Boolean),
  };
}
