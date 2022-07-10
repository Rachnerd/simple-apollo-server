import { ApolloServer, gql } from "apollo-server";
import DataLoader from "dataloader";
import { readFileSync } from "fs";
import path from "path";
import { Context } from "./context";
import { Resolvers } from "./generated/graphql";
import { resolveProductUnion } from "./resolvers/product-union.resolver";
import { CartService } from "./services/cart.service";
import { PriceService } from "./services/price.service";
import { ProductsService } from "./services/products.service";

const schemaPath = path.resolve(process.cwd(), "src", "schema.graphql");

const typeDefs = gql`
  ${readFileSync(schemaPath)}
`;

const resolvers: Resolvers = {
  ProductUnion: {
    __resolveType: resolveProductUnion,
  },
  Query: {
    products: (_obj, { pagination }, { services: { products } }, _info) =>
      products.get(pagination),

    cart: (_obj, { pagination }, { services: { cart } }, _info) =>
      cart.get(pagination),
  },
  ProductInStock: {
    // limited: ({ quantity: { max, step } }, _args, _context, _info) =>
    //   max / step <= 5,
    price: ({ id }, _args, { dataloaders: { price } }, _info) => price.load(id),
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
