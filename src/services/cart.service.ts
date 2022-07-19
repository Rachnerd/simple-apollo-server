import fetch from "node-fetch";
import { Cart, CartProduct, PaginationParams } from "../generated/graphql";
export class CartService {
  async get(pagination?: PaginationParams | null): Promise<Cart> {
    const res = await fetch(
      `http://localhost:8080/cart${
        pagination ? `?page=${pagination.page}&size=${pagination.size}` : ``
      }`
    );

    const {
      total,
      products: { results, ...paginationInfo },
    } = await res.json();

    return {
      products: {
        cartProducts: results,
        paginationInfo,
      },
      total,
    };
  }

  async post(product: Pick<CartProduct, "id" | "quantity">): Promise<boolean> {
    const res = await fetch(`http://localhost:8080/cart`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.status === 204;
  }

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "delete",
    });
    return res.status === 204;
  }
}
