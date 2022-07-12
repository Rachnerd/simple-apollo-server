import { ApolloServer, gql } from "apollo-server";
import DataLoader from "dataloader";
import { readFileSync } from "fs";
import path from "path";
import { Context } from "./context";
import {
  Product,
  ProductInStock,
  ProductReplaced,
  ProductResolvers,
  Resolvers,
} from "./generated/graphql";
import { CartService } from "./services/cart.service";
import { PriceService } from "./services/price.service";
import { ProductsService } from "./services/products.service";

const schemaPath = path.resolve(process.cwd(), "src", "schema.graphql");

const typeDefs = gql`
  ${readFileSync(schemaPath)}
`;

const resolvePrice: ProductResolvers["price"] = (
  { id },
  _args,
  { dataloaders: { price } },
  _info
) => price.load(id);

const resolvers: Resolvers = {
  Query: {
    products: (_obj, { pagination }, { services: { products } }, _info) =>
      products.get(pagination),

    cart: (_obj, { pagination }, { services: { cart } }, _info) =>
      cart.get(pagination),
  },
  Product: {
    __resolveType: (product: Product) => {
      if ((product as ProductInStock).quantity !== undefined) {
        return "ProductInStock";
      }
      if ((product as ProductReplaced).replacement !== undefined) {
        return "ProductReplaced";
      }
      return "ProductOutOfStock";
    },
  },
  ProductInStock: {
    price: resolvePrice,
    limited: ({ quantity: { max, step } }, _args, _context, _info) =>
      max / step <= 5,
  },
  ProductReplaced: {
    price: resolvePrice,
  },
  ProductOutOfStock: {
    price: resolvePrice,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  context: (): Context => {
    const priceService = new PriceService();
    return {
      services: {
        products: new ProductsService(),
        price: priceService,
        cart: new CartService(),
      },
      dataloaders: {
        price: new DataLoader(priceService.getByIds),
      },
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
