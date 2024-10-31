import { Address } from "./Address";

export interface ElasticSourceResult {
  _id: string;
  main: string;
  description: string;
  secondary: string;
  group: string;
  extraGroup: string | null;
  type: string;
  code: number;
  neighbourhood: string;
  isAvailableForSearch: boolean;
}
export interface Aggregations {
  available_types:{
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: Array<Buckets>
  },
  available_neighbourhoods:{
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: Array<Buckets>
  }
}

export interface Buckets{
  key: string;
  doc_count: string | number
}