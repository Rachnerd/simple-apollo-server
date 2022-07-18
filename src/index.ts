import { ApolloServer, gql } from "apollo-server";
import DataLoader from "dataloader";
import { readFileSync } from "fs";
import path from "path";
import { Context } from "./context";
import { CartProduct, ProductResolvers, Resolvers } from "./generated/graphql";
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

    cart: async (_obj, { pagination }, { services: { cart } }, _info) => {
      const {
        total,
        products: { results, ...paginationInfo },
      } = await cart.get(pagination);
      return {
        products: {
          cartProducts: results,
          paginationInfo,
        },
        total,
      };
    },

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
    cartInfo: ({ id }, _args, { dataloaders: { cart } }) => cart.load(id),
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
  context: (): Context => {
    const priceService = new PriceService();
    const cartService = new CartService();
    return {
      services: {
        products: new ProductsService(),
        price: priceService,
        cart: cartService,
      },
      dataloaders: {
        price: new DataLoader(priceService.getByIds),
        cart: new DataLoader(async (ids) => {
          const cart = await cartService.get();
          const productsMap = cart.products.results.reduce(
            (acc, product) => ({
              ...acc,
              [product.id]: product,
            }),
            {} as Record<string, CartProduct>
          );
          return ids.map((id) => productsMap[id]);
        }),
      },
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
