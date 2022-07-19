import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { createContext } from "./context";
import { ProductResolvers, Resolvers } from "./generated/graphql";

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
    products: (_obj, { pagination }, { dataloaders: { products } }, _info) =>
      products.load(`${pagination.page}:${pagination.size}`),
    cart: async (_obj, { pagination }, { dataloaders: { cart } }, _info) =>
      await cart.load(
        pagination ? `${pagination.page}:${pagination.size}` : ``
      ),
    product: async (_obj, { id }, { services: { products } }) =>
      (await products.getById(id)) ?? {
        id,
        reason: "Product does not exist",
      },
  },
  NotFound: {
    __isTypeOf: (notFound) => notFound.reason !== undefined,
  },
  ProductInStock: {
    __isTypeOf: (product) => product.quantity !== undefined,
    limited: ({ quantity: { max, step } }) => max / step <= 5,
    cartInfo: ({ id }, _args, { dataloaders: { cartInfo } }) =>
      cartInfo.load(id),
    price: resolvePrice,
  },
  ProductReplaced: {
    __isTypeOf: (product) => product.replacement !== undefined,
    price: resolvePrice,
  },
  ProductOutOfStock: {
    __isTypeOf: (product) => product.title !== undefined,
    price: resolvePrice,
  },
  Mutation: {
    addToCart: (_obj, args, { services: { cart } }) => cart.post(args),
    removeFromCart: (_obj, args, { services: { cart } }) =>
      cart.delete(args.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
