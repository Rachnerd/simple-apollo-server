import fetch from "node-fetch";
import { PagedProducts, PaginationParams } from "../generated/graphql";

export class ProductsService {
  get({ page, size }: PaginationParams): Promise<PagedProducts> {
    return fetch(
      `http://localhost:8080/products?page=${page}&size=${size}`
    ).then((res) => res.json());
  }
}
