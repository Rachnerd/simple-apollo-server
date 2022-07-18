import fetch from "node-fetch";
import { CartProduct, PaginationParams } from "../generated/graphql";

interface ApiCart {
  products: {
    results: CartProduct[];
    page: number;
    size: number;
    totalPages: number;
    totalResults: number;
  };
  total: number;
}

export class CartService {
  async get(pagination?: PaginationParams | null): Promise<ApiCart> {
    const res = await fetch(
      `http://localhost:8080/cart${
        pagination ? `?page=${pagination.page}&size=${pagination.size}` : ``
      }`
    );

    return await res.json();
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
