import fetch from "node-fetch";
import { Products, PaginationParams } from "../generated/graphql";

export class ProductsService {
  async get({ page, size }: PaginationParams): Promise<Products> {
    const res = await fetch(
      `http://localhost:8080/products?page=${page}&size=${size}`
    );
    const { results, ...paginationInfo }: Pagination<ApiProduct> =
      await res.json();

    return {
      paginationInfo,
      products: results,
    };
  }
}

export interface Pagination<T> {
  page: number;
  size: number;
  totalResults: number;
  totalPages: number;
  results: T[];
}

interface ApiProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ApiRating;
  quantity?: ApiQuantity;
  replacement?: ApiProduct;
}

interface ApiRating {
  rate: number;
  count: number;
}

interface ApiQuantity {
  min: number;
  step: number;
  max: number;
}
