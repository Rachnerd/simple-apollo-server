import DataLoader from "dataloader";
import { Cart, CartProduct, Products } from "./generated/graphql";
import { CartService } from "./services/cart.service";
import { PriceService } from "./services/price.service";
import { ProductsService } from "./services/products.service";

export interface Context {
  services: {
    products: ProductsService;
    price: PriceService;
    cart: CartService;
  };
  dataloaders: {
    products: DataLoader<string, Products>;
    price: DataLoader<string, number>;
    cart: DataLoader<string, Cart>;
    cartInfo: DataLoader<string, CartProduct>;
  };
}

export const createContext = (): Context => {
  const priceService = new PriceService();
  const cartService = new CartService();
  const productsService = new ProductsService();
  return {
    services: {
      products: productsService,
      price: priceService,
      cart: cartService,
    },
    dataloaders: {
      /**
       * Batch multiple price calls into 1
       */
      price: new DataLoader(priceService.getByIds),

      /**
       * Only call cart endpoint once and return cartinfo for the requested ids
       */
      cartInfo: new DataLoader(async (ids) => {
        const cart = await cartService.get();
        const productsMap = cart.products.cartProducts.reduce(
          (acc, product) => ({
            ...acc,
            [product.id]: product,
          }),
          {} as Record<string, CartProduct>
        );
        return ids.map((id) => productsMap[id]);
      }),
      cart: new DataLoader(async (paginationParamsString) => {
        return Promise.all(
          paginationParamsString.map((paramsString) => {
            if (!paramsString) {
              return cartService.get();
            }
            const [page, size] = paramsString.split(":");
            return cartService.get({
              page: parseInt(page),
              size: parseInt(size),
            });
          })
        );
      }),
      /**
       * Only call endpoint for unique combinations of page/size
       */
      products: new DataLoader(async (paginationParamsString) => {
        return Promise.all(
          paginationParamsString.map((paramsString) => {
            const [page, size] = paramsString.split(":");
            return productsService.get({
              page: parseInt(page),
              size: parseInt(size),
            });
          })
        );
      }),
    },
  };
};
