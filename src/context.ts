import DataLoader from "dataloader";
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
    price: DataLoader<string, number>;
  };
}
