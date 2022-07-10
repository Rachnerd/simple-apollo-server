import {
  ProductInStock,
  ProductReplaced,
  ProductUnion,
} from "../generated/graphql";

const isProductInStock = (product: ProductUnion): product is ProductInStock => {
  const { quantity } = product as ProductInStock;
  return quantity !== undefined;
};

const isProductReplaced = (
  product: ProductUnion
): product is ProductReplaced => {
  const { replacement } = product as ProductReplaced;
  return replacement !== undefined;
};

export const resolveProductUnion = (product: ProductUnion) => {
  if (isProductInStock(product)) {
    return "ProductInStock";
  }
  if (isProductReplaced(product)) {
    return "ProductReplaced";
  }
  return "ProductOutOfStock";
};
