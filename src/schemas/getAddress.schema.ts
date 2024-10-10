import { z } from "zod";
import { SearchAddressTerm } from "../models/Address";

export const searchAddress = z.object({
  q: z.string().min(2),
  searchSpec: z.enum([
    SearchAddressTerm.main,
    SearchAddressTerm.partialAddress,
    SearchAddressTerm.fullAddress,
  ]),
});

export const availableForSearchRequestBody = z.object({ 
  id: z.string(),
});
 