import express, { Express, Router, Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { SearchAddress } from "../services/searchAddress.Service";
import { QueryParams } from "../models/queryParams";
import { validateQueryRequest, validateBodyRequest } from "../middleware/validation.middleware";
import { availableForSearchRequestBody, searchAddress } from "../schemas/getAddress.schema";

@autoInjectable()
export class AddressRoutes {
  router: Router;
  constructor(private searchAddress: SearchAddress) {
    this.router = express.Router();
    this.router.use(express.json());
  }
  toPluginResponse<T>(data: T) {
    return {
      result: { data },
    };
  }
  routes() {
    this.router.get("/search", validateQueryRequest(searchAddress), async (req: Request, res: Response, next) => {
      const { query } = req;
      res.send(
        this.toPluginResponse(
          await this.searchAddress.getElasticResult(
            query as unknown as QueryParams
          )
        )
      );
    });
    this.router.put(
      "/update-search-availability",
      validateBodyRequest(availableForSearchRequestBody),
      async (req: Request, res: Response) => {
        
        const { body } = req;
        console.log(body);
        res.status(204);
        res.send(
          this.toPluginResponse(
            await this.searchAddress.updateSearchAvailability(body.id)
          )
        );
      }
    );
    return this.router;
  }
}
