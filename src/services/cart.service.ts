import fetch from "node-fetch";
import { Cart, PaginationParams } from "../generated/graphql";

export class CartService {
  get(pagination?: PaginationParams | null): Promise<Cart> {
    return fetch(
      `http://localhost:8080/cart${
        pagination ? `?page=${pagination.page}&size=${pagination.size}` : ``
      }`
    ).then((res) => res.json());
  }
}
